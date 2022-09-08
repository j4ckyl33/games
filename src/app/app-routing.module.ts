import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {FourWinsComponent} from "./components/four-wins/four-wins.component";
import {HomescreenComponent} from "./components/homescreen/homescreen.component";
import {DungeonCrawlerComponent} from "./components/dungeon-crawler/dungeon-crawler.component";

const routes: Routes = [
  { path: 'fourwins', component: FourWinsComponent},
  { path: 'dungeoncrawler', component: DungeonCrawlerComponent},
  { path: '', component: HomescreenComponent, pathMatch: 'full'}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
