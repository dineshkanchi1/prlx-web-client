import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {BrowserRouter, Link, Route} from 'react-router-dom';
import { signout } from './actions/userActions';
import SigninScreen from './screens/SigninScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
function App() {

  const userSignin = useSelector(state => state.userSignin);
  const {userInfo} = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () =>{
    dispatch(signout());
  }

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="header row">
          <div className="logo-container">
            <Link to="/" className="logo">Interests</Link>
          </div>
          <div>
            {
              userInfo?(
                <div className="dropdown">
                  <Link to="#">{userInfo.name} <i className="fa fa-caret-down"></i></Link>
                  <ul className="dropdown-content">
                    <Link to="/" onClick={signoutHandler}>Sign Out</Link>
                  </ul>
                </div>
              ):(
                <Link to="/signin">SignIn</Link>
              )
            }
          </div>
        </header>
        <main>
          {/* <Route path="/" component={SigninScreen}></Route> */}
          <Route path="/signin" component={SigninScreen}></Route>
          <Route path="/register" component={RegisterScreen}></Route>
          
          {
            userInfo?(
              <Route path="/" component={HomeScreen} exact></Route>
            ):(
              <Route path="/" component={SigninScreen} exact></Route>
            )
          }
        </main>
        <footer className="row center">All Rights Reserved</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
