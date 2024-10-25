import { Component, ElementRef, ViewChild } from '@angular/core';
import { IconLibaryComponent } from '../../../shared/components/icon-component/icon-libary.component';

@Component({
  selector: 'channel-searchbar',
  standalone: true,
  imports: [IconLibaryComponent],
  templateUrl: './channel-searchbar.component.html',
  styleUrl: './channel-searchbar.component.scss'
})
export class ChannelSearchbarComponent {
  @ViewChild('search') searchInput!: ElementRef;

  focusInput() {
    this.searchInput.nativeElement.focus();
    console.log('focus!');
    
  }
}
