import {NgModule} from "@angular/core";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../environments/environment";
import {getAuth, provideAuth} from "@angular/fire/auth";
import {getDatabase, provideDatabase} from "@angular/fire/database";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import {initializeApp, provideFirebaseApp} from "@angular/fire/app";

@NgModule({
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    AngularFireStorageModule,
    provideFirebaseApp(() => initializeApp(environment.firebase))
  ],
  exports: [
    AngularFireModule,
    AngularFireStorageModule
  ]
})

export class FirebaseModule {

}
