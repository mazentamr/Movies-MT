import {Route,Redirect} from 'react-router-dom'
import {AuthContext} from '../context/auth'
import { useContext } from 'react'

export const PrivatRoute =({component : RouteComponent , ...rest})=>{
    const {user}=useContext(AuthContext);
    return(
        <Route
            {...rest}
            render={(routeProps)=>
            !user ? <Redirect to={'/login'} /> : <RouteComponent {...routeProps}/>

        }
        />
    )
}