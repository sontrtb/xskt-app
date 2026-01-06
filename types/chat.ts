export enum EStatusChat {
    success = "success",
    thinking = "thinking",
    pending = "pending"
}

export interface IChatIem {
    id: number;
    send: "bot" | "user";
    content: string;
    status: EStatusChat
}