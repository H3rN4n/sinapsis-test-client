interface AuthConfig {
  clientID: string;
  domain: string;
  callbackURL: string;
}

export const AUTH_CONFIG: AuthConfig = {
  clientID: 'MGiRo1CDQ5BhGuTXkQASriYHI7pSpu8D',
  domain: 'dev-6zgsjium.auth0.com',
  callbackURL: 'http://localhost:4200/callback'
};
