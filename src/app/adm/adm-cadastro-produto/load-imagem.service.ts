import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { SITE_API } from '../../app.api';
import { ErrorHandler } from '../../app.error-handler';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class LoadImagemService {
    constructor(private http: Http) { }

    getImagens(): Observable<any[]> {
        return this.http.get(`${SITE_API}/load_images`)
        .map(response => response.json())
        .catch(ErrorHandler.handleError);
    }
}