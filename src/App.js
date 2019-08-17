import React, { useState, useEffect } from "react";
import { Router, Redirect } from "@reach/router";
import Nav from "./Nav";
import Channel from "./Channel";
import { db, firebase, setupPresence } from "./firebase";
import Login from "./Login";

function App() {
  const user = useAuth();

  return user ? (
    <div className="App">
      <Nav user={user} />
      <Router>
        <Channel path="/channel/:channelId" user={user} />
        <Redirect from="/" to="/channel/general" />
      </Router>
    </div>
  ) : (
    <Login />
  );
}

function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    return firebase.auth().onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        const user = {
          displayName: firebaseUser.displayName,
          photoUrl: firebaseUser.photoURL,
          uid: firebaseUser.uid
        };
        setUser(user);
        db.collection("users")
          .doc(user.uid)
          .set(user, { merge: true });
        setupPresence(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  return user;
}

export default App;
