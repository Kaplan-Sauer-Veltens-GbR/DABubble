import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IconLibaryComponent } from '../shared/components/icon-component/icon-libary.component';
import { InputFieldsComponent } from '../shared/components/inputs/input-fields/input-fields.component';
import { TextMessageFieldComponent } from '../shared/components/inputs/text-message-field/text-message-field.component';

@Component({
  selector: 'app-playground-phillip',
  standalone: true,
  imports: [CommonModule,IconLibaryComponent,InputFieldsComponent,TextMessageFieldComponent],
  templateUrl: './playground-phillip.component.html',
  styleUrl: './playground-phillip.component.scss'
})
export class PlaygroundPhillipComponent {

}
