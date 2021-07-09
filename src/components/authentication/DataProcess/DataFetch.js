import React, { useContext, useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom"
import Firebase, { Firestore } from '../firebase';
import useAuth from '../Authentication';

import PopUP from '../popup';
import LoadingScreen from '../LoadingScreen';
import CopyRight from './copyright';




const AuthContext = React.createContext()

export default function useData() {
  return useContext(AuthContext)
}


export function DataProvider({ children }) {
  const { currentUser, authUser, loading, waiting } = useAuth();

  const [FeedPosts, setFeedposts] = useState([])
  const [NotificationData, setNotificationData] = useState([])
  const [paymentData, setPaymentData] = useState([])
  const [read, setRead] = useState()
  const [working, setWorking] = useState(true)
  const [alerts, setAlerts] = useState([])
  const [update, setUpdate] = useState(true)


  useEffect(() => {
    Firestore.feed_posts.orderBy('createdAt', 'desc').where('visible', '==', true).onSnapshot((Posts) => {
      setFeedposts([])
      var featuredpost = []
      Posts.forEach(post => {
        const fpost = post.data()
        fpost.id = post.id
        featuredpost.push(fpost);
      })
      setFeedposts(featuredpost);
    })

  }, [])


  useEffect(() => {
    const paymentdata = paymentData
    return setAlerts(NotificationData.length != 0 ? [{ title: `You have ${NotificationData.length} new Notifications`, is_noti: true },...paymentdata]:[...paymentdata])
  }, [paymentData,NotificationData])
  
  
  useEffect(() => {
    Firestore.notifications.orderBy('createdAt', 'desc').where('visible', '==', true).onSnapshot((notifies) => {
      setNotificationData([])
      var notification_ = []
      notifies.forEach(notifi => {
        const notifi_ = notifi.data()
        notifi_.id = notifi.id
        setNotificationData((prev)=>[...prev,notifi_])
        notification_.push(notifi_);
      })
      setAlerts()
      // setNotificationData(notification_);
    })

  }, [])


  useEffect(() => {
    Firestore.payment_data.orderBy('createdAt', 'desc').where('visible', '==', true).where('is_active', '==', true).onSnapshot((payments) => {
      setPaymentData([])
      var payments_ = []
      payments.forEach(payment => {
        const payment_ = payment.data()
        payment_.id = payment.id
          try {
            if (!payment_.payees.includes(currentUser.uid)) {
              payments_.push(payment_)
            }
          } catch (e) { }
        })
        setPaymentData(payments_);
    })

  }, [])


  const value = {
    NotificationData,
    FeedPosts,
    paymentData,
    alerts,
    setAlerts,
    update,
    setUpdate,
    read,
    setRead,
    working,
  }
  const popdata = {
    title: "Cant work without internet :(",
    content: "Your'e appears to be offline, Please check your internet connection and try again",
    wish: "Have a healthy, Amazing day"
  }
  return (
    <AuthContext.Provider value={value}>
      {/* {console.log("###2", currentUser && currentUser.email)} */}
      {!loading ?  children : <LoadingScreen />}
    </AuthContext.Provider>
  )
}