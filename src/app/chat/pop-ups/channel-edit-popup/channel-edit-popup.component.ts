import { Component, inject, Input } from '@angular/core';
import { InputFieldsComponent } from '../../../shared/components/inputs/input-fields/input-fields.component';
import { IconLibaryComponent } from '../../../shared/components/icon-component/icon-libary.component';
import { ButtonComponent } from "../../../shared/components/inputs/button/button.component";
import { TranslocoModule } from '@jsverse/transloco';
import { WorkspaceService } from '../../../services/workspace.service';



@Component({
  selector: 'channel-edit',
  standalone: true,
  imports: [InputFieldsComponent, IconLibaryComponent, ButtonComponent, TranslocoModule],
  templateUrl: './channel-edit-popup.component.html',
  styleUrl: './channel-edit-popup.component.scss'
})
export class ChannelEditPopupComponent {
  public workspace = inject(WorkspaceService)
  @Input() editMode: boolean = false;
  @Input() channelName!: string;
  @Input() description!: string;
  @Input() author!: string;
  saveEdit() {
    console.log('works');
  }
}
