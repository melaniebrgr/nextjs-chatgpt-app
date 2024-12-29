import Chat from "../Chat" 
import { getChatByIdAndMessages } from "@/lib/db/chat";

interface ChatDetailsRouteProps {
    params: {
        chatId: number;
    };
}

export default async function ChatDetailsRoute({ params }: ChatDetailsRouteProps) {
    const { chatId } = await params;
    const { chat, messages } = await getChatByIdAndMessages(chatId);
    return (
      <main className="p-5">
        <Chat id={chat.id} messages={messages} />
      </main>
    );
  }