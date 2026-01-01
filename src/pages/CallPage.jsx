import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

import useAuthUser from "../components/useAuthUser";


import {
  StreamVideo,
  StreamVideoClient,
  StreamCall,
  CallControls,
  SpeakerLayout,
  StreamTheme,
  CallingState,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import ChatLoader from "../components/ChatLoader";
import { getStreamToken } from "../lib/Axios";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const CallPage = () => {
  const { id: callId } = useParams();
  const { authUser, isLoading } = useAuthUser();

  const [client, setClient] = useState(null);
  const [call, setCall] = useState(null);
  const [isConnecting, setIsConnecting] = useState(true);

  const { data: tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser,
  });

  useEffect(() => {
    if (!tokenData?.token || !authUser || !callId) return;

    const initCall = async () => {
      try {
        const user = {
          id: authUser._id,
          name: authUser.fullName,
          image: authUser.profilePic,
        };

        const videoClient = new StreamVideoClient({
          apiKey: STREAM_API_KEY,
          user,
          token: tokenData.token,
        });

        const callInstance = videoClient.call("default", callId);
        await callInstance.join({ create: true });

        setClient(videoClient);
        setCall(callInstance);
      } catch (error) {
        console.error(error);
        toast.error("Could not join the call");
      } finally {
        setIsConnecting(false);
      }
    };

    initCall();
  }, [tokenData, authUser, callId]);

  if (isLoading || isConnecting) return <ChatLoader/>;

  return (
    <div className="h-screen w-full bg-neutral-950 flex items-center justify-center overflow-hidden">
      {client && call ? (
        <div className="relative w-full h-full max-w-7xl">
          <StreamVideo client={client}>
            <StreamCall call={call}>
              <CallContent />
            </StreamCall>
          </StreamVideo>
        </div>
      ) : (
        <div className="text-center text-gray-300">
          <p className="text-lg font-medium">Unable to start call</p>
          <p className="text-sm text-gray-400 mt-1">
            Please refresh or try again later
          </p>
        </div>
      )}
    </div>
  );
};

const CallContent = () => {
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();
  const navigate = useNavigate();

  useEffect(() => {
    if (callingState === CallingState.LEFT) {
      navigate("/");
    }
  }, [callingState, navigate]);

  return (
    <StreamTheme>
      <div className="h-full flex flex-col">
        {/* Video Area */}
        <div className="flex-1 overflow-hidden rounded-xl">
          <SpeakerLayout />
        </div>

        {/* Controls */}
        <div className="py-4 flex justify-center bg-neutral-900/60 backdrop-blur">
          <CallControls />
        </div>
      </div>
    </StreamTheme>
  );
};

export default CallPage;
