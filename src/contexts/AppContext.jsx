import { useState, useEffect, useRef, useContext, createContext } from "react";
import useLocalStorage from "use-local-storage";
import uuid from "react-uuid";

const AppContext = createContext({});

export function AppProvider({ children }) {
  const messagesRef = useRef({});

  const [state, setState] = useState({
    highlightedMessageId: "",
    quotingMessageId: "",
  });
  const [messages, setMessages] = useLocalStorage(
    "desafio-bora-codar-chat",
    []
  );

  const sendMessage = (data) =>
    setMessages((prev) => [
      ...prev,
      {
        id: uuid(),
        timestamp: Date.now(),
        ...data,
      },
    ]);

  const scrollToMessage = (messageId) => {
    const message = messagesRef.current[messageId];
    message.scrollIntoView({
      block: "center",
    });
  };

  const findMessage = (messageId) =>
    messages.find((message) => message.id === messageId);
  const highlightMessage = (messageId) =>
    setState((prev) => ({ ...prev, highlightedMessageId: messageId }));
  const quoteMessage = (messageId) =>
    setState((prev) => ({ ...prev, quotingMessageId: messageId }));

  useEffect(() => {
    let timeout;
    timeout = setTimeout(() => {
      highlightMessage("");
      clearTimeout(timeout);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [state.highlightedMessageId]);

  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages.at(-1);
      scrollToMessage(lastMessage.id);
    }
  }, [messages.length]);

  return (
    <AppContext.Provider
      value={{
        messagesRef,
        messages,
        sendMessage,
        scrollToMessage,
        findMessage,
        highlightMessage,
        quoteMessage,
        ...state,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
