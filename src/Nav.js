import React from "react";
import firebase from "firebase";
import {Link} from '@reach/router';
import useCollecitons from "./customHooks/useCollections";

function Nav({ user }) {
  const channels = useCollecitons("channels");

  return (
    <div className="Nav">
      <div className="User">
        <img className="UserImage" alt="whatever" src={user.photoUrl} />
        <div>
          <div>{user.displayName}</div>
          <div>
            <button
              className="text-button"
              onClick={() => firebase.auth().signOut()}
            >
              log out
            </button>
          </div>
        </div>
      </div>
      <nav className="ChannelNav">
        {channels.map(channel => (
          <Link to={`/channel/${channel.id}`} key={channel.id}>
            # {channel.id}
          </Link>
        ))}
      </nav>
    </div>
  );
}

export default Nav;
