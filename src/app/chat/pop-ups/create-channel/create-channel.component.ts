import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { HeaderComponent } from "../../../main/header/header.component";
import { IconLibaryComponent } from '../../../shared/components/icon-component/icon-libary.component';
import { InputFieldsComponent } from "../../../shared/components/inputs/input-fields/input-fields.component";
import { ButtonComponent } from '../../../shared/components/inputs/button/button.component';

@Component({
  selector: 'app-create-channel',
  standalone: true,
  imports: [CommonModule, TranslocoModule, HeaderComponent, IconLibaryComponent, InputFieldsComponent,ButtonComponent],
  templateUrl: './create-channel.component.html',
  styleUrl: './create-channel.component.scss'
})
export class CreateChannelComponent {

}
