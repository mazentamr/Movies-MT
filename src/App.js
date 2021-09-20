
import { BrowserRouter as Router, Route} from "react-router-dom";
import { Request_move } from "./api/api"
import RowMove from './component/row-move/RowMove'
import Slider__ from './component/Slider'
import ComponentLink from './component/componentLink'
import Top_rated from './listMovie/Top_rated'
import LogIn from './pages/login/login'
import SignIn from './pages/signin/signin'
import ComponerntSearch from './pages/search/ComponerntSearch'
import PageMoie from './component/PageMoie'
import { PrivatRoute } from './PrivateRouth/PrivateRouth'
import { AuthProvider } from './context/auth'
import Profile from './component/Profile'
import Favorites from './pages/favorites/favorites';
import Saved from './pages/Saved/Saved'
function Home() {

  return (
    <div>

      <Slider__ />
      <ComponentLink />
      <div className="App">
        <RowMove tital="Trending movie" url_movie={Request_move.Trending_movie} />
        <RowMove tital="Top rated" url_movie={Request_move.Top_rated} />
        <RowMove tital="War movie" url_movie={Request_move.War_movie} />
        <RowMove tital="Action movie" url_movie={Request_move.Action_movie} />
        <RowMove tital="Adventure movie" url_movie={Request_move.Adventure_movie} />
        <RowMove tital="Comedy movie" url_movie={Request_move.Comedy_movie} />
        <RowMove tital="Crime movie" url_movie={Request_move.Crime_movie} />
        <RowMove tital="Documentary movie" url_movie={Request_move.Documentary_movie} />
        <RowMove tital="Drama movie" url_movie={Request_move.Drama_movie} />
        <RowMove tital="Romance movie" url_movie={Request_move.Romance_movie} />
        <RowMove tital="Animation movie" url_movie={Request_move.Animation_movie} />
      </div>
    </div>)
}


function App() {

  return (
    <AuthProvider>
      <Router>
        <Route path="/" component={Home} exact />
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

      </Router>
    </AuthProvider>
  );
}

export default App;
