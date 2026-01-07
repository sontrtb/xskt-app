
import { EStatusChat, IChatIem } from "@/types/chat";
import { useRef, useState } from "react";

interface IUseSendMessageProps {
    onDoneTyping?: (mess: IChatIem) => void;
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
    const { onDoneTyping, onTyping } = props

    const [isLoading, setIsLoading] = useState(false)

    const readerRef = useRef<ReadableStreamDefaultReader<Uint8Array>>(undefined)

    const handleMessageChunk = (reader?: ReadableStreamDefaultReader<Uint8Array<ArrayBufferLike>>) => {
        readerRef.current = reader;
        const decoder = new TextDecoder();
        let textMessTmp = "";
        let incompleteData = "";

        const id = new Date().getTime();

        function readStream() {
            reader?.read().then(({ done, value }) => {
                if (done) {
                    const newMess: IChatIem = {
                        id: id,
                        content: textMessTmp,
                        send: "bot",
                        status: EStatusChat.success
                    };
                    onDoneTyping?.(newMess)
                    return;
                }

                const chunk = decoder.decode(value, { stream: true });
                incompleteData += chunk;

                // Xử lý các JSON đầy đủ trong incompleteData
                const lines = incompleteData.split("\n");
                incompleteData = lines.pop() || ""; // Lấy phần chưa hoàn chỉnh lưu lại

                lines.forEach((line) => {
                    if (!line.startsWith('data:')) return;

                    const jsonPart = line.startsWith('data: ') ? line.substring(6).trim() : line.substring(5).trim();
                    const parsed: IChunk = JSON.parse(jsonPart)

                    if (parsed.thinking) {
                        onTyping?.({
                            id: id,
                            send: "bot",
                            content: "",
                            status: EStatusChat.thinking
                        })
                    } else if(parsed.status === "pending") {
                        textMessTmp += parsed.content;
                        onTyping?.({
                            id: id,
                            send: "bot",
                            content: textMessTmp,
                            status: EStatusChat.pending
                        })
                    } else if(parsed.status === "success") {
                        onTyping?.({
                            id: id,
                            send: "bot",
                            content: textMessTmp,
                            status: EStatusChat.success
                        })
                    }
                });

                readStream();
            });
        }

        readStream();
    }

    const sendMessage = async (messageSend: string) => {
        setIsLoading(true)
        const url = `${process.env.EXPO_PUBLIC_API_BASE_URL}/dream-book`

        const headers: { [key: string]: string } = {
            responseType: "stream",
        };

        fetch(url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify({ question: messageSend }),
        })
            .then(async (response) => response.body?.getReader())
            .then((reader) => {
                handleMessageChunk(reader);
            })
            .catch((error) => {
                console.error("Error sending POST request:", error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return {
        sendMessage,
        isLoading
    }
};

export default useSendMessage