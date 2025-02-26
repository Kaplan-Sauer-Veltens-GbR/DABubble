import { Component, Input } from '@angular/core';
import { ReactionDetailsComponent } from "./reaction-details/reaction-details.component";
import { IconLibaryComponent } from '../../../../icon-component/icon-libary.component';
import { IconName } from '../../../../../../interfaces/icon-names.model';

@Component({
  selector: 'app-single-reaction-icon',
  standalone: true,
  imports: [ReactionDetailsComponent, IconLibaryComponent],
  templateUrl: './single-reaction-icon.component.html',
  styleUrl: './single-reaction-icon.component.scss'
})
export class SingleReactionIconComponent {
  @Input() reactionDetails: any; // CAVE: Change later

  key!: IconName;

  ngOnInit() {
    
    this.key = Object.keys(this.reactionDetails).toString() as IconName;
    console.log(this.key);
    
  }
}
