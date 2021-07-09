import React, { useContext, useState, useEffect } from "react"
import { Route, Redirect } from "react-router-dom"
import Firebase, { Firestore } from './firebase';
import PopUP from './popup';
import LoadingScreen from './LoadingScreen'


const AuthContext = React.createContext()

export default function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [authUser, setAuthuser] = useState();
  const [loading, setLoading] = useState(true)
  const [waiting, setWaiting] = useState(true)
  const [nointernet, setNointernet] = useState(false);
  const serverTime = Firestore.serverTime();
  const [open, setOpen] = useState(true)

  function SignUp(email, password) {
    return Firebase.auth().createUserWithEmailAndPassword(email, password)
  }

  function Login(email, password) {
    return Firebase.auth().signInWithEmailAndPassword(email, password)
  }

  function SignOut() {
    return Firebase.auth().signOut()
  }

  useEffect(() => {
    const unsubscribe = Firebase.auth().onAuthStateChanged(user => {
      setCurrentUser(user)
      user && console.log("ready:", user.email)
      setLoading(false)
    })
    return unsubscribe
  }, [])


  useEffect(() => {
    if (currentUser) {
      return Firestore.auth_users.where("user_id", "==", currentUser.uid).onSnapshot((users) => {
        if (!users.empty) {
          users.forEach(user_ => {
            const user = user_.data();
            user.id = user_.id
            setAuthuser(user);
            setWaiting(false)
            // console.log("USER######: ",user, waiting)
          });
        }
      });
    }
  }, [currentUser])

  const value = {
    currentUser,
    authUser,
    serverTime,
    loading,
    waiting,
    Login,
    SignUp,
    SignOut,
  }

  const popdata = {
    title: "Cant work without internet :(",
    content: "Your'e appears to be offline, Please check your internet connection and try again",
    wish: "Have a healthy, Amazing day"
  }
  return (
    <AuthContext.Provider value={value}>
      {/* {currentUser && console.log("currentUser:",currentUser.email)} */}
      {!loading && children}
    </AuthContext.Provider>
  )
}