import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { SITE_API } from '../app.api';
import { ErrorHandler } from '../app.error-handler';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ContatoService {
    constructor(private http: Http) { }

    enviar(contato: any): Observable<String>{
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(`${SITE_API}/contato`, 
            JSON.stringify(contato), new RequestOptions({headers: headers}))
            .map((response) => response.json());
    }

}