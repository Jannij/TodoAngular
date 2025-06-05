import { bootstrapApplication } from '@angular/platform-browser';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { AppComponent } from './app/app.component';
import {provideRouter} from '@angular/router';
import {routes} from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideNoopAnimations(),
    provideRouter(routes)
  ]
}).catch(err => console.error(err));
