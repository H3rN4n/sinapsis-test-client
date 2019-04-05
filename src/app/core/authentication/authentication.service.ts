import { Injectable } from '@angular/core';
import { AUTH_CONFIG } from './auth0.variables';
import { Observable, of } from 'rxjs';
import * as auth0 from 'auth0-js';
import { Router } from '@angular/router';

export interface Credentials {
  // Customize received credentials here
  username: string;
  token: string;
}

const credentialsKey = 'credentials';

/**
 * Provides a base for authentication workflow.
 * The Credentials interface as well as login/logout methods should be replaced with proper implementation.
 */
@Injectable()
export class AuthenticationService {
  private _credentials: Credentials | null;

  private _idToken: string;
  private _accessToken: string;
  private _expiresAt: number;

  userProfile: any;

  auth0 = new auth0.WebAuth({
    clientID: AUTH_CONFIG.clientID,
    domain: AUTH_CONFIG.domain,
    responseType: 'token id_token',
    redirectUri: AUTH_CONFIG.callbackURL
  });

  /**
   * Gets the user access token.
   * @return The user access token or null if the user is not authenticated.
   */
  get accessToken(): string {
    return this._accessToken;
  }

  /**
   * Gets the user token id.
   * @return The user token id or null if the user is not authenticated.
   */
  get idToken(): string {
    return this._idToken;
  }

  /**
   * Gets the user credentials.
   * @return The user credentials or null if the user is not authenticated.
   */
  get credentials(): Credentials | null {
    return this._credentials;
  }

  constructor(private router: Router) {
    this._idToken = null;
    this._accessToken = null;
    this._expiresAt = 0;

    const savedCredentials = sessionStorage.getItem(credentialsKey) || localStorage.getItem(credentialsKey);
    if (savedCredentials) {
      this._credentials = JSON.parse(savedCredentials);
    }
  }

  /**
   * Authenticates the user.
   * @param context The login parameters.
   * @return The user credentials.
   */
  login(): void {
    this.auth0.authorize();
  }

  /**
   * Logs out the user and clear credentials.
   * @return True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    // Customize credentials invalidation here
    this.setCredentials();

    this._accessToken = '';
    this._idToken = '';
    this._expiresAt = 0;

    this.auth0.logout({
      returnTo: '/'
    });

    return of(true);
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.localLogin(authResult);
        this.getProfile((err: any, profile: any) => {
          this.userProfile = profile;
        });

        this.router.navigate(['/home']);
      } else if (err) {
        console.log(err);
        this.router.navigate(['/login']);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }

  private localLogin(authResult: any): void {
    // Set the time that the access token will expire at
    const expiresAt = authResult.expiresIn * 1000 + Date.now();
    this._accessToken = authResult.accessToken;
    this._idToken = authResult.idToken;
    this._expiresAt = expiresAt;
  }

  public renewTokens(): void {
    this.auth0.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.localLogin(authResult);
      } else if (err) {
        alert(`Could not get a new token (${err.error}: ${err.errorDescription}).`);
        this.logout();
      }
    });
  }

  /**
   * Checks is the user is authenticated.
   * @return True if the user is authenticated.
   */
  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    return this._accessToken && Date.now() < this._expiresAt;
  }

  public getProfile(cb: any): void {
    if (!this._accessToken) {
      throw new Error('Access token must exist to fetch profile');
    }

    const self = this;
    this.auth0.client.userInfo(this._accessToken, (err, profile) => {
      if (profile) {
        self.userProfile = profile;
      }
      cb(err, profile);
    });
  }

  /**
   * Sets the user credentials.
   * The credentials may be persisted across sessions by setting the `remember` parameter to true.
   * Otherwise, the credentials are only persisted for the current session.
   * @param credentials The user credentials.
   * @param remember True to remember credentials across sessions.
   */
  private setCredentials(credentials?: Credentials, remember?: boolean) {
    this._credentials = credentials || null;

    if (credentials) {
      const storage = remember ? localStorage : sessionStorage;
      storage.setItem(credentialsKey, JSON.stringify(credentials));
    } else {
      sessionStorage.removeItem(credentialsKey);
      localStorage.removeItem(credentialsKey);
    }
  }
}
