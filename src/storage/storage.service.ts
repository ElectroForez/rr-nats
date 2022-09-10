import {Message} from "./interfaces";

export class StorageService {
    private messages: Message[] = [];

    getMessageById(id: number): Message | undefined {
        const result = this.messages.find(msg => msg.id === id);
        return result;
    }

    postMessage(msg: Message): Message | undefined {
        const candidate = this.getMessageById(msg.id);
        if (candidate) return;

        this.messages.push(msg);
        return msg;
    }

    putMessage(msg: Message): Message | undefined {
        const candidate = this.getMessageById(msg.id);
        if (!candidate) return;

        Object.assign(candidate, msg);
        return candidate;
    }

    deleteMessageById(id: number): Message | undefined {
        const candidate = this.getMessageById(id);
        if (!candidate) return;
        this.messages = this.messages.filter(msg => msg.id !== id);
        return candidate;
    }
}