import {Routes} from '@angular/router';
import {ClienteComponent} from './cliente/cliente.component';
import { AdmLoginComponent } from './adm/adm-login/adm-login.component';
import { AuthGuard } from './guards/auth.guard';

export const ROUTES: Routes = [
    {path: '', component: ClienteComponent, pathMatch: 'full'},
    {path: 'adm', canLoad: [AuthGuard], loadChildren: './adm/adm.module#AdmModule'},
    {path: 'login', component: AdmLoginComponent }
];