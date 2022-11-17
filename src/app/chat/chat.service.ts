import { Injectable } from "@angular/core";
import { AngularFireDatabase } from '@angular/fire/compat/database';
import {async, Subject} from "rxjs";
import { AuthService } from "../auth/auth.service";

//Finished!!!!
export interface Message {
  content: string | null | undefined;
  created: Date | null | undefined | string;
  senderId: string | null | undefined;
  senderName: string | null | undefined;
}
export interface ChatRoom {
  name: string;
  msgs:  {[key: string]: Message};
  onlineMembers?: number;
}
@Injectable({ providedIn: 'root' })

export class ChatService {

  constructor(private db: AngularFireDatabase, private auth: AuthService) { }

  currentChatRoom: string = 'main';
// chatRoomData: ChatRoom = {name: '', msgs: {}};
  chatList = new Subject<string[] | null>();
  chatRoomData = new Subject<ChatRoom | null>();
  private_messages: {[key: string]: Message} = {};

  fetchChatList() {
    this.db.list('chatrooms').snapshotChanges().subscribe(data => {
      data.forEach(data => {
        let chatList: string[] = [];
        if (data.key!=null)
          chatList.push(data.key);
        this.chatList.next(chatList.slice());
      });
    });
  }

  fetchChatRoomData() {
    this.db.object<ChatRoom>('chatrooms/' + this.currentChatRoom).valueChanges().subscribe(roomData => {
      this.chatRoomData.next(roomData);
    })
  }

  fetchPrivateMessages() {
    this.db.object<{[key: string]: Message}>(`users/'${this.auth.userData?.uid}/pms`).valueChanges().subscribe(pms => {
      if(pms != null)
        this.private_messages = pms;
    });
  }

  changeRoom(roomName: string) {
    this.currentChatRoom = roomName;
  }

  createRoom(name: string) {
    this.db.object(`chatrooms/'${name}`).update({name}).then(res => {
      console.log(res)}
    ).catch(error => {
      console.log(error);
    });
  }

  ignoreUser(ignoreId: string) {
    this.db.object(`users/'+${this.auth.userData?.uid}/ignoreList`).update(ignoreId).then(res => {
      console.log(res)}
    ).catch(error => {
      console.log(error);
    });
  }

  unIgnoreUser(ignoreId: string) {
    this.db.object(`users/'+${this.auth.userData?.uid}/ignoreList/${ignoreId}`).remove().then(res => {
      console.log(res)}
    ).catch(error => {
      console.log(error);
    });
  }

  sendMessage(msg: Message) {

    console.log(this.auth.userData.displayName)
    if (this.auth.userData.displayName !== undefined) {
      this.db.list<Message>('chatrooms/' + this.currentChatRoom + '/msgs').push({
        content: msg.content, created: new Date().toString(), senderId: msg.senderId,
        senderName: this.auth.userData.displayName.toString()
      }).then(res => {
          console.log(res);
        }
      ).catch(error => {
        console.log(error);
      });
    }
  }

  sendPrivateMessage(msg: Message, uidToSendTo: string, targetDisplayName: string) {
    this.db.list<Message>('users/'+uidToSendTo+'/pms/' + this.auth.userData?.displayName).push(msg).then(res => {
      console.log(res)}
    ).catch(error => {
      console.log(error);
    });
    this.db.list<Message>('users/'+this.auth.userData?.uid+'/pms/'+targetDisplayName).push(msg).then(res => {
      console.log(res)}
    ).catch(error => {
      console.log(error);
    });
  }

  editMessage(msgKey: string, content: string) {
    this.db.object('chatrooms_messages/' + this.currentChatRoom + '/msgs/' + msgKey + '/content').update(content).then(res => {
      console.log(res)}
    ).catch(error => {
      console.log(error);
    });
  }

  deleteMessage(msgKey: string) {
    this.db.object('chatrooms_messages/' + this.currentChatRoom + '/msgs/' + msgKey).remove().then(res => {
      console.log(res)}
    ).catch(error => {
      console.log(error);
    });
  }

}
