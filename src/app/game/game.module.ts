import {NgModule} from "@angular/core";
import {GameComponent} from "./game.component";
import {GameRoomsComponent} from "./game-rooms/game-rooms.component";
import {NewGameComponent} from "./new-game/new-game.component";
import {GameRoomLobbyComponent} from "./game-room-lobby/game-room-lobby.component";
import {GamePlayComponent} from "./game-play/game-play.component";
import {SharedModule} from "../shared/shared.module";
import {RouterModule, Routes} from "@angular/router";
import {AuthGuard} from "../auth/auth.guard";


const gameRoutes: Routes = [{
  path: '',
  component: GameComponent,
  canActivate: [AuthGuard],
  children: [
    {
      path:'',
      redirectTo: 'new_game',
      pathMatch: 'full'
    },
    {path: 'play/:room', component: GameRoomLobbyComponent},
    {path: 'new_game', component: NewGameComponent}]
}];

@NgModule({
  declarations: [
    GameComponent,
    GameRoomsComponent,
    NewGameComponent,
    GameRoomLobbyComponent,
    GamePlayComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(gameRoutes)
  ],
  exports: [
    GameComponent,
    GameRoomsComponent,
    NewGameComponent,
    GameRoomLobbyComponent,
    GamePlayComponent,
    RouterModule
  ]
})

export class GameModule {

}
