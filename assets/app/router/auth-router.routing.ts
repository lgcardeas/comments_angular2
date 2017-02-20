import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent } from '../user/signup/signup.component';
import { SignInComponent } from '../user/signin/signin.component';
import { LogOutComponent }  from "../user/logout/logout.component";

export const AUTH_ROUTES : Routes = [
    {path:'', redirectTo: 'signup' , pathMatch: 'full'},
    {path:'signup', component: SignUpComponent},
    {path:'signin', component: SignInComponent},
    {path:'logout', component: LogOutComponent}
]
