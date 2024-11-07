import { Component, inject } from '@angular/core';
import { ChannelSearchbarComponent } from './channel-searchbar/channel-searchbar.component';
import { AvatarMenuComponent } from './avatar-menu/avatar-menu.component';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ChannelSearchbarComponent, AvatarMenuComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
