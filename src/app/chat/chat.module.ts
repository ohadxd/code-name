import {NgModule} from "@angular/core";
import {ChatComponent} from "./chat.component";
import {ChatRoomsComponent} from "./chat-rooms/chat-rooms.component";
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [
    ChatComponent,
    ChatRoomsComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    ChatComponent,
    ChatRoomsComponent
  ]
})

export class ChatModule {

}
