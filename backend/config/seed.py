import random
import datetime
from sqlalchemy.orm import Session
from backend.config.database import SessionLocal, init_db
from backend.models.schema import (
    Customer,
    Warehouse,
    Product,
    Order,
    OrderItem,
    UserSession,
    Shipment,
    DeliveryEvent,
    MarketingCampaign,
    TrafficSource,
    SystemLog,
)

def seed_database(db: Session):
    # Check if already seeded
    if db.query(Customer).count() > 0:
        return

    # Seed Warehouses
    warehouses_data = [
        {"key": "WH-US-EAST", "name": "Sector 75 East Warehouse", "location": "New York, USA", "capacity": 60000, "utilized": 42000},
        {"key": "WH-US-WEST", "name": "Pacific Coast Hub", "location": "California, USA", "capacity": 50000, "utilized": 38000},
        {"key": "WH-EU-CENTRAL", "name": "Central Europe Node", "location": "Frankfurt, Germany", "capacity": 45000, "utilized": 31000},
        {"key": "WH-APAC-SINGAPORE", "name": "Singapore Maritime Transit", "location": "Singapore", "capacity": 55000, "utilized": 48000},
    ]

    warehouses = []
    for w in warehouses_data:
        wh = Warehouse(
            warehouse_key=w["key"],
            name=w["name"],
            location=w["location"],
            capacity=w["capacity"],
            utilized_capacity=w["utilized"],
        )
        db.add(wh)
        warehouses.append(wh)
    db.commit()

    # Seed Products
    categories = ["Electronics", "Apparel", "Home & Kitchen", "Beauty", "Sports & Outdoors"]
    products = []
    for i in range(1, 31):
        cat = categories[i % len(categories)]
        price = round(random.uniform(15.0, 850.0), 2)
        cost = round(price * random.uniform(0.4, 0.65), 2)
        wh = warehouses[i % len(warehouses)]
        p = Product(
            product_key=f"PROD-{1000+i}",
            title=f"Quantum {cat[:-1] if cat.endswith('s') else cat} Unit {i}",
            category=cat,
            price=price,
            cost=cost,
            sku=f"SKU-{cat[:3].upper()}-{100+i}",
            stock_qty=random.randint(15, 500),
            warehouse_id=wh.id,
        )
        db.add(p)
        products.append(p)
    db.commit()

    # Seed Customers
    countries = [("USA", "North America"), ("Germany", "Europe"), ("UK", "Europe"), ("Singapore", "Asia Pacific"), ("Japan", "Asia Pacific")]
    segments = ["Consumer", "Corporate", "Small Business", "Enterprise"]
    customers = []
    for i in range(1, 51):
        country, region = countries[i % len(countries)]
        c = Customer(
            customer_key=f"CUST-{500+i}",
            name=f"User Alpha {i}",
            email=f"user{i}@enterprise.io",
            country=country,
            region=region,
            segment=segments[i % len(segments)],
        )
        db.add(c)
        customers.append(c)
    db.commit()

    # Seed Traffic Sources
    sources_data = [
        ("Direct", "Direct", 0.042),
        ("Google Search", "Organic", 0.038),
        ("Paid Meta Ads", "Paid Social", 0.029),
        ("Email Newsletter", "Email", 0.055),
        ("Affiliate Network", "Referral", 0.032),
    ]
    for s_name, c_type, cvr in sources_data:
        db.add(TrafficSource(source_name=s_name, channel_type=c_type, conversion_rate=cvr))
    db.commit()

    # Seed Orders & Order Items & Shipments
    devices = ["Desktop", "Mobile", "Tablet"]
    statuses = ["Completed", "Completed", "Completed", "Processing", "Cancelled", "Returned"]
    carriers = ["FedEx", "DHL Express", "UPS", "BlueDart"]

    start_date = datetime.datetime.utcnow() - datetime.timedelta(days=90)
    for i in range(1, 151):
        c = random.choice(customers)
        status = random.choice(statuses)
        device = random.choice(devices)
        source = random.choice(sources_data)[0]
        order_date = start_date + datetime.timedelta(days=random.randint(0, 90), hours=random.randint(0, 23))

        num_items = random.randint(1, 4)
        order_products = random.sample(products, num_items)
        subtotal = 0.0
        items_to_add = []

        for p in order_products:
            qty = random.randint(1, 3)
            tot = round(p.price * qty, 2)
            subtotal += tot
            items_to_add.append((p, qty, p.price, tot))

        discount = round(subtotal * 0.05, 2) if subtotal > 200 else 0.0
        tax = round((subtotal - discount) * 0.08, 2)
        total_amount = round(subtotal - discount + tax, 2)

        order = Order(
            order_key=f"ORD-{10000+i}",
            customer_id=c.id,
            total_amount=total_amount,
            discount=discount,
            tax=tax,
            status=status,
            payment_method=random.choice(["Credit Card", "PayPal", "Apple Pay", "Wire Transfer"]),
            device=device,
            traffic_source=source,
            created_at=order_date,
        )
        db.add(order)
        db.flush()

        for p, qty, u_price, t_price in items_to_add:
            db.add(OrderItem(order_id=order.id, product_id=p.id, quantity=qty, unit_price=u_price, total_price=t_price))

        # Seed Shipment
        wh = random.choice(warehouses)
        est_del = order_date + datetime.timedelta(days=random.randint(2, 5))
        act_del = est_del + datetime.timedelta(hours=random.randint(-12, 36)) if status == "Completed" else None

        shipment = Shipment(
            shipment_key=f"SHIP-{20000+i}",
            order_id=order.id,
            warehouse_id=wh.id,
            carrier=random.choice(carriers),
            tracking_number=f"TRK{random.randint(1000000, 9999999)}",
            status="Delivered" if status == "Completed" else "In Transit",
            origin=wh.name,
            destination=f"{c.country} Hub",
            estimated_delivery=est_del,
            actual_delivery=act_del,
            created_at=order_date,
        )
        db.add(shipment)
        db.flush()

        db.add(DeliveryEvent(shipment_id=shipment.id, event_type="Dispatched", location=wh.location, timestamp=order_date))

    # Seed Sessions
    for i in range(1, 300):
        c = random.choice(customers) if random.random() > 0.3 else None
        completed = random.random() < 0.15
        started = completed or (random.random() < 0.35)
        cart = started or (random.random() < 0.55)
        bounce = not cart and (random.random() < 0.40)
        s_date = start_date + datetime.timedelta(days=random.randint(0, 90))

        session = UserSession(
            session_key=f"SESS-{30000+i}",
            customer_id=c.id if c else None,
            device=random.choice(devices),
            duration_seconds=random.randint(15, 600),
            bounce=bounce,
            cart_added=cart,
            checkout_started=started,
            purchase_completed=completed,
            created_at=s_date,
        )
        db.add(session)

    db.commit()
    db.add(SystemLog(level="INFO", message="Database seeded with 150 orders, 50 customers, 30 products, and 300 sessions.", component="SEED_SERVICE"))
    db.commit()

if __name__ == "__main__":
    init_db()
    db = SessionLocal()
    seed_database(db)
    db.close()
    print("Database initialization and seeding complete.")
