import { Routes } from '@angular/router';
import { PlaygroundComponent } from './playground/playground.component';
import { ChatWindowComponent } from './main/chat-window/chat-window.component';


export const routes: Routes = [
    {path: 'playground', component: PlaygroundComponent},
    {path: '', component: ChatWindowComponent},

];
