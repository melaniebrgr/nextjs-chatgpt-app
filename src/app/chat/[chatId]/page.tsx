import Chat from "../Chat" 
import { getChatByIdAndMessages } from "@/lib/db/chat";
import { cookies } from 'next/headers'
import { USER_ID_COOKIE } from '@/lib/auth/constants';
import { notFound, redirect } from "next/navigation";

interface ChatDetailsRouteProps {
    params: {
        chatId: number;
    };
}

const getUserIdFromCookie = async () => {
  const cookieStore = await cookies()
  return +(cookieStore.get(USER_ID_COOKIE)?.value ?? NaN)
}

export default async function ChatDetailsRoute({ params }: ChatDetailsRouteProps) {
    const { chatId } = await params
    
    let chat, messages
    try {
      const response = await getChatByIdAndMessages(chatId)
      chat = response.chat
      messages = response.messages
    } catch {
      notFound()
    }

    const userId = await getUserIdFromCookie()
    if (userId !== chat.user_id) {
      redirect('/')
    }

    return (
      <main className="p-5">
        <Chat id={chat.id} messages={messages} />
      </main>
    );
  }