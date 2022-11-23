import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import {SharedModule} from "./shared/shared.module";
import {AppRoutingModule} from "./app-routing.module";
import {HttpClientModule} from "@angular/common/http";
import { MainComponent } from './main/main.component';
import {GameModule} from "./game/game.module";
import {ProfilesModule} from "./profiles/profiles.module";
import {AngularMatModule} from "./angular-mat.module";
import {ChatModule} from "./chat/chat.module";
import {AuthModule} from "./auth/auth.module";
import {AuthGuard} from "./auth/auth.guard";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AppRoutingModule,
    HttpClientModule,
    GameModule,
    ProfilesModule,
    AngularMatModule,
    ChatModule,
    AuthModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
