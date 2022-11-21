import {NgModule} from "@angular/core";
import {PreloadAllModules, RouterModule, Routes} from "@angular/router";
import {SharedModule} from "./shared/shared.module";
import {MainComponent} from "./main/main.component";
import { AuthGuard } from "./auth/auth.guard";


const routes: Routes = [
  {
    path: '',
     redirectTo: "/main",
     pathMatch: 'full'
    },
  {
    path: 'main',
    component: MainComponent,
    children: [],
    canActivate: [AuthGuard]
    },

  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'game',
    loadChildren: () => import('./game/game.module').then(m => m.GameModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profiles/profiles.module').then(m => m.ProfilesModule)
  },
  {
    path: '**',
    component: MainComponent,
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules}), SharedModule],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
function appRoutes(appRoutes: any, arg1: { preloadingStrategy: typeof PreloadAllModules; }): any[] | import("@angular/core").Type<any> | import("@angular/core").ModuleWithProviders<{}> {
  throw new Error("Function not implemented.");
}

function redirectLoggedInTo(arg0: string[]) {
  throw new Error("Function not implemented.");
}

