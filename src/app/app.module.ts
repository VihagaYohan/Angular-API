import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// components
import { PostsComponent } from './components/posts/posts.component';

// services
import { PostService } from './service/post.service';
import { AppErrorHandler } from './service/common/app-error-handler';

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [PostService,{
    provide:ErrorHandler,useClass:AppErrorHandler
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
