import {CanActivateFn, Router} from '@angular/router';
import {AppStateService} from "../services/app-state.service";
import {inject} from "@angular/core";

export const authenticationGuard: CanActivateFn = (route, state) => {
   const appState: AppStateService = inject(AppStateService);
   const router: Router = inject(Router);
   if (appState.authState.isAuthenticated)
     return  true;
   else
     return router.navigateByUrl('/login');
};
