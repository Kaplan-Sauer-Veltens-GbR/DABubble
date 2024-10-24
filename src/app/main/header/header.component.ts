import { Component } from '@angular/core';
import { ChannelSearchComponent } from "./channel-search/channel-search.component";
import { AvatarMenuComponent } from "./avatar-menu/avatar-menu.component";


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ChannelSearchComponent, AvatarMenuComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
