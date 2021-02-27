import React from 'react'
import './App.css'
import Navbar from "./components/Navbar/Navbar"
import {Route, withRouter} from "react-router-dom"
import News from "./components/News/News"
import Music from "./components/Music/Music"
import DialogsContainer from "./components/Dialogs/DialogsContainer"
import UsersContainer from "./components/Users/UsersContainer"
import ProfileContainer from "./components/Profile/ProfileContainer"
import HeaderContainer from "./components/Header/HeaderContainer"
import LoginPage from "./components/Login/Login"
import {connect} from "react-redux"
import {compose} from "redux"
import {initializeApp} from "./redux/app-reducer"
import Preloader from "./components/common/preloader/preloader"
import {Redirect, Switch} from "react-router"
import {AppStateType} from "./redux/redux-store"

const Settings = React.lazy(() => import('./components/Settings/Settings'))

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
  initializeApp: () => void
}

class App extends React.Component<MapPropsType & DispatchPropsType> {
  catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
    console.log('Some error')
  }

  componentDidMount() {
    this.props.initializeApp()
    window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors)
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
        <Navbar/>
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

const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized
})

export default compose<React.ComponentType>(withRouter,
  connect(mapStateToProps, {initializeApp}))(App)
