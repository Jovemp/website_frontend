import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { SITE_API } from '../app.api';
import { Produto } from '../model/produto.model';
import { ErrorHandler } from '../app.error-handler';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ProdutoService {
    constructor(private http: Http) { }

    getProduto(): Observable<Produto[]> {
        return this.http.get(`${SITE_API}/produto`)
            .map(response => {
                return response.json()
            })
            .catch(ErrorHandler.handleError);
    }

    deletar(produto: Produto): Observable<String> {
        const headers = new Headers();
        return this.http.delete(`${SITE_API}/produto/${produto._id}`)
            .map((response) => response.json())
    }

    getProdutoID(id: string): Observable<Produto> {
        return this.http.get(`${SITE_API}/produto/${id}`)
        .map(response => response.json())
        .catch(ErrorHandler.handleError);
    } 

    upload(formData, id) {
        const headers = new Headers();
        return this.http.post(`${SITE_API}/upload_file`,
            formData, new RequestOptions({ headers: headers }))
            .map((response) => response.json());
    }

    salvar(produto: Produto): Observable<String>{
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(`${SITE_API}/produto`, 
            JSON.stringify(produto), new RequestOptions({headers: headers}))
            .map((response) => response.json())
            .map((produto) => produto._id);
    }

    alterar(produto: Produto): Observable<String>{
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put(`${SITE_API}/produto/${produto._id}`, 
            JSON.stringify(produto), new RequestOptions({headers: headers}))
            .map((response) => response.json())
            .map((produto) => produto._id);
    }
}