import firebase from "firebase/app";
import "firebase/auth";
import { useCallback, useContext, useState } from 'react';
import { useHistory, useLocation } from "react-router";
import { UserContext, userContext } from "../../App";
import firebaseConfig from "./firebase.config";
import './LogIn.css'
firebase.initializeApp(firebaseConfig)
function LogIn() {
  const [newUser, setUsers] = useState(false)
  const [user, setUser] = useState({
    isNotSingOut: false,
    name: '',
    email: '',
    photo: '',

  })
   const [loggedUser, setLoggedUser]=useContext(UserContext)
   const history=useHistory()
   const location=useLocation()
   let { from } = location.state || { from: { pathname: "/" } };
  const GoogleProvider = new firebase.auth.GoogleAuthProvider();
  const  fbProvider = new firebase.auth.FacebookAuthProvider();

  const handleSingInClick = () => {
    firebase.auth().signInWithPopup(GoogleProvider)
      .then(res => {
        const { displayName, photoURL, email } = res.user;
        const userDetails = {
          singIn: true,
          name: displayName,
          photo: photoURL,
          email: email
        }
        setUser(userDetails)
      })
  }
  const handleSingOut = () => {
    firebase.auth().signOut()
      .then(res => {

        const userDetailsClose = {
          singIn: false,
          name: '',
          photo: '',
          email: '',
          password: '',
          error: ' ',
          success: ''
        }
        setUser(userDetailsClose)
      })
      .catch(err => {
        console.log(err)
      })
  }
  ///facebook
  const handleFacebookSignIn =()=>{
    firebase
   .auth()
   .signInWithPopup(fbProvider )
   .then((result) => {
     var credential = result.credential;
 
     // The signed-in user info.
     var user = result.user;
     console.log('facebook user after logging',user);
 
     // This gives you a Facebook Access Token. You can use it to access the Facebook API.
     var accessToken = credential.accessToken;
 
     // ...
   })
   .catch((error) => {
     // Handle Errors here.
     var errorCode = error.code;
     var errorMessage = error.message;
     // The email of the user's account used.
     var email = error.email;
     // The firebase.auth.AuthCredential type that was used.
     var credential = error.credential;
 
     // ...
   });
   }

  const handleSubmit = (event) => {
    // console.log(user.email,user.password);
    if (newUser && user.email && user.password) {
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then(res => {
          const newUserInfo = { ...user };
          newUserInfo.error = '';
          newUserInfo.success = true
          setUser(newUserInfo)
        })
        .catch(error => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false
          setUser(newUserInfo)
          UpdateName(user.name)
        });
    }
    if (!newUser && user.email && user.password) {
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(res => {
          const newUserInfo = { ...user };
          newUserInfo.error = '';
          newUserInfo.success = true
          setLoggedUser(newUserInfo)
          setUser(newUserInfo)
          history.replace(from);
          console.log('sing in user info',res.user)
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false
          setUser(newUserInfo)
         
        }
      
        );
    }
    event.preventDefault()
  }
  const UpdateName = name => {
    var user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name
      
    }).then(function () {
    console.log('username has been updated');
    }).catch(function (error) {
     console.log(error);
    });
  }
  const handleBlur = (event) => {
    let isFormIsFieldValid = true;
    if (event.target.name === 'email') {
      isFormIsFieldValid = /\S+@\S+\.\S+/.test(event.target.value)
      // console.log(isEmailValid);
      //  const isEmailValid=/\S+@\S+\.\S+/.test(event.target.value)
      //  console.log(isEmailValid);
    }
    if (event.target.name === 'password') {
      const isPasswordValid = event.target.value.length > 6
      const isPasswordHasRightWay = /\d{1}/.test(event.target.value)
      isFormIsFieldValid = (isPasswordValid && isPasswordHasRightWay);


      //  const isPasswordValid=event.target.value.length > 6
      //  const passwordMustBeTrue=/\d{1}/.test(event.target.value)
      //  console.log(isPasswordValid && passwordMustBeTrue);
    }
    if (isFormIsFieldValid) {
      const newUserInfo = { ...user }
      newUserInfo[event.target.name] = event.target.value
      setUser(newUserInfo)
    }
  }

  return (
    <div className="App">
      {user.singIn ? <button onClick={handleSingOut}> Sign Out</button> :
        <button onClick={handleSingInClick}> Sign In</button>
      }
      <br/>
      <br/>
      <input onClick={handleFacebookSignIn} className="edit" type="submit" value={'Sing In With Facebook'}/>      

      {
        user.singIn && <div>
          <p>hey, welcome {user.name}</p>
          <img src={user.photo} alt="" />
          <p><code>{user.email}</code></p>
        </div>
      }
      <br />
      <br />
      <br />

      <br />
      <br />
      <br />
      <h2><code>hey welcome to our site</code></h2>
      <div className="text">
        <div className='border'>
          <form action="" onSubmit={handleSubmit}>
            <div className='system-change'>
              <div className="position-changing-upto">
                <input onChange={() => setUsers(!newUser)} type="checkbox" name="newUser" id="" />
                <label htmlFor="newUser">New user Sing up </label><br />
              </div>
              {newUser && <input onBlur={handleBlur} type="text" placeholder='Write your name' name="name" id="" />}<br />
              <input onBlur={handleBlur} type="email" placeholder='Write your email' name="email" id="" required /> <br />
              <input onBlur={handleBlur} type="password" placeholder='Write your password' name="password" id="" required /><br />
            </div>

            <input className="edit" type="submit" value={newUser ? 'Sing Up' : 'Sing In'} />
          </form>
          <p style={{ color: "tomato" }}>{user.error}</p>
          {
            user.success && <p style={{ color: '#6274df' }}>User {newUser ? 'Singed' : 'Logged'} successfully</p>
          }
        </div>
      </div>
    </div>
  );
}

export default LogIn;
