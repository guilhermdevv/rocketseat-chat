import { useState, useRef, useEffect } from "react";

import cx from "classnames";
import truncate from "truncate";

import { useAppContext } from "./contexts/AppContext";
import { Message } from "./components";
import { Return, Alt, Close, Send } from "./icons";

export default function App() {
  const inputRef = useRef(null);

  const [state, setState] = useState({
    inputValue: "",
    sendMessageAsMe: true,
  });

  const {
    sendMessage,
    scrollToMessage,
    findMessage,
    quotingMessageId,
    messages,
    quoteMessage,
  } = useAppContext();

  const quotingMessage = findMessage(quotingMessageId);

  const handleInputChange = (event) =>
    setState({ ...state, inputValue: event.target.value });
  const handleChangeSender = () =>
    setState({ ...state, sendMessageAsMe: !state.sendMessageAsMe });

  const handleSubmitForm = (event) => {
    event.preventDefault();
    if (!state.inputValue) return;
    sendMessage({
      text: state.inputValue,
      fromMe: state.sendMessageAsMe,
      ...(quotingMessageId ? { quotedMessageId: quotingMessageId } : {}),
    });
    quoteMessage("");
    setState((prev) => ({ ...prev, inputValue: "" }));
    inputRef.current.focus();
  };

  useEffect(() => {
    inputRef.current.focus();
  }, [state.sendMessageAsMe, quotingMessageId]);

  return (
    <div className="h-screen bg-primary-900">
      <div className="h-full grid m-auto [max-width:880px] [grid-template-rows:1fr_max-content]">
        <div className="space-y-2 overflow-y-scroll [&::-webkit-scrollbar]:hidden">
          <div className="sticky top-0 backdrop-blur-md w-full flex items-center space-x-4 [padding:15px]">
            <img
              className="rounded-full [width:50px] [height:50px]"
              src="https://avatars.githubusercontent.com/u/124310514"
            />
            <div>
              <span className="text-primary-100 font-bold">
                Guilherme Ricci
              </span>
              <div className="flex items-center space-x-1">
                <div className="bg-green-500 rounded-full [width:10px] [height:10px]" />
                <span className="text-green-500">online</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-6">
            {messages.map((message) => (
              <Message key={message.id} data={message} />
            ))}
          </div>
        </div>
        <div className="flex flex-col space-y-2 [padding:15px]">
          {quotingMessage && (
            <div className="flex items-center space-x-2">
              <button
                className="flex-1 flex items-center justify-between px-4 py-0.5 rounded-full border border-2 border-dashed border-primary-200"
                onClick={() => scrollToMessage(quotingMessage.id)}
              >
                <span className="text-primary-200 text-sm">
                  {truncate(quotingMessage.text, 15)}
                </span>
                <Return className="text-primary-200" />
              </button>
              <button
                className="p-1 rounded-full border border-2 border-dashed border-primary-200"
                onClick={() => quoteMessage("")}
              >
                <Close className="text-primary-200" />
              </button>
            </div>
          )}
          <div className="flex items-center space-x-2">
            <button
              className={cx(
                "p-2 rounded-full transition-colors",
                !state.sendMessageAsMe && "bg-purple-500 text-purple-100",
                state.sendMessageAsMe && "bg-green-900 text-green-100"
              )}
              onClick={handleChangeSender}
            >
              <Alt className="text-purple-100" />
            </button>
            <form
              className="flex-1 flex items-center space-x-2"
              onSubmit={handleSubmitForm}
            >
              <input
                className={cx(
                  "flex-1 bg-primary-500 text-primary-100",
                  "border-0 rounded-full",
                  "[&::placeholder]:text-primary-400",
                  !state.sendMessageAsMe && "focus:ring-purple-500",
                  state.sendMessageAsMe && "focus:ring-green-900"
                )}
                ref={inputRef}
                value={state.inputValue}
                onChange={handleInputChange}
                placeholder="Mensagem..."
                type="text"
              />
              <button
                className="p-1 border rounded-full border-2 border-dashed border-primary-200 transition-opacity disabled:opacity-25"
                disabled={!state.inputValue}
              >
                <Send className="text-primary-200" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
