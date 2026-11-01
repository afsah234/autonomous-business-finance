export interface ApiError {
  message: string;
  statusCode?: number;
  timestamp?: string;
  path?: string;
  details?: unknown;
}
