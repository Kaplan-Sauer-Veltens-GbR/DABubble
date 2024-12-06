import { CommonModule } from '@angular/common';
import { AfterContentInit, Component, EventEmitter, inject, Input, Optional, Output, output } from '@angular/core';
import { InputFieldsComponent } from '../inputs/input-fields/input-fields.component';
import { IconName } from '../../../interfaces/icon-names.model';
import { WorkspaceService } from '../../../services/workspace.service';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './icon-libary.component.html',
  styleUrl: './icon-libary.component.scss',
})
export class IconLibaryComponent {
  private baseSrc: string = './assets/icons/icon-libary/';
  @Input() iconName: IconName = '';
  @Input() iconAlt: string = '';
  @Input() iconClass: string = '';
  @Input() suffix: string = 'svg';
  @Input() round: boolean = false;
  @Input() width: string = '';
  @Input() height: string = '';
  @Output()popUpClose = new EventEmitter<void>();
  @Input()closePopup:boolean = false;
  isInInputField: boolean = false;
  private workspace = inject(WorkspaceService)
  constructor(@Optional() private inputField: InputFieldsComponent) {}

  get iconSrc(): string {
    const pathModifier = this.suffix == 'png' ? 'png/' : '';
    return `${this.baseSrc}${pathModifier}${this.iconName}.${this.suffix}`;
  }

  ngOnInit(): void {
    if (this.inputField) {
      this.isInInputField = true;
    } else {
      this.isInInputField = false;
    }
  }

  onClick() {
    if(this.closePopup) {
      this.workspace.closeDialog();
    }
  }
 
}
