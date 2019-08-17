import React, { useRef, useEffect } from "react";
import isSameDate from "date-fns/is_same_day";
import useCollecitons from "../customHooks/useCollections";
import FirstMessage from "./FirstMessage";


const ChatScroller = props => {
  const ref = useRef();
  const shouldScroll = useRef(true);

  useEffect(() => {
    if(shouldScroll.current){
      const node = ref.current;
      node.scrollTop = node.scrollHeight;
    }
    
  });

  const handleScroll = () => {
    const {scrollTop, clientHeight, scrollHeight} = ref.current;
    const atBottom = scrollTop + clientHeight === scrollHeight;
    shouldScroll.current = atBottom;
  }

  return <div ref={ref} {...props} onScroll={handleScroll}/>;
};

const Messages = ({ channelId }) => {
  const messages = useCollecitons(
    `channels/${channelId}/messages/`,
    "createdAt"
  );

  return (
    <ChatScroller className="Messages">
      <div className="EndOfMessages">That's every message!</div>
      {messages.map((message, index) => {
        const previousMessage = messages[index - 1];
        const showAvatar = shouldShowAvatar(previousMessage, message);

        const showDay = showShowDay(previousMessage, message);
        return showAvatar ? (
          <FirstMessage message={message} showDay={showDay} key={index} />
        ) : (
          <div key={index}>
            <div className="Message no-avatar">
              <div className="MessageContent">{message.text}</div>
            </div>
          </div>
        );
      })}
    </ChatScroller>
  );
};

const showShowDay = (previousMessage, message) => {
  const First = !previousMessage;
  if (First) {
    return true;
  }

  const isNewDate = isSameDate(
    previousMessage.createdAt.seconds * 1000,
    message.createdAt.seconds * 1000
  );

  return !isNewDate;
};

const shouldShowAvatar = (previousMessage, message) => {
  const First = !previousMessage;
  if (First) {
    return true;
  }

  // different user
  if (message.user.id !== previousMessage.user.id) {
    return true;
  }

  const hasBeenWhile =
    message.createdAt.seconds - previousMessage.createdAt.seconds > 180;

  return hasBeenWhile;
};

export default Messages;
