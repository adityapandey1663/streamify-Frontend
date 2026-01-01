import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { StreamChat } from "stream-chat"
import {
  Chat,
  Channel,
  ChannelHeader,
  MessageInput,
  MessageList,
  Window,
  Thread,
  
} from "stream-chat-react"
import toast from "react-hot-toast"

import useAuthUser from "../components/useAuthUser"
import { getStreamToken } from "../lib/Axios"
import ChatLoader from "../components/ChatLoader"
import CallButton from "../components/CallButton"

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY

const ChatPage = () => {
  const { id: targetUserId } = useParams()
  const { authUser } = useAuthUser()

  const [chatClient, setChatClient] = useState(null)
  const [channel, setChannel] = useState(null)
  const [loading, setLoading] = useState(true)

  const { data: tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser,
  })

  useEffect(() => {
    const initChat = async () => {
      if (!tokenData?.token || !authUser) return

      try {
        const client = StreamChat.getInstance(STREAM_API_KEY)

        await client.connectUser(
          {
            id: authUser._id,
            name: authUser.fullName,
            image: authUser.profilePic,
          },
          tokenData.token
        )

        const channelId = [authUser._id, targetUserId].sort().join("-")

        const currChannel = client.channel("messaging", channelId, {
          members: [authUser._id, targetUserId],
        })

        await currChannel.watch()

        setChatClient(client)
        setChannel(currChannel)
      } catch (error) {
        console.error(error)
        toast.error("Could not connect to chat.")
      } finally {
        setLoading(false)
      }
    }

    initChat()
  }, [tokenData, authUser, targetUserId])

  const handleVideoCall = ()=>{
    if(channel){
      const callUrl = `${window.location.origin}/call/${channel.id}`
      channel.sendMessage({
        text: `I ve started a video Call. join me here ${callUrl}`
      })
      toast.success("Video call started!")
    }
  }

  if (loading || !chatClient || !channel) return <ChatLoader />

  return (
        <div className="h-screen flex flex-col overflow-hidden">
      <Chat client={chatClient} theme="messaging light">
        <Channel channel={channel}>
          <CallButton handleVideoCall={handleVideoCall}/>
          <Window>

            {/* Header */}
            <div className="bg-rose-100 border-b border-rose-200">
              <ChannelHeader />
            </div>

            {/* Messages */}
            <div className="flex-1 bg-rose-50">
              <MessageList />
            </div>

            {/* Input */}
            <div className="border-t border-rose-200 bg-white">
              <MessageInput focus />
            </div>

          </Window>
          <Thread/>
        </Channel>
      </Chat>
    </div>
  )
}

export default ChatPage
