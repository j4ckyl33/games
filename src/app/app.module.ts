import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FourWinsComponent } from './components/four-wins/four-wins.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { HomescreenComponent } from './components/homescreen/homescreen.component';
import { DungeonCrawlerComponent } from './components/dungeon-crawler/dungeon-crawler.component';

@NgModule({
  declarations: [
    AppComponent,
    FourWinsComponent,
    NavigationComponent,
    HomescreenComponent,
    DungeonCrawlerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
