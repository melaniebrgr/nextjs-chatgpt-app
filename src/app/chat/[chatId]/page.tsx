import Chat from "../Chat" 
import { getChatByIdAndMessages } from "@/lib/db/chat";
import { cookies } from 'next/headers'
import { USER_ID_COOKIE } from '@/lib/auth/constants';
import { redirect } from "next/navigation";

interface ChatDetailsRouteProps {
    params: {
        chatId: number;
    };
}

export default async function ChatDetailsRoute({ params }: ChatDetailsRouteProps) {
    const { chatId } = await params
    const { chat, messages } = await getChatByIdAndMessages(chatId)
    const cookieStore = await cookies()
    const userId = +(cookieStore.get(USER_ID_COOKIE)?.value ?? NaN)

    if (userId !== chat.user_id) {
      redirect('/')
    }

    return (
      <main className="p-5">
        <Chat id={chat.id} messages={messages} />
      </main>
    );
  }