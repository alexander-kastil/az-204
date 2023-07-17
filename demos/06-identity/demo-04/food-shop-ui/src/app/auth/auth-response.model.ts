export interface IdTokenClaims {
  aud: string;
  iss: string;
  iat: number;
  nbf: number;
  exp: number;
  name: string;
  nonce: string;
  oid: string;
  preferred_username: string;
  rh: string;
  sub: string;
  tid: string;
  uti: string;
  ver: string;
}

export interface MsalAccount {
  homeAccountId: string;
  environment: string;
  tenantId: string;
  username: string;
  localAccountId: string;
  name: string;
  idTokenClaims: IdTokenClaims;
}

export interface MsalAuthResponse {
  accessToken: string;
  account: MsalAccount;
  idToken: string;
  scopes: string[];
}
