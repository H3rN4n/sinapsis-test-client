interface AuthConfig {
  clientID: string;
  domain: string;
  callbackURL: string;
}
import { environment } from '../../../environments/environment';

export const AUTH_CONFIG: AuthConfig = {
  clientID: 'MGiRo1CDQ5BhGuTXkQASriYHI7pSpu8D',
  domain: 'dev-6zgsjium.auth0.com',
  callbackURL: environment.auth0CallbackUrl
};
