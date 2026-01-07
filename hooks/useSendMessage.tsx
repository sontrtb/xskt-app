
import { EStatusChat, IChatIem } from "@/types/chat";
import { useState } from "react";
import EventSource from 'react-native-sse';
interface IUseSendMessageProps {
    onDoneTyping?: (mess: IChatIem) => void;
    onError?: () => void;
    onTyping?: (mess: IChatIem) => void;
}

interface IChunk {
    content: string;
    status: "success" | "pending";
    thinking?: string;
}

export interface IMessageGetProps {
    message: string,
    files?: {
        fileName: string
        fileData: File
    }[]
}

const useSendMessage = (props: IUseSendMessageProps) => {
    const { onDoneTyping, onTyping, onError } = props;

    const [isLoading, setIsLoading] = useState(false);

    const sendMessage = async (messageSend: string) => {
        setIsLoading(true);

        const url = `${process.env.EXPO_PUBLIC_API_BASE_URL}/dream-book`;

        const id = new Date().getTime();
        let textMessTmp = "";

        const es = new EventSource(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                question: messageSend
            }),
        });

        es.addEventListener("message", (event: any) => {
            if (!event?.data) return;

            try {
                const parsed: IChunk = JSON.parse(event.data);

                // thinking stage
                if (parsed.thinking) {
                    onTyping?.({
                        id,
                        send: "bot",
                        content: "",
                        status: EStatusChat.thinking
                    });
                    return;
                }

                // pending stream chunks
                if (parsed.status === "pending") {
                    textMessTmp += parsed.content;

                    onTyping?.({
                        id,
                        send: "bot",
                        content: textMessTmp,
                        status: EStatusChat.pending
                    });
                    return;
                }

                // success - finish
                if (parsed.status === "success") {
                    onDoneTyping?.({
                        id,
                        send: "bot",
                        content: textMessTmp,
                        status: EStatusChat.success
                    });
                    setIsLoading(false)
                    es.close();
                }

            } catch (e) {
                console.log("parse error", e);
            }
        });

        es.addEventListener("error", (err: any) => {
            console.log("SSE error", err);
            onError?.()
            es.close();
            setIsLoading(false);
        });

        es.addEventListener("open", () => {
        });
    };

    return {
        sendMessage,
        isLoading
    };
};


export default useSendMessage