import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-popup-notification',
  standalone: true,
  templateUrl: './popup-notification.component.html',
  styleUrls: ['./popup-notification.component.scss'],
})
export class PopupNotificationComponent implements OnInit {
  @Input() message: string = ''; // Dynamische Nachricht
  isVisible: boolean = false;

  ngOnInit(): void {
    this.isVisible = true; // Popup anzeigen
    setTimeout(() => {
      this.isVisible = false; // Popup nach 2 Sekunden ausblenden
    }, 2000);
  }
}