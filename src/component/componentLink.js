import { emphasize, withStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Chip from '@material-ui/core/Chip';
import { Link } from 'react-router-dom';
import { Request_move } from '../api/api'


const StyledBreadcrumb = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.grey[100],
    height: theme.spacing(3),
    color: theme.palette.grey[800],
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.grey[300],
    },
    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(theme.palette.grey[300], 0.12),
    },
  },
}))(Chip);

const links = [
  {
    label:"Top movie",
    path: `list/Top_rated`,
    data: Request_move.Top_rated,
  },
  {
    label:"Trending movie",
    path: `list/Trending_movie`,
    data: Request_move.Trending_movie,
  },
  {
    label:"Action movie",
    path: `list/Action_movie`,
    data: Request_move.Action_movie,
  },
  {
    label:"Adventure movie",
    path: `list/Adventure_movie`,
    data: Request_move.Adventure_movie,
  },
  {
    label:"Animation movie",
    path: `list/Animation_movie`,
    data: Request_move.Animation_movie,
  },
  {
    label:"Comedy movie",
    path: `list/Comedy_movie`,
    data: Request_move.Comedy_movie,
  },
  {
    label:"Crime movie",
    path: `list/Crime_movie`,
    data: Request_move.Crime_movie,
  },
  {
    label:"Documentary movie",
    path: `list/Documentary_movie`,
    data: Request_move.Documentary_movie,
  },
  {
    label:"Drama movie",
    path: `list/Drama_movie`,
    data: Request_move.Drama_movie,
  },
  {
    label:"Romance movie",
    path: `list/Romance_movie`,
    data: Request_move.Romance_movie,
  },
  {
    label:"War movie",
    path: `list/War_movie`,
    data: Request_move.War_movie,
  },
]

export default function ComponentLink() {
  return (
    <div>
      <Breadcrumbs aria-label="breadcrumb">
        {
          links.map(item =>
            <Link to={{
              pathname: item.path,
              state: { urlMovie:item.data }
            }} style={{ textDecoration: 'none' }}
            >
              <StyledBreadcrumb label={item.label} />
            </Link>
          )
        }
      </Breadcrumbs>
    </div>
  )
}

// <Link to={{
//           pathname: `list/Top_rated`,
//           state: { urlMovie: Request_move.Top_rated }
//         }} style={{ textDecoration: 'none' }}><StyledBreadcrumb label="Top movie" /></Link>
