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
import { ActivatedRoute, Router } from '@angular/router';
import { CreateChannelComponent } from '../../chat/pop-ups/create-channel/create-channel.component';
import { DbService } from '../../services/db.service';
import {
  addDoc,
  collection,
  collectionData,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  QueryDocumentSnapshot,
  setDoc,
  where,
} from '@angular/fire/firestore';
import { BehaviorSubject, Observable, Subscription, switchMap } from 'rxjs';
import { DocumentData } from '@angular/fire/compat/firestore';
import { Messages } from '../../interfaces/messages';
import { AuthService } from '../../services/auth.service';
import { User, user } from '@angular/fire/auth';
import { UserData } from '../../interfaces/user-model';
import {FireTimestampModel } from '../../interfaces/fire-stamp-model';
import { UserSelectorComponent } from "../../shared/components/inputs/user-selector/user-selector.component";
import { PickerComponent } from '@ctrl/ngx-emoji-mart';
import { EmojiPickerComponent } from "../../shared/components/emoji/emoji-picker/emoji-picker.component";
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
    EmojiPickerComponent
],
  templateUrl: './chat-window.component.html',
  styleUrl: './chat-window.component.scss',
})
export class ChatWindowComponent {
  @ViewChild('chatScrollContainer') scrollContainer!: ElementRef;
  @ViewChild('popUps', { static: false }) popUp!: ElementRef;

  public workspace = inject(WorkspaceService);
  private route = inject(ActivatedRoute);
  private router = inject(Router)
  private elementRef = inject(ElementRef);
  public dbService = inject(DbService);
  public authService = inject(AuthService)
  private cdRef = inject(ChangeDetectorRef)
  @Input() message!: Messages;
  private isAtTop= false;
  privateChats: any[] = [];
  groupedPrivateChats: any[] = [];
  privateChatsSubscription!: Subscription;
  lastVisibileMessage: Messages | null = null;
  messageLoading: boolean = false;
  chatID: string | null = null;
  messageLimit$ = new BehaviorSubject<number>(10);
  totalMessageDocs!:number;
  firstMessageInit:boolean = true;
  messageAuthors: { [key: string]: string | null } = {};
  otherChatUser!: UserData;
  toggleEmojiPicker:boolean = false;

  ngOnInit(): void {
  this.SubtoChatRoute();
  this.getChatMembers();

  this.route.paramMap.subscribe(params => {
    this.chatID = params.get('chatId');
    if (this.chatID === 'new') {
      // Setze den leeren Zustand – z. B. leere Arrays oder zeige eine entsprechende Nachricht
      this.privateChats = [];
      // Optional: setze eine Variable, die den leeren Zustand signalisiert:
      // this.isEmptyChat = true;
    } else {
      this.loadPrivatChats();
    }
  });
  }

  @ViewChild(TextMessageFieldComponent) textMessageField!: TextMessageFieldComponent;




  addEmojiToMessage(emoji: string) {
    // Rufe die Methode der Textarea-Komponente auf, um das Emoji hinzuzufügen
    this.textMessageField.addEmoji(emoji);
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
        return collectionData<Messages>(messageQuery, { idField: 'messageUID' });
      })
    );
  }

  /**
 * Checks if the current URL contains the 'privatemessage'
 * Returns true if condition are met, otherwise false.
 */
  checkIfPrivateChatsInUrl() {
    const url = this.router.url
   if(url.includes('privatemessage')) {
    return true;
   }
   return false
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
        this.loadUserNames(this.privateChats);
        if(this.firstMessageInit) {
          this.cdRef.detectChanges();
        this.scrollToBottom()
        this.firstMessageInit = false;
        }
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
  public formatDate(date: Date, language: string): string {
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

/**
 * Scrolls to the bottom of the chat container when:
 * 1. New messages are added.
 * 2. The component is first initialized and there is a long chat history.
 */
  scrollToBottom() {
    const chatContainer = this.scrollContainer.nativeElement;
    chatContainer.scrollTo({
      top: chatContainer.scrollHeight,
      behavior: 'smooth'
    });  }


  /**
 * Validates the given textMessage and adds it to the private chats collection.
 * The textMessage is mapped to the appropriate message type based on the Message interface.
 * The message is uploaded to the database in the correct structure.
 * If needed, the chat view is scrolled to the bottom after the message is sent.
 * The chat members are checked to ensure they are included.
 *
 * @param textMessage The message written by a user.
 */
  async sendMessageToDB(textMessage: string) {
      const privateMessages = collection(
        this.dbService.firestore,
        `privatmessage/${this.chatID}/messages`
      );
      const message = this.dbService.setMessageInterface(textMessage);
      console.log(textMessage, 'message123',message);

      await addDoc(privateMessages, message);
      this.scrollToBottom();
    this.getChatMembers();
    }

/**
 * Groups chat messages by date, based on their creation timestamp.
 * The messages are categorized into daily time slots, ordered by the correct date.
 * The date display is formatted according to the chosen language (e.g., 'de-DE').
 *
 * @param privateChats Array of chat messages to be grouped by date.
 * @returns An array of objects where each object contains a 'date' and a list of 'messages' for that date.
 */
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

  /**
 * Loads older messages when the user reaches the top of the current chat window,
 * and there are more messages available in the array than currently displayed.
 * Automatically increases the message limit to load additional messages.
 *
 * @param event The scroll event triggered when the user scrolls within the chat window.
 */
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

 /**
 * Filters the database to find the user associated with the provided UID (message),
 * validates the user, and returns the user's display name as the author of the message.
 *
 * If no user is found for the provided UID, logs an error and returns `null`.
 * In case of any error during the database query, logs the error and also returns `null`.
 *
 * @param message The UID of the user to look for in the database.
 * @returns The display name of the user if found, or `null` if no user is found or an error occurs.
 */
  async filterDBForUserName(message:string){
    const userRef = collection(this.dbService.firestore,'users');
    const userQuery = query(userRef,where('uid', '==', message));
    try {
     const userQuerySnapshot = await getDocs(userQuery)
     if (userQuerySnapshot.empty) {
      console.log(`No user found for UID: ${message}`);
      return null;
    }
      const userDoc = userQuerySnapshot.docs[0];
      const userData = userDoc.data() as UserData;
      // console.log(userData,'userdata');
      return userData.displayName;

    } catch (error){
      console.error('error fetching user',error);
      return null
    }
  }
/**
 * Iterates over an array of messages, retrieves the username for each message's author
 * using the `filterDBForUserName` function, and then sets the correct author name
 * for each message in the `messageAuthors` map.
 *
 * @param messages An array of message objects to process, where each message has an 'author' field.
 */
  async loadUserNames(messages: Messages[]): Promise<void> {
    for (const message of messages) {
      const userName = await this.filterDBForUserName(message.author);
      console.log(userName,'messages');

      this.messageAuthors[message.author] = userName;

    }
  }
/**
 * Converts a Firebase Timestamp to a valid JavaScript timestamp, then formats and returns the time
 * in hours and minutes (24-hour format), along with the day of the week.
 * @param firebaseTimestamp The Firebase timestamp object containing 'seconds' and 'nanoseconds' fields.
 * @returns A string representing the time in hours and minutes (e.g., "14:30").
 */
  dateToTime(firebaseTimestamp:FireTimestampModel) {
  const milliseconds = firebaseTimestamp.seconds * 1000 + firebaseTimestamp.nanoseconds / 1000000;
  const date = new Date(milliseconds);

  const options: Intl.DateTimeFormatOptions = {
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
};
  const timeString = date.toLocaleTimeString('de-DE', options);
  return timeString
  }

/**
 * Retrieves both members of a private chat to ensure that only the correct users are part of the chat.
 * The function checks the current user's UID and filters out the logged-in user,
 * then fetches the data of the other chat member to verify the participants.
 *
 * @returns {Promise<void>} Ensures that only the correct users are allowed in the private chat.
 */
async getChatMembers() {
  const loggedUser = this.authService.getCurrentUser()?.uid
  const chatRef = doc(this.dbService.firestore, `privatmessage/${this.chatID}`)
  const chatSnapshot = await getDoc(chatRef);
 if(chatSnapshot.exists()) {
 const chatData =  chatSnapshot.data();
 const members = chatData['members']
 const filteredMembers = members.filter((uid: string) => uid !== loggedUser);
 const memberUid = filteredMembers[0]

  this.otherChatUser = await this.dbService.getDocData('users',memberUid) as UserData

 }
}



}
