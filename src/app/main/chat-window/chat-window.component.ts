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
import { BehaviorSubject, Observable, Subscription, switchMap } from 'rxjs';
import { DocumentData } from '@angular/fire/compat/firestore';
import { Messages } from '../../interfaces/messages';
import { AuthService } from '../../services/auth.service';
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
  public dbService = inject(DbService);
  public authService = inject(AuthService)
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
  this.SubtoChatRoute();
  }


  /**
 * Subscribes to the URL route parameters to check if the URL contains a chat ID.
 * It listens for changes in the URL and updates the `chatID` variable accordingly.
 * Once the `chatID` is set, it loads the correct chat messages.
 * 
 * The `chatID` is extracted from the URL parameter `chatId`.
 * Finally, it calls `loadPrivatChats()` to load the chat messages.
 */
  SubtoChatRoute() {
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


/**
 * Closes the popup if the click event occurs outside of the popup element.
 * 
 * This method listens for a click event on the document and checks if the click 
 * happened outside of the popup. If true, it closes the popup by setting the 
 * `currentDialog` to `null`.
 * 
 * @param {MouseEvent} event - The click event triggered by the user.
 */
  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    if (
      this.popUp?.nativeElement &&
      this.workspace.isClickOutside(event, this.popUp.nativeElement)
    ) {
      this.workspace.currentDialog = null;
    }
  }


/**
 * Fetches the private chats collection and returns it as an Observable.
 * 
 * - The number of documents fetched is determined by `limitValue`, which is dynamically set.
 * - The messages are ordered by the `createdOn` timestamp in descending order.
 * - The returned Observable emits an array of `Messages` objects, each including an `id` field.
 * 
 * @returns {Observable<Messages[]>} An Observable that emits the fetched private chat messages.
 */
  fetchPrivateChats(): Observable<Messages[]> {
    return this.messageLimit$.pipe(
      switchMap((limitValue) => {
        const privateChatsRef = collection(
          this.dbService.firestore,
          `privatmessage/${this.chatID}/messages`
        );
        const messageQuery = query(
          privateChatsRef,
          orderBy('createdOn', 'desc'),
          limit(limitValue)
        );
        return collectionData<Messages>(messageQuery, { idField: 'id' });
      })
    );
  }


  /**
   * Loads private chats from the database and processes the messages.
   * 
   * The messages are stored in reversed order.
   * The last visible message is saved in a variable.
   * Messages are grouped by their date.
   */
  loadPrivatChats(): void {
    this.fetchPrivateChats().subscribe({
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


/**
 * Converts a timestamp into a formatted date string based on the user's language preference.
 * 
 *  The timestamp is processed using the `getDateFromTimestamp` function.
 *  The method checks the local storage for a saved language preference. If no language is set, 
 *  it defaults to English (`'en'`).
 *  The formatted date is then returned using the `formatDate` function based on the selected language.
 * 
 * @param {any} timestamp - The timestamp to be converted into a date string.
 * @returns {string} The formatted date string based on the user's language.
 */
  convertTime(timestamp: any): string {
    const date = this.getDateFromTimestamp(timestamp);
    const language = localStorage.getItem('language') || 'en';
    return this.formatDate(date, language);
  }


 /**
 * Converts a timestamp into a valid `Date` object.
 * 
 * If the `timestamp` is already an instance of `Date`, it is returned directly.
 * If the `timestamp` is a string, it creates and returns a new `Date` object based on the string.
 * Otherwise, it assumes the `timestamp` is an object with a `toDate` method and calls it to return a `Date`.
 * 
 * @param {any} timestamp - The input timestamp to be converted. Can be a `Date`, a string, or an object with a `toDate` method.
 * @returns {Date} A valid `Date` object derived from the input timestamp.
 */
  private getDateFromTimestamp(timestamp: any): Date {
    if (timestamp instanceof Date) {
      return timestamp;
    }
    if (typeof timestamp === 'string') {
      return new Date(timestamp);
    }
    return timestamp.toDate();
  }


/**
 * Formats a given date object into a localized string based on the specified language.
 * 
 * In German (`de-DE`), the format includes the weekday, day (numeric), and month (as a string).
 * In English (`en-EN`), the format includes the weekday, month (as a string), and day (numeric).
 * 
 * @param {Date} date - The date to be formatted. Must be a valid `Date` object.
 * @param {string} language - The language code for formatting. Accepts `'en'` for English or `'de'` for German.
 * @returns {string} The formatted date string in the specified language.
 */
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
    console.log(groupedChats,'grouped');
    
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
