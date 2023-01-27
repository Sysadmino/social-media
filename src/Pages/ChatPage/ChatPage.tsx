import React, { useEffect, useState, useRef } from "react";
import Preloader from "../../Components/Common/Preloader/Preloader";
import withAuthRedirect from "../../hoc/withAuthRedirect";
import styles from "./chat-page.module.scss";

interface ChatMessage {
  userId: number;
  message: string;
  userName: string;
  photo: string;
}

const ChatPage: React.FC = () => {
  return <Chat />;
};

const Chat: React.FC = () => {
  const [ws, setWs] = useState<WebSocket | null>(null);

  const [readyStatus, setReadyStatus] = useState<"pending" | "ready">(
    "pending"
  );

  useEffect(() => {
    ws?.addEventListener("open", () => {
      setReadyStatus("ready");
    });
    return () => {
      ws?.removeEventListener("open", () => {
        setReadyStatus("ready");
      });
    };
  }, [readyStatus, ws]);

  useEffect(() => {
    let webChannel: WebSocket;
    const closeHandler = () => {
      setTimeout(() => {
        createChannel();
      }, 5000);
    };

    function createChannel() {
      webChannel?.removeEventListener("close", closeHandler);
      webChannel?.close();

      webChannel = new WebSocket(
        "wss://social-network.samuraijs.com/handlers/ChatHandler.ashx"
      );
      webChannel.addEventListener("close", closeHandler);
      setWs(webChannel);
    }
    createChannel();
    return () => {
      webChannel.removeEventListener("close", closeHandler);
      webChannel.close();
    };
  }, []);

  if (readyStatus === "pending") {
    return <Preloader inBlock transparent />;
  }

  return (
    <div>
      <Messages ws={ws} />
      <AddMessageForm ws={ws} readyStatus={readyStatus} />
    </div>
  );
};

const Messages: React.FC<{ ws: WebSocket | null }> = ({ ws }) => {
  const [messages, setMessages] = useState<Array<ChatMessage>>([]);
  const messagesAnchorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesAnchorRef.current?.scrollIntoView(false);
  }, [messages]);

  useEffect(() => {
    ws?.addEventListener("message", (e) => {
      setMessages((prev) => [...prev, ...JSON.parse(e.data)]);
    });
    return () => {
      ws?.removeEventListener("message", (e) => {
        setMessages((prev) => [...prev, ...JSON.parse(e.data)]);
      });
    };
  }, [ws]);

  return (
    <div className={styles["user-container"]}>
      {messages.map((x) => (
        <>
          <Message key={x.userId} message={x} />
          <div ref={messagesAnchorRef}></div>
        </>
      ))}
    </div>
  );
};

interface IChatMessageProps {
  message: ChatMessage;
}

const Message: React.FC<IChatMessageProps> = (props) => {
  const { message } = props;
  return (
    <div className={styles["user"]}>
      <img alt="" src={message.photo} className={styles["user__avatar"]} />
      <div className={styles["user__message-block"]}>
        <div className={styles["user__author"]}>{message.userName}</div>
        <div className={styles["user__message"]}>{message.message}</div>
      </div>
    </div>
  );
};

const AddMessageForm: React.FC<{
  ws: WebSocket | null;
  readyStatus: "pending" | "ready";
}> = ({ ws, readyStatus }) => {
  const [message, setMessage] = useState("");

  const sendMessageHandler = () => {
    if (!message) {
      return;
    }
    ws?.send(message);
    setMessage("");
  };

  return (
    <div>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        type="text"
        placeholder="Enter text message"
      />
      <button
        disabled={ws === null || readyStatus !== "ready"}
        onClick={sendMessageHandler}
      >
        Send
      </button>
    </div>
  );
};

export default withAuthRedirect(ChatPage);
