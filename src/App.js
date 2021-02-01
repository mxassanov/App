import React from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import {Route, withRouter} from "react-router-dom";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginPage from "./components/Login/Login";
import {connect} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/common/preloader/preloader";
import {Redirect, Switch} from "react-router";

const Settings = React.lazy(() => import('./components/Settings/Settings'));


class App extends React.Component {
  catchAllUnhandledErrors = (promiseRejectionEvent) => {

  }

  componentDidMount() {
    this.props.initializeApp();
    window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors)
    // обработчик всех ошибок
  }

  componentWillUnmount() {
    window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors)
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader/>
    }
    return (
      <div className='app-wrapper'>
        <HeaderContainer/>
        <Navbar store={this.props.store}/>
        <div className='app-wrapper-content'>
          <Switch>
            <Route exact path='/'
                   render={() => <Redirect to={"/profile"}/>}/>
            <Route path='/messages'
                   render={() => <DialogsContainer/>}/>
            <Route path='/profile/:userId?'
                   render={() => <ProfileContainer/>}/>
            <Route path='/users'
                   render={() => <UsersContainer pageTitle={"Users"}/>}/>
            <Route path='/login'
                   render={() => <LoginPage/>}/>

            <Route path='/news' render={() => <News/>}/>
            <Route path='/music' render={() => <Music/>}/>
            <Route path='/settings' render={() => {
              return <React.Suspense fallback={<Preloader/>}>
                <Settings/>
              </React.Suspense>
            }}/>
            <Route path='*'
                   render={() => <div>404 NOT FOUND</div>}/>
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized
})

export default compose(withRouter,
  connect(mapStateToProps, {initializeApp}))(App);
