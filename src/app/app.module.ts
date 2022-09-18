import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FourWinsComponent } from './components/four-wins/four-wins.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { HomescreenComponent } from './components/homescreen/homescreen.component';
import { DungeonCrawlerComponent } from './components/dungeon-crawler/dungeon-crawler.component';
import { BoardComponent } from './components/dungeon-crawler/components/board/board.component';
import { PlayerInteractionComponent } from './components/dungeon-crawler/components/player-interaction/player-interaction.component';
import { ShopComponent } from './components/dungeon-crawler/components/shop/shop.component';
import { InventoryComponent } from './components/dungeon-crawler/components/inventory/inventory.component';
import { PlayerActionsComponent } from './components/dungeon-crawler/components/player-actions/player-actions.component';
import { PlayerCreationComponent } from './components/dungeon-crawler/components/player-creation/player-creation.component';

@NgModule({
  declarations: [
    AppComponent,
    FourWinsComponent,
    NavigationComponent,
    HomescreenComponent,
    DungeonCrawlerComponent,
    BoardComponent,
    PlayerInteractionComponent,
    ShopComponent,
    InventoryComponent,
    PlayerActionsComponent,
    PlayerCreationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
