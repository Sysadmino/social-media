import React from "react";

interface IMessageProps {
  message: string;
}

const Message: React.FC<IMessageProps> = (props) => {
  return <div className="message">{props.message}</div>;
};

export default Message;
