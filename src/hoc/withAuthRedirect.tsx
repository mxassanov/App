import {Redirect} from "react-router"
import React from 'react'
import {connect} from "react-redux"
import {AppStateType} from "../redux/redux-store";

const mapStateToPropsForRedirect = (state: AppStateType) => ({
  isAuth: state.auth.isAuth,
} as MapPropsType)

type MapPropsType = {
  isAuth: boolean
}
type DispatchPropsType = {}

export function withAuthRedirect<CP>(Component: React.ComponentType<CP>) {

  function RedirectComponent(props: MapPropsType & DispatchPropsType) {
    const {isAuth, ...restProps} = props

    if (!isAuth) return <Redirect to='/login'/>

    return <Component {...restProps as CP} />
  }

  const ConnectedAuthRedirectComponent =
    connect<MapPropsType, DispatchPropsType, CP, AppStateType>
  (mapStateToPropsForRedirect)(RedirectComponent)

  return ConnectedAuthRedirectComponent
}