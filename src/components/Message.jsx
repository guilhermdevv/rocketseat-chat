import { useEffect } from "react";

import cx from "classnames";
import truncate from "truncate";

import { useAppContext } from "../contexts/AppContext";
import { translate } from "../utils";
import { Close, Return } from "../icons";

export default function Message({ data }) {
  const {
    messagesRef,
    scrollToMessage,
    findMessage,
    highlightMessage,
    quoteMessage,
    ...state
  } = useAppContext();

  const quotedMessage = findMessage(data.quotedMessageId);

  const quoting = state.quotingMessageId === data.id;
  const highlighted = state.highlightedMessageId === data.id;

  const handleRef = (ref) => {
    messagesRef.current[data.id] = ref;
  };

  const handleHighlight = () => {
    highlightMessage(data.quotedMessageId);
    scrollToMessage(data.quotedMessageId);
  };

  const handleQuote = () => {
    quoteMessage(quoting ? "" : data.id);
  };

  useEffect(() => {
    return () => {
      delete messagesRef.current[data.id];
    };
  }, []);

  return (
    <div
      className={cx(
        "flex flex-col bg-transparent transition-all",
        "[padding:0_15px_0_15px]",
        (highlighted || quoting) && "bg-primary-500",
        highlighted && quoting && "bg-opacity-50"
      )}
      ref={handleRef}
    >
      <div
        className={cx(
          "flex flex-col space-y-1",
          "[max-width:60%]",
          data.fromMe && "self-end"
        )}
      >
        {quotedMessage && (
          <button
            className={cx(
              "flex-1 space-x-2 flex items-center justify-between px-4 py-0.5 rounded-full",
              "border border-2 border-dashed border-primary-200",
              "[max-width:fit-content]",
              data.fromMe && "self-end flex-row-reverse space-x-reverse"
            )}
            onClick={handleHighlight}
          >
            <span className="text-primary-200 text-sm">
              {truncate(quotedMessage.text,15)}
            </span>
            <Return className="text-primary-200" />
          </button>
        )}
        <div
          className={cx(
            "flex items-center space-x-2",
            data.fromMe && "flex-row-reverse space-x-reverse"
          )}
        >
          <div
            className={cx(
              "flex-1 px-4 py-1",
              "[max-width:fit-content] [overflow-wrap:anywhere]",
              !data.fromMe && "bg-purple-500 [border-radius:0_10px_10px_10px]",
              data.fromMe && "bg-green-900 [border-radius:10px_10px_0_10px]"
            )}
          >
            <span className="text-primary-100">{data.text}</span>
          </div>
          <button
            className="p-0.5 rounded-full border border-2 border-dashed border-primary-200"
            onClick={handleQuote}
          >
            {quoting ? (
              <Close className="text-primary-200" />
            ) : (
              <Return className="text-primary-200" />
            )}
          </button>
        </div>
        <span
          className={cx("text-primary-100 text-sm", data.fromMe && "self-end")}
        >
          {translate(data.timestamp)}
        </span>
      </div>
    </div>
  );
}
