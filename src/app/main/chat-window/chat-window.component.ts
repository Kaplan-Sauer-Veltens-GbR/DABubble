import { Component, ElementRef, HostListener, inject, ViewChild } from '@angular/core';
import { IconLibaryComponent } from "../../shared/components/icon-component/icon-libary.component";
import { CommonModule } from '@angular/common';
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
import { collection } from '@angular/fire/firestore';
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
  chatID:string | null = null;
  ngAfterViewInit(): void {
  this.scrollToBottom();
  
}

  @HostListener('document:click', ['$event'])
handleClickOutside(event:MouseEvent) {
  if(this.popUp?.nativeElement && this.workspace.isClickOutside(event,this.popUp.nativeElement)) {
    this.workspace.currentDialog = null;
  }
}


  scrollToBottom() {
    const chatContainer = this.scrollContainer.nativeElement
    chatContainer.scrollTop = chatContainer.scrollHeight
  }

  sendMessageToDB() {
    const privateMessages = collection(this.dbService.firestore,'privatemessage');
    // const 
  }
}
