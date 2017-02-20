import { Component } from '@angular/core';
import { Message } from './message/message-model/message.model';
import { MessageService } from './message/message-services/message.services';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    providers: [MessageService]
})
export class AppComponent {

}
