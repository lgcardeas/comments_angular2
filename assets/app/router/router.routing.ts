import { Routes, RouterModule }  from '@angular/router';
import { MessagesComponent }  from '../message/messages.component';
import { AuthenticationComponent }  from '../user/authentication-component/authentication.component';
import { AUTH_ROUTES } from './auth-router.routing';

const APP_ROUTES : Routes = [
        {path: '', redirectTo: '/messages', pathMatch: 'full'},
        {path: 'messages', component: MessagesComponent},
        {path: 'auth', component: AuthenticationComponent, children: AUTH_ROUTES}
];

export const routing = RouterModule.forRoot(APP_ROUTES);
