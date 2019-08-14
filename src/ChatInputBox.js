import React from 'react';
import {db} from './firebase'; 

const ChatInputBox = () => {

const submitMessage = (e) => {
  e.preventDefault();
  db
    .collection('channels')
    .doc('random')
    .collection('messages')
    .add({
      text:e.target.elements[0].value,
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
