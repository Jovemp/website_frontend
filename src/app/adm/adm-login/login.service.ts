import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { SITE_API } from '../../app.api';
import { ErrorHandler } from '../../app.error-handler';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class LoginService {
    constructor(private http: Http) { }

    salvar(login: { usuario: string,
                    senha: string}): Observable<Boolean>{
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(`${SITE_API}/login`, 
            JSON.stringify(login), new RequestOptions({headers: headers}))
            .map((response) => response.json())
            .map(retorno => {
                if (retorno != undefined){
                    localStorage.setItem('currentUser', JSON.stringify({ usuario: login.usuario,
                                                                         id: retorno._id }));
                } 
                return retorno;
            });
    }

    alteraSenha(senha: { _id: string,
                         senha: string,
                         usuario: string,
                         senha_atual: string}): Observable<any>{
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(`${SITE_API}/altera-senha`, 
            JSON.stringify(senha), new RequestOptions({headers: headers}))
            .map((response) => response.json())
            .map(retorno => {
                return retorno;
            });
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}