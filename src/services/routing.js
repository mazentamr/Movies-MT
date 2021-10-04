import { BrowserRouter, Route, Switch} from 'react-router-dom';
import { AuthProvider } from '../context/auth';
import Top_rated from '../pages/listMovie/Top_rated'
import LogIn from '../pages/login/login'
import SignIn from '../pages/signin/signin'
import ComponerntSearch from '../pages/search/ComponerntSearch'
import PageMoie from '../component/PageMoie'
import { PrivatRoute } from '../PrivateRouth/PrivateRouth'
import Profile from '../component/Profile'
import Favorites from '../pages/favorites/favorites';
import Saved from '../pages/Saved/Saved'
import Home from '../pages/Home/Home';
export function Routing() {

    return (
        <AuthProvider>
            <BrowserRouter>

                <Route path="/" component={Home} exact />

                <Switch>
                    <Route path="/list/:path" component={Top_rated} exact />
                    <Route path="/login" component={LogIn} exact />
                    <Route path="/signin" component={SignIn} exact />
                    <Route path="/search" component={ComponerntSearch} exact />
                    <PrivatRoute path="/list/:path/:id" component={PageMoie} exact />
                    <Route path="/list/search/:id" component={PageMoie} exact />
                    <Route path="/profile" component={Profile} />
                    <Route path="/favorites" component={Favorites} />
                    <Route path="/Saved" component={Saved} />
                    <Route path="/list/favorites/:id" component={PageMoie} exact />
                    <Route path="/list/saved/:id" component={PageMoie} exact />
                </Switch>
            </BrowserRouter>

        </AuthProvider>
    );
}
