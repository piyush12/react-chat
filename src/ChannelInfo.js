import React from 'react';
import useDocSnapShot from './customHooks/useDocSnapshot';

function ChannelInfo({channelId}) {
  const channel = useDocSnapShot(`channels/${channelId}`);
  return (
    <div className="ChannelInfo">
      <div className="Topic">
        Topic: <input className="TopicInput" value={channel && channel.topic} />
      </div>
      <div className="ChannelName">#{channelId}</div>
    </div>
  );
}

export default ChannelInfo;
