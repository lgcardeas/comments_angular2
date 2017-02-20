import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from "./app.component";
//Message Components
import { MessageComponent } from "./message/message-component/message.component";
import { MessageListComponent } from "./message/message-list/message-list.component";
import { MessageInputComponent } from "./message/message-input/message-input.component";
import { MessagesComponent } from "./message/messages.component";
//User Components
import { AuthenticationComponent}  from "./user/authentication-component/authentication.component";
import { LogOutComponent } from './user/logout/logout.component';
import { SignInComponent }  from "./user/signin/signin.component";
import { SignUpComponent }  from "./user/signup/signup.component";
//Header Components
import { HeaderComponent} from "./header/header.component";
//Router
import { routing } from "./router/router.routing";
//Authentication services
import { AuthService }  from "./user/auth-service/auth.service";

@NgModule({
    declarations: [
        AppComponent,
        MessageComponent,
        MessageListComponent,
        MessageInputComponent,
        MessagesComponent,
        AuthenticationComponent,
        HeaderComponent,
        LogOutComponent,
        SignInComponent,
        SignUpComponent
    ],
    imports: [BrowserModule,
                FormsModule,
                routing,
                ReactiveFormsModule,
                HttpModule
            ],
    providers: [AuthService],
    bootstrap: [AppComponent]
})
export class AppModule {

}
