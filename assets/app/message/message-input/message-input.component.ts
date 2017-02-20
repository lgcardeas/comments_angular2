import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message-services/message.services';
import { Message } from '../message-model/message.model';
import { NgForm }  from "@angular/forms";

@Component({
        selector: 'app-message-input',
        templateUrl: './message-input.component.html'
})

export class MessageInputComponent implements OnInit{
    message: Message;

  constructor(private messageService: MessageService){}

  onSubmit(form: NgForm) {
        if (this.message){
            //Edit Mesagge
            this.message.content = form.value.content;
            this.messageService.updateMessage(this.message)
                .subscribe(
                    result => console.log(result)
                );
            this.message = null;
        }else{
            //Create Message
            const message = new Message(form.value.content, 'Luis');
            this.messageService.addMessage(message)
                .subscribe(
                    data => console.log(data),
                    error => console.error(error)
                );
        }
      form.resetForm();
  }

  onClear(form: NgForm){
      this.message = null;
      form.reset();
  }

  ngOnInit(){
        this.messageService.messageIsEdit
            .subscribe(
                (message: Message) => {
                    this.message = message
                }
            );
  }
}