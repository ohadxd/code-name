import {NgModule} from "@angular/core";
import {SharedModule} from "../shared/shared.module";
import {RouterModule, Routes} from "@angular/router";
import {UpdateProfileComponent} from "./update-profile/update-profile.component";
import {ProfileComponent} from "./profile/profile.component";


const routes: Routes = [
  {
    path: 'profile/edit',
    component: UpdateProfileComponent
  },
  {
    path: 'profile/:id',
    component: ProfileComponent
  }
]
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
    UpdateProfileComponent
  ]
})

export class ProfileModule {

}
