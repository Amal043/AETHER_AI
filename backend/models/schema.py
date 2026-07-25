import datetime
from sqlalchemy import (
    Column,
    Integer,
    String,
    Float,
    DateTime,
    Boolean,
    ForeignKey,
    Text,
    Index,
)
from sqlalchemy.orm import relationship
from backend.config.database import Base


class Customer(Base):
    __tablename__ = "customers"

    id = Column(Integer, primary_key=True, index=True)
    customer_key = Column(String(50), unique=True, index=True, nullable=False)
    name = Column(String(100), nullable=False)
    email = Column(String(100), index=True, nullable=False)
    country = Column(String(50), index=True, default="USA")
    region = Column(String(50), index=True, default="North America")
    segment = Column(String(50), index=True, default="Consumer")
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)
    is_deleted = Column(Boolean, default=False, index=True)

    orders = relationship("Order", back_populates="customer")
    sessions = relationship("UserSession", back_populates="customer")


class Warehouse(Base):
    __tablename__ = "warehouses"

    id = Column(Integer, primary_key=True, index=True)
    warehouse_key = Column(String(50), unique=True, index=True, nullable=False)
    name = Column(String(100), nullable=False)
    location = Column(String(100), index=True, nullable=False)
    capacity = Column(Integer, default=50000)
    utilized_capacity = Column(Integer, default=32000)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    products = relationship("Product", back_populates="warehouse")
    shipments = relationship("Shipment", back_populates="warehouse")


class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    product_key = Column(String(50), unique=True, index=True, nullable=False)
    title = Column(String(150), nullable=False)
    category = Column(String(50), index=True, nullable=False)
    price = Column(Float, nullable=False)
    cost = Column(Float, nullable=False)
    sku = Column(String(50), index=True, nullable=False)
    stock_qty = Column(Integer, default=100)
    warehouse_id = Column(Integer, ForeignKey("warehouses.id"), nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)
    is_deleted = Column(Boolean, default=False, index=True)

    warehouse = relationship("Warehouse", back_populates="products")
    order_items = relationship("OrderItem", back_populates="product")


class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    order_key = Column(String(50), unique=True, index=True, nullable=False)
    customer_id = Column(Integer, ForeignKey("customers.id"), nullable=False)
    total_amount = Column(Float, nullable=False)
    discount = Column(Float, default=0.0)
    tax = Column(Float, default=0.0)
    status = Column(String(30), index=True, default="Completed")
    payment_method = Column(String(30), default="Credit Card")
    device = Column(String(30), index=True, default="Mobile")
    traffic_source = Column(String(50), index=True, default="Direct")
    created_at = Column(DateTime, default=datetime.datetime.utcnow, index=True)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)
    is_deleted = Column(Boolean, default=False, index=True)

    customer = relationship("Customer", back_populates="orders")
    items = relationship("OrderItem", back_populates="order", cascade="all, delete-orphan")
    shipment = relationship("Shipment", back_populates="order", uselist=False)


class OrderItem(Base):
    __tablename__ = "order_items"

    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id"), nullable=False)
    product_id = Column(Integer, ForeignKey("products.id"), nullable=False)
    quantity = Column(Integer, nullable=False, default=1)
    unit_price = Column(Float, nullable=False)
    total_price = Column(Float, nullable=False)

    order = relationship("Order", back_populates="items")
    product = relationship("Product", back_populates="order_items")


class UserSession(Base):
    __tablename__ = "user_sessions"

    id = Column(Integer, primary_key=True, index=True)
    session_key = Column(String(50), unique=True, index=True, nullable=False)
    customer_id = Column(Integer, ForeignKey("customers.id"), nullable=True)
    device = Column(String(30), index=True, default="Desktop")
    duration_seconds = Column(Integer, default=120)
    bounce = Column(Boolean, default=False)
    cart_added = Column(Boolean, default=False)
    checkout_started = Column(Boolean, default=False)
    purchase_completed = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow, index=True)

    customer = relationship("Customer", back_populates="sessions")


class Shipment(Base):
    __tablename__ = "shipments"

    id = Column(Integer, primary_key=True, index=True)
    shipment_key = Column(String(50), unique=True, index=True, nullable=False)
    order_id = Column(Integer, ForeignKey("orders.id"), nullable=False)
    warehouse_id = Column(Integer, ForeignKey("warehouses.id"), nullable=False)
    carrier = Column(String(50), index=True, default="FedEx")
    tracking_number = Column(String(100), nullable=False)
    status = Column(String(30), index=True, default="Delivered")
    origin = Column(String(100), default="Warehouse Alpha")
    destination = Column(String(100), default="New York, USA")
    estimated_delivery = Column(DateTime, nullable=True)
    actual_delivery = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

    order = relationship("Order", back_populates="shipment")
    warehouse = relationship("Warehouse", back_populates="shipments")
    delivery_events = relationship("DeliveryEvent", back_populates="shipment")


class DeliveryEvent(Base):
    __tablename__ = "delivery_events"

    id = Column(Integer, primary_key=True, index=True)
    shipment_id = Column(Integer, ForeignKey("shipments.id"), nullable=False)
    event_type = Column(String(50), nullable=False)
    location = Column(String(100), nullable=False)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)
    notes = Column(Text, nullable=True)

    shipment = relationship("Shipment", back_populates="delivery_events")


class MarketingCampaign(Base):
    __tablename__ = "marketing_campaigns"

    id = Column(Integer, primary_key=True, index=True)
    campaign_key = Column(String(50), unique=True, index=True, nullable=False)
    name = Column(String(100), nullable=False)
    channel = Column(String(50), index=True, nullable=False)
    budget = Column(Float, default=10000.0)
    spend = Column(Float, default=8500.0)
    impressions = Column(Integer, default=500000)
    clicks = Column(Integer, default=25000)
    conversions = Column(Integer, default=1200)


class TrafficSource(Base):
    __tablename__ = "traffic_sources"

    id = Column(Integer, primary_key=True, index=True)
    source_name = Column(String(50), unique=True, index=True, nullable=False)
    channel_type = Column(String(50), nullable=False)
    conversion_rate = Column(Float, default=0.035)


class SystemLog(Base):
    __tablename__ = "system_logs"

    id = Column(Integer, primary_key=True, index=True)
    level = Column(String(20), index=True, default="INFO")
    message = Column(Text, nullable=False)
    component = Column(String(50), index=True, default="ETL_PIPELINE")
    timestamp = Column(DateTime, default=datetime.datetime.utcnow, index=True)
