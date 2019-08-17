import React from 'react';
import { db } from './firebase';

const ChatInputBox = ({user, channelId}) => {

  const submitMessage = (e) => {
    e.preventDefault();
    const {value} = e.target.elements[0];
    db
      .collection('channels')
      .doc(channelId)
      .collection('messages')
      .add({
        user:db.collection("users").doc(user.uid),
        text: value,
        createdAt: new Date()
      })
    e.target.reset()
  }

  return (
    <form
      onSubmit={submitMessage}
      className="ChatInputBox">
      <input className="ChatInput" placeholder="Message #general" />
    </form>
  );
}

export default ChatInputBox;
