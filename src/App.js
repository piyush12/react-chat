import React,{useState,useEffect} from 'react';
import Nav from './Nav';
import Channel from './Channel';
import firebase from 'firebase';

function App() {

  const user = useAuth();

  return (
    user ? (
      <div className="App">
        <Nav user={user}/>
        <Channel />
      </div>
    ) :
    (
      <Login/>
    )
  );
}

function Login() {
  const [authError, setauthError] = useState(null);

  const handleSignIn = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try{
      await firebase.auth().signInWithPopup(provider)
    }catch(error){
      setauthError(error)
    }
    
  }

  return(
    <div className="Login">
      <button onClick={handleSignIn}>Sign in with Google</button>
      {authError && 
      <div>
        <p>Error</p>
        <p>{authError.message}</p>
      </div>
      }
    </div>
  )
}


function useAuth(){
  const [user, setUser] = useState(null);

    useEffect(() => {
      return firebase.auth().onAuthStateChanged(user => {
        if(user){
          setUser({
            displayName:user.displayName,
            photoUrl:user.photoURL,
            uid:user.uid
          })
          console.log(user)
        }else{
          setUser(null)
        }
      })

    }, [])

return user
}

export default App;
