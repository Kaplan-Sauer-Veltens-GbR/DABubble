import { Component } from '@angular/core';
import { ReactionDetailsComponent } from "./reaction-details/reaction-details.component";

@Component({
  selector: 'app-single-reaction-icon',
  standalone: true,
  imports: [ReactionDetailsComponent],
  templateUrl: './single-reaction-icon.component.html',
  styleUrl: './single-reaction-icon.component.scss'
})
export class SingleReactionIconComponent {

}
