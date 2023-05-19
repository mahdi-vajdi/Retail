export interface JwtPayload {
  id: number;
  token_type: string;
  iat: number;
  exp: number;
}
