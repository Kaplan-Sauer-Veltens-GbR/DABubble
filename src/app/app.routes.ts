import { Routes } from '@angular/router';
import { ChatMessageComponent } from './shared/components/chat/chat-message/chat-message.component';
import { PlaygroundPhillipComponent } from './playground-phillip/playground-phillip.component';

export const routes: Routes = [
    {path: 'playground', component: ChatMessageComponent},
    {path: 'playgroundPhil', component:PlaygroundPhillipComponent}
];
