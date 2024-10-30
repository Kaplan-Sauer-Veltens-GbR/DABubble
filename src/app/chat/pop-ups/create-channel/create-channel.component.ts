import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { HeaderComponent } from "../../../main/header/header.component";
import { IconLibaryComponent } from '../../../shared/components/icon-component/icon-libary.component';

@Component({
  selector: 'app-create-channel',
  standalone: true,
  imports: [CommonModule, TranslocoModule, HeaderComponent,IconLibaryComponent],
  templateUrl: './create-channel.component.html',
  styleUrl: './create-channel.component.scss'
})
export class CreateChannelComponent {

}
