export type Messages = {
    attachments?:string,
    author:string
    createdOn: Date,
    message:string,
    messageUID:string,
    reactions?: Map<string, number>;
}
