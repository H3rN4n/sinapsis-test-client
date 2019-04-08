import { Observable, of } from 'rxjs';

import { Credentials } from './authentication.service';

export class MockAuthenticationService {
  credentials: Credentials | null = {
    email: 'test@email.com',
    email_verified: true,
    family_name: 'Test',
    given_name: 'Test',
    locale: 'es',
    name: 'Test',
    nickname: 'test',
    picture: 'testimg',
    sub: 'test',
    updated_at: ''
  };

  login(context: any): Observable<Credentials> {
    return of({
      email: context.email,
      email_verified: context.email_verified,
      family_name: context.family_name,
      given_name: context.given_name,
      locale: context.locale,
      name: context.name,
      nickname: context.nickname,
      picture: context.picture,
      sub: context.sub,
      updated_at: context.updated_at
    });
  }

  logout(): Observable<boolean> {
    this.credentials = null;
    return of(true);
  }

  isAuthenticated(): boolean {
    return !!this.credentials;
  }
}
