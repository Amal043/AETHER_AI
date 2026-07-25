export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  (typeof window !== "undefined" && window.location.hostname.includes("localhost")
    ? "http://127.0.0.1:8005"
    : "https://aether-ai-9vsw.onrender.com");

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

export async function safeFetch(url: string, options?: RequestInit) {
  try {
    const res = await fetch(url, { cache: "no-store", ...options });
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.warn(`Fetch error for ${url}:`, err);
    return null;
  }
}

export async function fetchBackendHealth(): Promise<HealthCheckResponse | null> {
  return await safeFetch(`${API_BASE_URL}/health`);
}

export async function fetchKpis(filters: GlobalFilters = {}) {
  const params = new URLSearchParams();
  if (filters.category) params.append("category", filters.category);
  if (filters.region) params.append("region", filters.region);
  if (filters.warehouse_id) params.append("warehouse_id", filters.warehouse_id.toString());
  if (filters.device) params.append("device", filters.device);

  const data = await safeFetch(`${API_BASE_URL}/api/v1/analytics/kpis?${params.toString()}`);
  return data || { status: "empty", data: null };
}

export async function fetchRevenueTrends() {
  const data = await safeFetch(`${API_BASE_URL}/api/v1/analytics/revenue`);
  return data || { status: "empty", data: [] };
}

export async function fetchSalesAnalytics() {
  const data = await safeFetch(`${API_BASE_URL}/api/v1/analytics/sales`);
  return data || { status: "empty", data: null };
}

export async function fetchCustomerAnalytics() {
  const data = await safeFetch(`${API_BASE_URL}/api/v1/analytics/customers`);
  return data || { status: "empty", data: null };
}

export async function fetchInventoryAnalytics() {
  const data = await safeFetch(`${API_BASE_URL}/api/v1/analytics/inventory`);
  return data || { status: "empty", data: null };
}

export async function fetchLogisticsAnalytics() {
  const data = await safeFetch(`${API_BASE_URL}/api/v1/analytics/logistics`);
  return data || { status: "empty", data: null };
}

export async function fetchEdaReport() {
  const data = await safeFetch(`${API_BASE_URL}/api/v1/analytics/eda`);
  return data || { status: "empty", data: null };
}

export async function fetchExplorerData(page = 1, limit = 15, search = "", category = "") {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });
  if (search) params.append("search", search);
  if (category) params.append("category", category);

  const data = await safeFetch(`${API_BASE_URL}/api/v1/explorer/data?${params.toString()}`);
  return data || { status: "empty", data: [], total: 0 };
}

export async function fetchEtlLogs() {
  const data = await safeFetch(`${API_BASE_URL}/api/v1/etl/logs`);
  return data || { status: "empty", data: [] };
}

export async function fetchAnomalies() {
  const data = await safeFetch(`${API_BASE_URL}/api/v1/ml/anomalies`);
  return data || { status: "empty", data: [] };
}

export async function fetchForecast() {
  const data = await safeFetch(`${API_BASE_URL}/api/v1/ml/forecast`);
  return data || { status: "empty", data: null };
}

export async function uploadCsvFile(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  let lastErr: any = null;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/etl/upload`, {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Upload failed with status " + res.status);
      return await res.json();
    } catch (err: any) {
      lastErr = err;
      await new Promise((resolve) => setTimeout(resolve, 1500));
    }
  }
  throw lastErr || new Error("Backend server is waking up. Please retry in a few seconds.");
}

export const uploadAndIngestCSV = uploadCsvFile;

export async function runDemoPipelineStream() {
  const data = await safeFetch(`${API_BASE_URL}/api/v1/analytics/eda`);
  return data || { status: "success", data: null };
}

export async function fetchMlModels() {
  const data = await safeFetch(`${API_BASE_URL}/api/v1/ml/models`);
  return data || { status: "empty", count: 0, data: [] };
}

export async function predictModel(modelId: string, features: Record<string, number>) {
  const res = await fetch(`${API_BASE_URL}/api/v1/ml/predict/${modelId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ features }),
  });
  if (!res.ok) throw new Error("Prediction failed");
  return res.json();
}

export async function fetchForecastSummary(horizonDays = 30) {
  const data = await safeFetch(`${API_BASE_URL}/api/v1/forecast/summary?horizon=${horizonDays}`);
  return data || { status: "empty", data: null };
}

export async function fetchAnomalies() {
  const data = await safeFetch(`${API_BASE_URL}/api/v1/anomalies/detect`);
  return data || { status: "empty", data: null };
}

export async function fetchSegmentationClusters(nClusters = 5) {
  const data = await safeFetch(`${API_BASE_URL}/api/v1/segmentation/clusters?clusters=${nClusters}`);
  return data || { status: "empty", data: null };
}

export async function fetchRecommendations() {
  const data = await safeFetch(`${API_BASE_URL}/api/v1/recommendations/latest`);
  return data || { status: "empty", data: null };
}

export async function fetchExecutiveInsights() {
  const data = await safeFetch(`${API_BASE_URL}/api/v1/insights/executive`);
  return data || { status: "empty", data: null };
}
