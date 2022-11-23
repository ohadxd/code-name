import {AfterViewChecked, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/compat/database';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';
import {AuthService} from '../auth/auth.service';
import {ChatRoom, ChatService, Message} from './chat.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, AfterViewChecked {
fakeArray = new Array(12);
@ViewChild('msgForm', {static: false}) messageForm: NgForm | undefined;
@ViewChild('autoScroll', {static: false}) private myScrollContainer: ElementRef;
userId = this.auth.userData.uid;
  messages: {[key:string]: Message} =
    {
      ['init']:{
    content: 'init',
    created: new Date(),
    senderId: 'init',
    senderName:'init'}
  };
    loadingMessages = true;
    chatRoomData: ChatRoom = {name: 'main', msgs: this.messages};
    roomDataSubscription: Subscription | null = null;

  constructor(private db: AngularFireDatabase, private auth: AuthService, private chatService: ChatService) { }
  ngOnInit(): void {

    console.log('logged as: '+this.userId);
    this.chatService.fetchChatRoomData();
    delete this.messages['init'];
    this.roomDataSubscription = this.chatService.chatRoomData.subscribe(data => {
      if (data != null)
        this.chatRoomData = data;
      console.log(data?.msgs);
      this.loadingMessages = false;
    });
  }
  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }
}

  onSubmit(msgForm: NgForm) {

    const displayName: string | undefined = this.auth.userData?.uid;
    console.log(displayName);
    const messageToSend: Message = {content:msgForm.value.message,
      created: new Date(), senderId: this.auth.userData?.uid,
      senderName: this.auth.userData?.displayName};
    console.log("1");
    this.chatService.sendMessage(messageToSend);
    this.messageForm.reset();
    }

    createRoom(): void {
      const name: string = 'main';
      this.chatService.createRoom(name);
    }
    sendMessage(): void {


}
openProfileCard() {
  //getUserCard(id)
  //
}
}