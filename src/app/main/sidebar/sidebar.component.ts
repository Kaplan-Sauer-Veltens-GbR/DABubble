import { Component, ElementRef, HostListener, inject, Input, Query } from '@angular/core';
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
import { addDoc, arrayUnion, collection, doc, DocumentReference, getDocs, query, QuerySnapshot, setDoc, where } from '@angular/fire/firestore';
import { ActivatedRoute, Router} from '@angular/router';
import { DocumentData } from '@angular/fire/compat/firestore';
import { Auth, User, user } from '@angular/fire/auth';
import { AuthService } from '../../services/auth.service';


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
  private router = inject(Router);
  public authService = inject(AuthService)
  private isAtBottom = false; 
@Input() selected:boolean = false;
toggleChannel:boolean [] = [true,true];

// function for max load increase paired with a global variable , also viewchild track scroll distance and than load more 

  ngOnInit(): void {
    const loggedInUserUID = this.authService.getCurrentUser()?.uid
    this.dbService.subscribeToCollectionReactive('users',(docs: UserData[])=>  {
      this.userList = docs.sort((a,b) => {
        if(a.uid === loggedInUserUID) {
          return -1;
        }if(b.uid === loggedInUserUID) {
          return 1;
        }
        return 0
      })
      console.log('userlist',this.userList);
      
      
    },this.dbService.maxDocs$) // value for how much users a displayed
  }

  
  async createNewPrivateChat(uid:string,collectionName:string) {
    const members = [uid,this.dbService.userInformation.uid]
    const privateChatCol = collection(this.dbService.firestore,collectionName)
    console.log(members);
    const chatDoc = await addDoc(privateChatCol, {
      members: arrayUnion(...members)
    })
    this.createSubCollectionMessages(chatDoc, uid)
    
    return chatDoc.id;
  }


  async createSubCollectionMessages(collectionRef:DocumentReference,uid:string) {
    debugger
    
    
    const messagesCollectionRef = collection(collectionRef,'messages') 
    await addDoc(messagesCollectionRef,this.dbService.setMessageInterface('Wilkommen'));
    return messagesCollectionRef.id;
  }


  async checkIfPrivateChatExist(uid:string) {
    const chatRef = collection(this.dbService.firestore,'privatmessage')
     const privateChatQuery = query(chatRef,where('members','array-contains',this.dbService.userInformation.uid))
     try {
     const privateChatSnapshot = await getDocs(privateChatQuery);
      const existingChat = await this.iterateOverPrivateChat(privateChatSnapshot,uid)
      if(existingChat) {
        return existingChat;
      }
     } catch (error) {
      console.error("Fehler beim Abrufen des Chats:", error);
      return {found:false,docId: null}
    }
    const newChatId = await this.createNewPrivateChat(uid,'privatmessage')
        return {found:false, docId : newChatId}
  }


 async iterateOverPrivateChat(privateChatSnapshot:QuerySnapshot<DocumentData>,uid:string) {
     for(const doc of privateChatSnapshot.docs) {
      const chatData = doc.data();
      const members = chatData['members'] as string[];  
      if(members.includes(uid) && members.includes(this.dbService.userInformation.uid)) {
        return {found:true,docId: doc.id}
      }
    }
    return null;
  }


 async routeToPrivateChat(uid:string) {
  const result = await this.checkIfPrivateChatExist(uid);
  if(result.found === false) {
    this.router.navigate([`main/privatmessage/${result.docId}`]);
  }else {
    console.log(this.router.url);
    this.router.navigate([`main/privatmessage/${result.docId}`]);
  }
  }


toggleList(index:number) {
this.toggleChannel[index] = !this.toggleChannel[index]
}


onUserListScroll(event: Event): void {
  const target = event.target as HTMLElement; 
  const scrollTop = target.scrollTop; 
  const scrollHeight = target.scrollHeight;
  const clientHeight = target.clientHeight; 
  const atBottom = scrollTop + clientHeight >= scrollHeight;
  if (atBottom && !this.isAtBottom) {
    this.dbService.maxDocs$.next(this.dbService.maxDocs$.getValue() +1)    // later on  make it cleaner and also make a stop when userlist lenght is = or lower 
    console.log('maxdocs',this.dbService.maxDocs$);
    this.isAtBottom = true; 
  } else if (!atBottom) {
    this.isAtBottom = false; 
  }
}

}

