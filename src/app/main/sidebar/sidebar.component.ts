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
import { addDoc, arrayUnion, collection, query, where } from '@angular/fire/firestore';


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

// function for max load increase paired with a global variable , also viewchild track scroll distance and than load more 

  ngOnInit(): void {
    this.dbService.subscribeToCollection('users',(docs)=>  {
      this.userList = docs
      console.log('userlist',this.userList);
    },10)
  }

  async createNewPrivateChat(uid:string) {
    const members = [uid,this.dbService.userInformation.uid]
    const privateChatCol = collection(this.dbService.firestore,'privatmessage')
    console.log(members);
    const chatDoc = await addDoc(privateChatCol, {
      members: arrayUnion(...members)
    })
  }

  checkIfPrivateChatExist() {
    const chatRef = collection(this.dbService.firestore,'privatmessage')
     const privateChatQuery = query(chatRef,where('members','array-contains',this.dbService.userInformation.uid))
  }

  
 async routeToPrivateChat(uid:string) {

  }

toggleList(index:number) {
this.toggleChannel[index] = !this.toggleChannel[index]
}
}

