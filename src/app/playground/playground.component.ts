import { Component } from '@angular/core';
import { TextMessageFieldComponent } from "../shared/components/inputs/text-message-field/text-message-field.component";
import { InputFieldsComponent } from "../shared/components/inputs/input-fields/input-fields.component";
import { IconLibaryComponent } from "../shared/components/icon-component/icon-libary.component";
@Component({
  selector: 'app-playground',
  standalone: true,
  imports: [TextMessageFieldComponent, InputFieldsComponent, IconLibaryComponent],
  templateUrl: './playground.component.html',
  styleUrl: './playground.component.scss'
})
export class PlaygroundComponent {

}
