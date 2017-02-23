import { Component, Input } from '@angular/core';
import { Message } from '../message-model/message.model';
import { MessageService } from '../message-services/message.services';

@Component({
    selector: 'app-message',
    templateUrl: './message.component.html',
    styles: [`
        .author {
            display:  inline-block;
            font-style: italic;
            font-size: 12px;
            width: 80%;
        }
        .config {
          display:  inline-block;
          text-align: right;
          font-size: 12px;
          width: 19%;
        }
    `]
})


export class MessageComponent {
  @Input() message: Message;

  constructor (private messagesService: MessageService){

  }

  onEdit(){
      this.messagesService.editMessage(this.message);
    //alert('it worked');
  }

  onDelete(){
      this.messagesService.deleteMessage(this.message)
            .subscribe(
                result => console.log(result)
            );
  }

  belongsToUser(){
      return localStorage.getItem('userId') == this.message.userId;
  }
}
