export interface Message {
    id: number;
    content: string;
}

export interface GetMessageById {
    id: number;
}

export interface PostMessage extends Message{}

export interface PutMessage extends Message{}

export interface DeleteMessageById {
    id: number;
}

export interface Response {
    message?: Message;
    error?: string;
}