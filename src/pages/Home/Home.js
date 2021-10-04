import { Request_move } from "../../api/api"
import RowMove from '../../component/row-move/RowMove'
import Slider__ from '../../component/Slider'
import ComponentLink from '../../component/componentLink'

export default function Home() {
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
