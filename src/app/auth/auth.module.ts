import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from "@angular/core";
import {AuthComponent} from "./auth.component";
import {UpdateProfileComponent} from "../profiles/update-profile/update-profile.component";
import {ProfileComponent} from "../profiles/profile/profile.component";
import {SharedModule} from "../shared/shared.module";
import {RouterModule, Routes} from "@angular/router";
import {FirebaseModule} from "../firebase.module";


const authRoutes: Routes = [
  {
    path: '',
    component: AuthComponent,
  }
];

@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(authRoutes)
  ],
  exports: [
    AuthComponent,
    RouterModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AuthModule {

}
