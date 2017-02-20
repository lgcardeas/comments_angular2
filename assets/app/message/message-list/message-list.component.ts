import { Component, OnInit } from '@angular/core';
import { Message } from '../message-model/message.model';
import { MessageService } from '../message-services/message.services';

@Component({
    selector: 'app-message-list',
    template: `
                <div class="col-md-8 col-md-offset-2">
                    <app-message 
                                *ngFor = "let message of messages"
                                [message] = "message" >
                    </app-message>
                </div>
    `
})
export class MessageListComponent implements OnInit{
      messages: Message[] = [];

      constructor(private messageService: MessageService){

      }

      ngOnInit(){
          this.messageService.getMessages()
            .subscribe(
                (messages: Message [])=> {
                    this.messages = messages;
                }
            );
      }
}
