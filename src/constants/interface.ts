export interface IListResponse<T> {
  data: T[];
  total: number;
}

export interface ISignData {
  userId: string;
  email?: string;
  iat?: number;
  exp?: number;
}
