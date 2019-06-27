import React from "react";
import "../Messages/messages.css";

import MessageItem from "./MessageItem";

const MessageList = ({
  authUser,
  messages,
  onEditMessage,
  onRemoveMessage
}) => (
  <ul>
    {messages.map(message => (
      <MessageItem
        className="inner"
        authUser={authUser}
        key={message.uid}
        message={message}
        onEditMessage={onEditMessage}
        onRemoveMessage={onRemoveMessage}
      />
    ))}
  </ul>
);

export default MessageList;
