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
export default function ComponentLink() {
  return (
    <div>
      <Breadcrumbs aria-label="breadcrumb">
        <Link to={{
          pathname: `list/Top_rated`,
          state: { urlMovie: Request_move.Top_rated }
        }} style={{ textDecoration: 'none' }}><StyledBreadcrumb label="Top movie" /></Link>
        <Link to={{
          pathname: `list/Trending_movie`,
          state: { urlMovie: Request_move.Trending_movie }
        }} style={{ textDecoration: 'none' }}><StyledBreadcrumb component="a" label="Trending movie" /></Link>
        <Link to={{
          pathname: `list/Action_movie`,
          state: { urlMovie: Request_move.Action_movie }
        }} style={{ textDecoration: 'none' }}><StyledBreadcrumb component="a" label="Action movie" /></Link>
        <Link to={{
          pathname: `list/Adventure_movie`,
          state: { urlMovie: Request_move.Adventure_movie }
        }} style={{ textDecoration: 'none' }}><StyledBreadcrumb component="a" label="Adventure movie" /></Link>
        <Link to={{
          pathname: `list/Animation_movie`,
          state: { urlMovie: Request_move.Animation_movie }
        }} style={{ textDecoration: 'none' }} >  <StyledBreadcrumb component="a" label="Animation movie" /></Link>
        <Link to={{
          pathname: `list/Comedy_movie`,
          state: { urlMovie: Request_move.Comedy_movie}
        }} style={{ textDecoration: 'none' }} ><StyledBreadcrumb component="a" label="Comedy movie" /> </Link>
        <Link to={{
          pathname: `list/Crime_movie`,
          state: { urlMovie: Request_move.Crime_movie }
        }} style={{ textDecoration: 'none' }} > <StyledBreadcrumb component="a" label="Crime movie" /></Link>
        <Link to={{
          pathname: `list/Documentary_movie`,
          state: { urlMovie: Request_move.Documentary_movie }
        }} style={{ textDecoration: 'none' }} ><StyledBreadcrumb component="a" label="Documentary movie" /> </Link>
        <Link to={{
          pathname: `list/Drama_movie`,
          state: { urlMovie: Request_move.Drama_movie }
        }} style={{ textDecoration: 'none' }} > <StyledBreadcrumb component="a" label="Drama movie" /></Link>
        <Link to={{
          pathname: `list/Romance_movie`,
          state: { urlMovie: Request_move.Romance_movie }
        }} style={{ textDecoration: 'none' }} > <StyledBreadcrumb component="a" label="Romance movie" /></Link>
        <Link to={{
          pathname: `list/War_movie`,
          state: { urlMovie: Request_move.War_movie }
        }} style={{ textDecoration: 'none' }} > <StyledBreadcrumb component="a" label="War movie" /></Link>

      </Breadcrumbs>
    </div>
  )
}