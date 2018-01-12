import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
// INSTEAD of
import 'rxjs/add/observable/throw';

export class ErrorHandler {
    static handleError(error: Response | any) {
        let errorMessage: string;
        console.log(error);
        if (error instanceof Response) {
            errorMessage = `Erro ${error.status} ao acessar a URL ${error.url} - ${error.statusText}`
        } else {
            errorMessage = error.toString();
        }
        console.log(errorMessage);
        return Observable.throw(errorMessage);
        
    }
}