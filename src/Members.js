import React from "react";
import useCollections from "./customHooks/useCollections";

const Members = ({ channelId }) => {
  const members = useCollections("users", undefined, [
    `channels.${channelId}`,
    "==",
    true
  ]);
  return (
    <div className="Members">
      <div>
        {members &&
          members.sort(sortByName).map(member => (
            <div className="Member" key={member.id}>
              <div className={`MemberStatus ${member.status.state}`} />
              {member.displayName}
            </div>
          ))}
      </div>
    </div>
  );
};

const sortByName = (a, b) => {
  return a.displayName > b.displayName
    ? 1
    : a.displayName < b.displayName
    ? -1
    : 0;
};

export default Members;
