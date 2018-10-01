import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ProductsComponent } from './products/products.component';
import { CacheMapService } from './services/cache-map.service';
import { LoggingInterceptor } from './http-interceptors/logging-interceptor';
import { CachingInterceptor } from './http-interceptors/caching-interceptor';
import { ApiService } from './api.service';
//For InMemory testing
 import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
// import { TestData } from './test-data';
 export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: CachingInterceptor, multi: true }
]; 
export function windowFactory(): any {
  return window;
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProductsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ServiceWorkerModule.register('./ngsw-worker.js', { enabled: environment.production }),
    //InMemoryWebApiModule.forRoot(TestData)	
  ],
  providers: [
    ApiService,
    {provide: Window, useFactory: windowFactory},
     CacheMapService,
     { provide: Cache, useClass: CacheMapService },
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
