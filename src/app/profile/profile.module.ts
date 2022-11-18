import {NgModule} from "@angular/core";
import {SharedModule} from "../shared/shared.module";
import {RouterModule, Routes} from "@angular/router";
import {UpdateProfileComponent} from "./update-profile/update-profile.component";
import {ProfileComponent} from "./profile/profile.component";
import {GameComponent} from "../game/game.component";
import {AuthGuard} from "../auth/auth.guard";
import {GameRoomLobbyComponent} from "../game/game-room-lobby/game-room-lobby.component";
import {NewGameComponent} from "../game/new-game/new-game.component";


const routes: Routes = [{
  path: '',
  component: ProfileComponent,
  canActivate: [AuthGuard],
  children: [
    {
      path:'profile/:id',
      component: ProfileComponent,
      pathMatch: 'full'
    },
    {
      path: 'profile/edit',
      component: UpdateProfileComponent,
      pathMatch: 'full'
    }
  ]
}];
@NgModule({
  declarations: [
    ProfileComponent,
    UpdateProfileComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    ProfileComponent,
    UpdateProfileComponent,
    RouterModule
  ]
})

export class ProfileModule {

}
