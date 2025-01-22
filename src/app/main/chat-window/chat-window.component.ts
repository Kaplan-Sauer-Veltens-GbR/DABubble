import { ChangeDetectorRef, Component, ElementRef, HostListener, inject, Input, ViewChild } from '@angular/core';
import { IconLibaryComponent } from "../../shared/components/icon-component/icon-libary.component";
import { CommonModule, DatePipe } from '@angular/common';
import { AvatarBarComponent } from "../../shared/components/chat/avatar-bar/avatar-bar.component";
import { ChatMessageComponent } from '../../shared/components/chat/chat-message/chat-message.component';
import { TextMessageFieldComponent } from "../../shared/components/inputs/text-message-field/text-message-field.component";
import { WorkspaceService } from '../../services/workspace.service';
import { ChannelEditPopupComponent } from '../../chat/pop-ups/channel-edit-popup/channel-edit-popup.component';
import { AddPeopleComponent } from "../../shared/components/chat/add-people/add-people.component";
import { MemberListComponent } from "../../chat/pop-ups/ch-member-list/member-list/member-list.component";
import { ActivatedRoute } from '@angular/router';
import { CreateChannelComponent } from '../../chat/pop-ups/create-channel/create-channel.component';
import { DbService } from '../../services/db.service';
import { addDoc, collection, collectionData, limit, orderBy, query, QueryDocumentSnapshot } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { DocumentData } from '@angular/fire/compat/firestore';
import { Messages } from '../../interfaces/messages';
@Component({
  selector: 'chat-window',
  standalone: true,
  imports: [CommonModule, IconLibaryComponent, AvatarBarComponent, ChatMessageComponent, TextMessageFieldComponent, ChannelEditPopupComponent, AddPeopleComponent, MemberListComponent,CreateChannelComponent],
  templateUrl: './chat-window.component.html',
  styleUrl: './chat-window.component.scss'
})
export class ChatWindowComponent {
  @ViewChild('chatScrollContainer')scrollContainer!:ElementRef
  @ViewChild('popUps', { static: false }) popUp!: ElementRef;

  public workspace = inject(WorkspaceService);
  private  route = inject(ActivatedRoute);
  private elementRef = inject(ElementRef);
  private dbService = inject(DbService);
  public datePipe = inject(DatePipe)
  @Input() message!: Messages;
  privateChats: any [] = [];
  privateChatsSubscription!: Subscription;
  lastVisibileMessage: Messages | null=null;
  messageLoading: boolean = false; 
  chatID:string | null = null;


   ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.chatID = params.get('chatId');
      console.log('ID:', this.chatID); 
    });
    console.log(`Path: privatmessage/${this.chatID}/messages`);
     this.loadPrivatChats();
    console.log(this.privateChats,'empty?');
    
    
    
  }

  ngAfterViewInit(): void {
  this.scrollToBottom();
  
}

  @HostListener('document:click', ['$event'])
  handleClickOutside(event:MouseEvent) {
  if(this.popUp?.nativeElement && this.workspace.isClickOutside(event,this.popUp.nativeElement)) {
    this.workspace.currentDialog = null;
  }
}


  loadPrivatChats() {
    debugger
  const privateChatsRef = collection(this.dbService.firestore, `privatmessage/${this.chatID}/messages`);
  const messageQuery = query(privateChatsRef, orderBy('createdOn','desc'),limit(20));
  this.privateChatsSubscription = collectionData<Messages>(messageQuery, {idField: 'id'}).subscribe({
    next: (data:Messages[]) => {
      this.privateChats = data.reverse()
      this.lastVisibileMessage = data.length > 0 ? data[data.length - 1] : null;
      this.messageLoading = true;
      console.log(this.privateChats,'logged chats');
     
      
    },
    error: (err:any) => {
      console.error('error beim laden',err);
      
    }
  })

}


convertTime(timestamp:Date) {
  const today = this.datePipe.transform(timestamp,'EEEE,dd MMMM');
}


  scrollToBottom() {
    const chatContainer = this.scrollContainer.nativeElement
    chatContainer.scrollTop = chatContainer.scrollHeight
  }

  sendMessageToDB(textMessage: string) {
    const privateMessages = collection(this.dbService.firestore, `privatmessage/${this.chatID}/messages`);
   const message = this.dbService.setMessageInterface(textMessage)
    console.log(textMessage, 'message');
    
    addDoc(privateMessages,message)}
}
