import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  inject,
  Input,
  ViewChild,
} from '@angular/core';
import { IconLibaryComponent } from '../../shared/components/icon-component/icon-libary.component';
import { CommonModule, DatePipe } from '@angular/common';
import { AvatarBarComponent } from '../../shared/components/chat/avatar-bar/avatar-bar.component';
import { ChatMessageComponent } from '../../shared/components/chat/chat-message/chat-message.component';
import { TextMessageFieldComponent } from '../../shared/components/inputs/text-message-field/text-message-field.component';
import { WorkspaceService } from '../../services/workspace.service';
import { ChannelEditPopupComponent } from '../../chat/pop-ups/channel-edit-popup/channel-edit-popup.component';
import { AddPeopleComponent } from '../../shared/components/chat/add-people/add-people.component';
import { MemberListComponent } from '../../chat/pop-ups/ch-member-list/member-list/member-list.component';
import { ActivatedRoute } from '@angular/router';
import { CreateChannelComponent } from '../../chat/pop-ups/create-channel/create-channel.component';
import { DbService } from '../../services/db.service';
import {
  addDoc,
  collection,
  collectionData,
  doc,
  getDoc,
  limit,
  orderBy,
  query,
  QueryDocumentSnapshot,
  setDoc,
} from '@angular/fire/firestore';
import { BehaviorSubject, Subscription, switchMap } from 'rxjs';
import { DocumentData } from '@angular/fire/compat/firestore';
import { Messages } from '../../interfaces/messages';
@Component({
  selector: 'chat-window',
  standalone: true,
  imports: [
    CommonModule,
    IconLibaryComponent,
    AvatarBarComponent,
    ChatMessageComponent,
    TextMessageFieldComponent,
    ChannelEditPopupComponent,
    AddPeopleComponent,
    MemberListComponent,
    CreateChannelComponent,
  ],
  templateUrl: './chat-window.component.html',
  styleUrl: './chat-window.component.scss',
})
export class ChatWindowComponent {
  @ViewChild('chatScrollContainer') scrollContainer!: ElementRef;
  @ViewChild('popUps', { static: false }) popUp!: ElementRef;

  public workspace = inject(WorkspaceService);
  private route = inject(ActivatedRoute);
  private elementRef = inject(ElementRef);
  private dbService = inject(DbService);

  @Input() message!: Messages;
  private isAtTop= false; 
  privateChats: any[] = [];
  groupedPrivateChats: any[] = [];
  privateChatsSubscription!: Subscription;
  lastVisibileMessage: Messages | null = null;
  messageLoading: boolean = false;
  chatID: string | null = null;
  messageLimit$ = new BehaviorSubject<number>(10);
  isFetchingScrollbar :boolean = false;
  totalMessageDocs!:number
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.chatID = params.get('chatId');
      console.log('ID:', this.chatID);
    });
    console.log(`Path: privatmessage/${this.chatID}/messages`);
    this.loadPrivatChats();
    console.log(this.privateChats, 'empty?');
  }


  ngAfterViewInit(): void {
    this.scrollToBottom();
  }


  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    if (
      this.popUp?.nativeElement &&
      this.workspace.isClickOutside(event, this.popUp.nativeElement)
    ) {
      this.workspace.currentDialog = null;
    }
  }


  loadPrivatChats(): void {
    this.messageLimit$
      .pipe(
        switchMap((limitValue) => {
          const privateChatsRef = collection(
            this.dbService.firestore,
            `privatmessage/${this.chatID}/messages`
          );
          const messageQuery = query(
            privateChatsRef,
            orderBy('createdOn', 'desc'),
            limit(limitValue) // limit wird hier als Funktion aufgerufen
          );
          return collectionData<Messages>(messageQuery, { idField: 'id' });
        })
      )
      .subscribe({
        next: (data: Messages[]) => {
          this.privateChats = data.reverse();
          this.lastVisibileMessage =
            data.length > 0 ? data[data.length - 1] : null;
          this.groupedPrivateChats = this.groupMessagesByDate(this.privateChats);
          this.messageLoading = true;
        },
        error: (err: any) => {
          console.error('Fehler beim Laden', err);
        },
      });
  }


  convertTime(timestamp: any): string {
    const date = this.getDateFromTimestamp(timestamp);
    const language = localStorage.getItem('language') || 'en';
    return this.formatDate(date, language);
  }


  private getDateFromTimestamp(timestamp: any): Date {
    if (timestamp instanceof Date) {
      return timestamp;
    }
    if (typeof timestamp === 'string') {
      return new Date(timestamp);
    }
    return timestamp.toDate();
  }


  private formatDate(date: Date, language: string): string {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    };
    return date.toLocaleDateString(
      language === 'en' ? 'en-EN' : 'de-DE',
      options
    );
  }


  scrollToBottom() {
    const chatContainer = this.scrollContainer.nativeElement;
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }


  sendMessageToDB(textMessage: string) {
    const privateMessages = collection(
      this.dbService.firestore,
      `privatmessage/${this.chatID}/messages`
    );
    const message = this.dbService.setMessageInterface(textMessage);
    console.log(textMessage, 'message');

    addDoc(privateMessages, message);
  }


  groupMessagesByDate(privateChats: Messages[]): { date: string; messages: Messages[] }[] {
    const groupedChats: { date: string; messages: Messages[] }[] = [];
    privateChats.forEach((message) => {
      const messageDate = new Date(this.convertTime(message.createdOn));
      messageDate.setHours(0, 0, 0, 0);
      const dateString: string = messageDate.toLocaleDateString('de-DE', {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      });
      console.log(dateString);
      // Suchen, ob es bereits einen Eintradg für das Datum gibt
      let dateGroup = groupedChats.find((group) => group.date === dateString);

      // Falls keine Gruppe für das Datum existiert, erstelle eine neue
      if (!dateGroup) {
        dateGroup = { date: dateString, messages: [] };
        groupedChats.push(dateGroup);
      }
      dateGroup.messages.push(message);
    });

    return groupedChats; 
  }

  
  chatLoadOlderMessages(event: Event): void {
    const target = event.target as HTMLElement;
    const scrollTop = target.scrollTop;
    const atTop = scrollTop === 0;
  
    if (atTop && !this.isAtTop && this.messageLimit$.value <= this.privateChats.length) {
      this.messageLimit$.next(this.messageLimit$.value + 5); // Erhöhe das Limit dynamisch
      this.isAtTop = true;
    } else if (!atTop) {
      this.isAtTop = false;
    }
  }
}
