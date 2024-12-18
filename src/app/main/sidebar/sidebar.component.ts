import { Component, ElementRef, HostListener, inject, Input } from '@angular/core';
import { IconLibaryComponent } from "../../shared/components/icon-component/icon-libary.component";
import { CommonModule } from '@angular/common';
import { AvatarBarComponent } from '../../shared/components/chat/avatar-bar/avatar-bar.component';
import { UserAvatarComponent } from '../../shared/components/user-avatar/user-avatar.component';
import { WorkspaceFabComponent } from "./workspace-fab/workspace-fab.component";
import { WorkspaceService } from '../../services/workspace.service';
import { CreateChannelComponent } from "../../chat/pop-ups/create-channel/create-channel.component";
import { TranslocoModule } from '@jsverse/transloco';
import { DbService } from '../../services/db.service';
import { UserData } from '../../interfaces/user-model';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [IconLibaryComponent, CommonModule, TranslocoModule, UserAvatarComponent, WorkspaceFabComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  userList: UserData[] = []
  public workspace = inject(WorkspaceService)
  public dbService = inject(DbService)
@Input() selected:boolean = false;
toggleChannel:boolean [] = [true,true];


  ngOnInit(): void {
    this.dbService.subscribeToCollection('users',(docs)=> {
      this.userList = docs
      console.log('userlist',this.userList);
    })
    
    
  }



toggleList(index:number) {
this.toggleChannel[index] = !this.toggleChannel[index]
}
}

