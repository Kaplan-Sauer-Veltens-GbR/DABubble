import { Component, Input, input } from '@angular/core';
import { InputFieldsComponent } from '../../../shared/components/inputs/input-fields/input-fields.component';
import { IconLibaryComponent } from '../../../shared/components/icon-component/icon-libary.component';
import { ButtonComponent } from "../../../shared/components/inputs/button/button.component";



@Component({
  selector: 'channel-edit',
  standalone: true,
  imports: [InputFieldsComponent, IconLibaryComponent, ButtonComponent],
  templateUrl: './channel-edit-popup.component.html',
  styleUrl: './channel-edit-popup.component.scss'
})
export class ChannelEditPopupComponent {
@Input() editMode:boolean = true;
  saveEdit(){
    console.log('works');
    }
}
