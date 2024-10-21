import { Component } from '@angular/core';
import { InputFieldsComponent } from '../../../shared/components/inputs/input-fields/input-fields.component';
import { IconLibaryComponent } from '../../../shared/components/icon-component/icon-libary.component';



@Component({
  selector: 'channel-edit',
  standalone: true,
  imports: [InputFieldsComponent, IconLibaryComponent],
  templateUrl: './channel-edit-popup.component.html',
  styleUrl: './channel-edit-popup.component.scss'
})
export class ChannelEditPopupComponent {

  saveEdit(){
    console.log('works');
    }
}
