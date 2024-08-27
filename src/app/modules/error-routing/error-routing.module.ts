import { ErrorHandler, NgModule, Provider } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GlobalErrorHandlerService } from './error/global-error-handler.service';
import { UncaughtErrorComponent } from './error/uncaught-error.component';
import { PageNotFoundComponent } from './not-found/not-found.component';
import { SharedModule } from '../shared/shared.module';

const providers: Provider[] = [];

if (environment.production) {
  // TODO: error routing production'a bakacak
  // Init production error handler
  providers.push({
    provide: ErrorHandler,
    useClass: GlobalErrorHandlerService,
  });
}

@NgModule({
  declarations: [UncaughtErrorComponent, PageNotFoundComponent],
  providers,
  imports: [SharedModule],
})
export class ErrorRoutingModule {}
