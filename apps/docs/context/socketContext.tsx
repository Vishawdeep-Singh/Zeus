import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import {
  socketState,
  userState,
  connectionErrorState,
  loadingState,
} from '@/states/socket';
import { useSession } from 'next-auth/react';
import { User } from 'next-auth';

// Define the context type
type WebSocketContextType = {
  socket: WebSocket | null;
  user: User | null;
  connectionError: boolean;
  loading: boolean;
  setUser: (user: { id: string; token?: string } | null) => void;
};

// Create the WebSocket context
const WebSocketContext = createContext<WebSocketContextType>({
  socket: null,
  user: null,
  connectionError: false,
  setUser: () => {},
  loading: true,
});

// Create a provider component
export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [socket, setSocket] = useRecoilState(socketState);
  const [user, setUser] = useRecoilState(userState);
  const [connectionError, setConnectionError] =
    useRecoilState(connectionErrorState);
  const [loading, setLoading] = useRecoilState(loadingState);
  const [reconnectionAttempt, setReconnectionAttempt] = useState(0);
  const session = useSession();
  //   console.log(socket)
  // console.log(session.data?.user)
  useEffect(() => {
    console.log(
      'useEffect triggered with session user ID:',
      session.data?.user.id
    );

    if (!socket && session.data?.user.id) {
      console.log('Creating new WebSocket connection...');

      const ws = new WebSocket(process.env.NEXT_PUBLIC_WSS_URL as string);

      ws.onopen = () => {
        console.log('WebSocket connected.');
        setSocket(ws);
        setUser(session.data.user);
        setLoading(false);
        setConnectionError(false);
      };

      ws.onclose = () => {
        console.log('WebSocket disconnected, attempting to reconnect...');
        setSocket(null);
        setLoading(true);

        // Increment the reconnection attempt counter to trigger re-render
        setTimeout(() => {
          if (!socket) {
            console.log('Reconnecting WebSocket...');
            setReconnectionAttempt((prev) => prev + 1);
          }
        }, 3000);
      };

      ws.onerror = () => {
        console.log('WebSocket encountered an error.');
        setSocket(null);
        setConnectionError(true);
        setLoading(false);
      };

      // Cleanup function to close the WebSocket connection
    }
  }, [session.data?.user.id, reconnectionAttempt]);

  return (
    <WebSocketContext.Provider
      value={{
        socket,
        user,
        connectionError,
        loading,
        setUser,
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};

// Create a custom hook to use the WebSocket context
export const useWebSocket = () => {
  const { socket, user, setUser, connectionError, loading } =
    useContext(WebSocketContext);
  const sendMessage = (type: string, data: { [key: string]: any }) => {
    console.log('Sending message:', { type, data });
    socket?.send(
      JSON.stringify({
        type,
        data,
      })
    );
  };

  return { socket, loading, setUser, sendMessage, user, connectionError };
};
