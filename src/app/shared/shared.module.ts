import {NgModule} from "@angular/core";
import {DropdownDirective} from "./dropdown.directive";
import {LoadingComponent} from "./loading.component";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { SpinnerComponent } from './spinner/spinner.component';
import {AngularMatModule} from "../angular-mat.module";
import {FirebaseAppModule} from "@angular/fire/app";
import {FirebaseModule} from "../firebase.module";

@NgModule({
  declarations: [
    DropdownDirective,
    LoadingComponent,
    SpinnerComponent,


  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    AngularMatModule,
    FirebaseModule

  ],
  exports: [
    CommonModule,
    LoadingComponent,
    DropdownDirective,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularMatModule,
    RouterModule,
    FirebaseModule
  ]
})
export class SharedModule {

}
