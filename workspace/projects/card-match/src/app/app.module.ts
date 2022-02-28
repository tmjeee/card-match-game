import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {GamePage} from "./page/game.page";
import {TimerComponent} from "./component/timer.component";
import {BoardComponent} from "./component/board.component";
import {GameService} from "./service/game.service";
import {FlexLayoutModule} from "@angular/flex-layout";

@NgModule({
  declarations: [
    // pages
    GamePage,

    // components
    TimerComponent,
    BoardComponent,

    // bootstrap
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
  ],
  providers: [
    {provide: GameService, useClass: GameService},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
