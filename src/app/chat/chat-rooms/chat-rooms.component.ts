import { Component, OnDestroy, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { Subscription } from 'rxjs';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-chat-rooms',
  templateUrl: './chat-rooms.component.html',
  styleUrls: ['./chat-rooms.component.scss']
})
export class ChatRoomsComponent implements OnInit, OnDestroy {


  listSubscription: Subscription | null = null;
  list: string[] | null = [];

  constructor(private chatService: ChatService) { }


  ngOnInit(): void {
    this.chatService.fetchChatList();
    this.listSubscription = this.chatService.chatList.subscribe(list => {
      this.list = list;
    });
  }

  changeRoom(room: string) {
    this.chatService.changeRoom(room);
  }

  ngOnDestroy(): void {
    this.listSubscription?.unsubscribe();
  }

}
