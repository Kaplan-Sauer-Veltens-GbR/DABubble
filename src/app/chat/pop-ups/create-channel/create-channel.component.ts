import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { HeaderComponent } from "../../../main/header/header.component";

@Component({
  selector: 'app-create-channel',
  standalone: true,
  imports: [CommonModule, TranslocoModule, HeaderComponent],
  templateUrl: './create-channel.component.html',
  styleUrl: './create-channel.component.scss'
})
export class CreateChannelComponent {

}
