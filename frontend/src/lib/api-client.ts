export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8005";

export interface GlobalFilters {
  category?: string;
  region?: string;
  warehouse_id?: number;
  device?: string;
}

export interface HealthCheckResponse {
  status: string;
  service: string;
  version: string;
  environment: string;
}

export interface IngestionReportResponse {
  status: string;
  filename: string;
  execution_time_seconds: number;
  quality_score: number;
  summary: {
    total_rows: number;
    imported_rows: number;
    rejected_rows: number;
    overall_completeness_pct: number;
    duplicate_rows_count: number;
  };
  columns: any[];
  log: string;
}

export async function fetchBackendHealth(): Promise<HealthCheckResponse | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/health`);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function fetchKpis(filters: GlobalFilters = {}) {
  const params = new URLSearchParams();
  if (filters.category) params.append("category", filters.category);
  if (filters.region) params.append("region", filters.region);
  if (filters.warehouse_id) params.append("warehouse_id", filters.warehouse_id.toString());
  if (filters.device) params.append("device", filters.device);

  const res = await fetch(`${API_BASE_URL}/api/v1/analytics/kpis?${params.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch KPIs");
  return res.json();
}

export async function fetchRevenueTrends() {
  const res = await fetch(`${API_BASE_URL}/api/v1/analytics/revenue`);
  if (!res.ok) throw new Error("Failed to fetch revenue trends");
  return res.json();
}

export async function fetchSalesAnalytics() {
  const res = await fetch(`${API_BASE_URL}/api/v1/analytics/sales`);
  if (!res.ok) throw new Error("Failed to fetch sales analytics");
  return res.json();
}

export async function fetchCustomerAnalytics() {
  const res = await fetch(`${API_BASE_URL}/api/v1/analytics/customers`);
  if (!res.ok) throw new Error("Failed to fetch customer analytics");
  return res.json();
}

export async function fetchInventoryAnalytics() {
  const res = await fetch(`${API_BASE_URL}/api/v1/analytics/inventory`);
  if (!res.ok) throw new Error("Failed to fetch inventory analytics");
  return res.json();
}

export async function fetchLogisticsAnalytics() {
  const res = await fetch(`${API_BASE_URL}/api/v1/analytics/logistics`);
  if (!res.ok) throw new Error("Failed to fetch logistics analytics");
  return res.json();
}

export async function fetchEdaReport() {
  const res = await fetch(`${API_BASE_URL}/api/v1/analytics/eda`);
  if (!res.ok) throw new Error("Failed to fetch EDA report");
  return res.json();
}

export async function fetchExplorerData(page = 1, limit = 15, search = "", category = "") {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });
  if (search) params.append("search", search);
  if (category) params.append("category", category);

  const res = await fetch(`${API_BASE_URL}/api/v1/explorer/data?${params.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch explorer data");
  return res.json();
}

export async function fetchEtlLogs() {
  const res = await fetch(`${API_BASE_URL}/api/v1/etl/logs`);
  if (!res.ok) throw new Error("Failed to fetch ETL logs");
  return res.json();
}

export async function uploadCsvFile(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_BASE_URL}/api/v1/etl/upload`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) throw new Error("Failed to upload CSV");
  return res.json();
}

export const uploadAndIngestCSV = uploadCsvFile;

// --- PHASE 3 AI & ML API METHODS ---

export async function fetchMlModels() {
  const res = await fetch(`${API_BASE_URL}/api/v1/ml/models`);
  if (!res.ok) throw new Error("Failed to fetch ML models");
  return res.json();
}

export async function fetchModelDetails(modelId: string) {
  const res = await fetch(`${API_BASE_URL}/api/v1/ml/models/${modelId}`);
  if (!res.ok) throw new Error(`Failed to fetch details for model ${modelId}`);
  return res.json();
}

export async function predictModel(modelId: string, payload: Record<string, any>) {
  const res = await fetch(`${API_BASE_URL}/api/v1/ml/predict/${modelId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Prediction error for model ${modelId}`);
  return res.json();
}

export async function fetchForecastSummary(horizon = 30) {
  const res = await fetch(`${API_BASE_URL}/api/v1/forecast/summary?horizon=${horizon}`);
  if (!res.ok) throw new Error("Failed to fetch forecast summary");
  return res.json();
}

export async function fetchAnomalies() {
  const res = await fetch(`${API_BASE_URL}/api/v1/anomalies/detect`);
  if (!res.ok) throw new Error("Failed to fetch anomalies");
  return res.json();
}

export async function fetchSegmentationClusters(clusters = 5) {
  const res = await fetch(`${API_BASE_URL}/api/v1/segmentation/clusters?clusters=${clusters}`);
  if (!res.ok) throw new Error("Failed to fetch segmentation clusters");
  return res.json();
}

export async function fetchRecommendations() {
  const res = await fetch(`${API_BASE_URL}/api/v1/recommendations/latest`);
  if (!res.ok) throw new Error("Failed to fetch recommendations");
  return res.json();
}

export async function fetchExecutiveInsights() {
  const res = await fetch(`${API_BASE_URL}/api/v1/insights/executive`);
  if (!res.ok) throw new Error("Failed to fetch executive insights");
  return res.json();
}

