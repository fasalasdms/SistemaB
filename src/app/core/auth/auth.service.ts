import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, switchMap, throwError } from 'rxjs';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { UserService } from 'app/core/user/user.service';
import { environment } from 'environments/environment';
import { AsyncSubject } from 'rxjs';

@Injectable()
export class AuthService
{
    private _authenticated: boolean = false;
    tokenLocalStorage$ = new AsyncSubject();

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private _userService: UserService
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for access token
     */
    set accessToken(token: string)
    {
        localStorage.setItem('accessToken', token);
    }

    get accessToken(): string
    {
        return localStorage.getItem('accessToken') ?? '';
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Forgot password
     *
     * @param email
     */
    forgotPassword(email: string): Observable<any>
    {
        return this._httpClient.post('api/auth/forgot-password', email);
    }

    /**
     * Reset password
     *
     * @param password
     */
    resetPassword(password: string): Observable<any>
    {
        return this._httpClient.post('api/auth/reset-password', password);
    }

    /**
     * Sign in
     *
     * @param credentials
     */
    signIn(credentials): Observable<any>//{ email: string; password: string }
    {
        // Throw error, if the user is already logged in
        if ( this._authenticated )
        {
            return throwError('User is already logged in.');
        }

        return this._httpClient.post(`${environment.apiUrlAutenticacion}/api/Advance/Login`, credentials).pipe(
            switchMap((response: any) => {

                // Store the access token in the local storage
                this.accessToken = response.result.token;

                // Set the authenticated flag to true
                this._authenticated = true;

                const usuario={
                    usuario:response.result.usuario,
                    nombreCompleto:response.result.nombreCompleto,
                    email:response.result.email,
                    imagen:response.result.imagen,
                    cargo:response.result.cargo
                }

                // Store the user on the user service
                this._userService.user = usuario;

                // Return a new observable with the response
                return of(response);
            })
        );
    }

    getUsuarioDesdeLocalStorage(){
        const usuarioImagen = localStorage.getItem('usuarioImagen');
        const usuarioUsuario = localStorage.getItem('usuarioUsuario');
        const usuarioEmail = localStorage.getItem('usuarioEmail');
        const usuarioNombreCompleto = localStorage.getItem('usuarioNombreCompleto');
        const usuarioCargo = localStorage.getItem('usuarioCargo');

        let usuario = {}

        //if (usuarioImagen)usuario.imagen = usuarioImagen;
        //if (usuarioUsuario)usuario.usuario = usuarioUsuario;
        //if (usuarioEmail)usuario.email = usuarioEmail;
        //if (usuarioNombreCompleto)usuario.nombreCompleto = usuarioNombreCompleto;
        //if (usuarioCargo)usuario.cargo = usuarioCargo;

        return usuario;
    }

    getTokenLocalStorage$(){
        return this.tokenLocalStorage$.asObservable();
    }

    getTokenDeLocalStorage(){
        const tokenLocalStorage = localStorage.getItem("accessToken");
        const res = {
            result:{
                token:tokenLocalStorage
            },
            user:{
                usuario:localStorage.getItem('usuarioUsuario'),
                nombreCompleto:localStorage.getItem('usuarioNombreCompleto'),
                email:localStorage.getItem('usuarioEmail'),
                imagen:localStorage.getItem('usuarioImagen'),
                cargo:localStorage.getItem('usuarioCargo'),
            }
        }
        if (tokenLocalStorage) {
            this.tokenLocalStorage$.next(res);
            this.tokenLocalStorage$.complete();
        }else{
            this.tokenLocalStorage$.error("El token no existe");
        }
        return tokenLocalStorage;
    }
    
    /**
     * Versión antigua de la función
     */
    
    signInUsingToken(): Observable<any>
    {
        // Renew token
        return this.tokenLocalStorage$.pipe(
            catchError(() =>

                // Return false
                of(false)
            ),
            switchMap((response: any) => {

                // Store the access token in the local storage
                this.accessToken = response.result.token;

                // Set the authenticated flag to true
                this._authenticated = true;

                // Store the user on the user service
                this._userService.user = response.user;

                // Return true
                return of(true);
            })
        );
    }

    /**
     * Versión antigua de la función
     */
    /*
    signInUsingToken(): Observable<any>
    {
        // Renew token
        return this._httpClient.post('api/auth/refresh-access-token', {
            accessToken: this.accessToken
        }).pipe(
            catchError(() =>

                // Return false
                of(false)
            ),
            switchMap((response: any) => {

                // Store the access token in the local storage
                this.accessToken = response.result.token;

                // Set the authenticated flag to true
                this._authenticated = true;

                // Store the user on the user service
                this._userService.user = response.user;

                // Return true
                return of(true);
            })
        );
    }*/

    /**
     * Sign out
     */
    signOut(): Observable<any>
    {
        // Remove the access token from the local storage
        localStorage.removeItem('accessToken');

        // Set the authenticated flag to false
        this._authenticated = false;

        // Return the observable
        return of(true);
    }

    /**
     * Sign up
     *
     * @param user
     */
    signUp(user: { name: string; email: string; password: string; company: string }): Observable<any>
    {
        return this._httpClient.post('api/auth/sign-up', user);
    }

    /**
     * Unlock session
     *
     * @param credentials
     */
    unlockSession(credentials: { email: string; password: string }): Observable<any>
    {
        return this._httpClient.post('api/auth/unlock-session', credentials);
    }

    /**
     * Check the authentication status
     */
    check(): Observable<boolean>
    {
        // Check if the user is logged in
        if ( this._authenticated && this.getTokenDeLocalStorage())
        {
            return of(true);
        }

        // Check the access token availability
        if ( !this.accessToken || !this.getTokenDeLocalStorage())
        {
            return of(false);
        }

        // Check the access token expire date
        if ( AuthUtils.isTokenExpired(this.accessToken) )
        {
            return of(false);
        }

        // If the access token exists and it didn't expire, sign in using it
        return this.signInUsingToken();
    }
}
