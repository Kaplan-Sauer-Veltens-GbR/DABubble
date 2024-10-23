import { Component } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'app-avatar-bar',
  standalone: true,
  imports: [TranslocoModule],
  templateUrl: './avatar-bar.component.html',
  styleUrl: './avatar-bar.component.scss'
})
export class AvatarBarComponent {
  exampleUsers: string[] = ['Theo', 'Simone', 'Klaus', 'Paul', 'Petra'];

  openMemberManagement() {
    console.log('Mitgliederverwaltung: geöffnet');
    
  }
}
