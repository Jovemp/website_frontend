import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { SITE_API } from '../app.api';
import { Principal } from '../model/principal.model';
import { ErrorHandler } from '../app.error-handler';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class PrincipalService {
    constructor(private http: Http) { }

    getPrincipal(): Observable<Principal> {
        return this.http.get(`${SITE_API}/principal`)
        .map(response => response.json())
        .map(resp => {
            if (resp.length > 0) {
                return resp[0];
            } else {
                return undefined;
            }
        })
        .catch(ErrorHandler.handleError);
    }
}