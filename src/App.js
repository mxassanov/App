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

const Settings = React.lazy(() => import('./components/Settings/Settings'));


class App extends React.Component {
    componentDidMount() {
        this.props.initializeApp();
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
                    <Route path='/messages'
                           render={() => <DialogsContainer store={this.props.store}/>}/>
                    <Route path='/profile/:userId?'
                           render={() => <ProfileContainer store={this.props.store}/>}/>
                    <Route path='/users'
                           render={() => <UsersContainer store={this.props.store}/>}/>
                    <Route path='/login'
                           render={() => <LoginPage store={this.props.store}/>}/>

                    <Route path='/news' render={() => <News />}/>
                    <Route path='/music' render={() => <Music />}/>
                    <Route path='/settings' render={ () => {
                        return <React.Suspense fallback={<Preloader />}>
                            <Settings/>
                        </React.Suspense>
                    }}/>
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
