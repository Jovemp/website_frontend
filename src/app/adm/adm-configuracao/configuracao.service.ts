import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { SITE_API } from '../../app.api';
import { ErrorHandler } from '../../app.error-handler';
import { Observable } from 'rxjs/Observable';
import { Configuracao } from '../../model/configuracao.model';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ConfiguracaoService {
    constructor(private http: Http) { }

    getConfiguracao(): Observable<Configuracao> {
        console.log(SITE_API);
        return this.http.get(`${SITE_API}/principal`)
        .map(response => response.json())
        .map(confs => {
            if (confs.length > 0){
                return confs[0];
            } else {
                return undefined;
            }
        })
        .catch(ErrorHandler.handleError);
    }

    salvar(conf: Configuracao): Observable<String>{
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(`${SITE_API}/principal`, 
            JSON.stringify(conf), new RequestOptions({headers: headers}))
            .map((response) => response.json())
            .map((produto) => produto._id);
    }

    alterar(conf: Configuracao): Observable<String>{
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put(`${SITE_API}/principal/${conf._id}`, 
            JSON.stringify(conf), new RequestOptions({headers: headers}))
            .map((response) => response.json())
            .map((produto) => produto._id);
    }
}