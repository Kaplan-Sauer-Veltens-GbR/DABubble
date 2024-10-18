import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon-libary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './icon-libary.component.html',
  styleUrl: './icon-libary.component.scss'
})
export class IconLibaryComponent {
  private baseSrc:string = './assets/icons/icon-libary/'
  @Input() iconName: string = ''; 
  @Input() iconAlt: string = ''; 
  @Input() iconClass:string = '';
  @Input() width: string = '24px';  
  @Input() height: string = '24px';

  get iconSrc(): string {
    return `${this.baseSrc}${this.iconName}.svg`; 
  }
}
