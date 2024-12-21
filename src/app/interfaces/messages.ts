export interface Messages {
    attachments:string,
    author:string
    createdOn: Date,
    message:string,
    reactions: Map<string, number>;
}
