import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { SITE_API } from '../../app.api';
import { Menu } from '../../model/menu.model';
import { ErrorHandler } from '../../app.error-handler';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class MenuService {
    constructor(private http: Http) { }

    getMenus(): Observable<Menu[]> {
        return this.http.get(`${SITE_API}/menu?sort=order`)
        .map(response => response.json())
        .catch(ErrorHandler.handleError);
    }

    getPaginas(): Observable<Menu[]> {
        return this.http.get(`${SITE_API}/menu?tela_principal=true&sort=order`)
        .map(response => response.json())
        .catch(ErrorHandler.handleError);
    }

    getMenu(id: string): Observable<Menu> {
        return this.http.get(`${SITE_API}/menu/${id}`)
        .map(response => response.json())
        .catch(ErrorHandler.handleError);
    } 

    salvar(menu: Menu): Observable<String>{
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(`${SITE_API}/menu`, 
            JSON.stringify(menu), new RequestOptions({headers: headers}))
            .map((response) => response.json())
            .map((menu) => menu._id);
    }

    alterar(menu: Menu): Observable<String>{
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put(`${SITE_API}/menu/${menu._id}`, 
            JSON.stringify(menu), new RequestOptions({headers: headers}))
            .map((response) => response.json())
            .map((menu) => menu._id);
    }

    deletar(menu: Menu): Observable<String>{
        const headers = new Headers();
        return this.http.delete(`${SITE_API}/menu/${menu._id}`)
            .map((response) => response.json())
    }
}