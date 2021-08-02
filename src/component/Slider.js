import React, { useContext } from 'react';
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';
import { useState, useEffect } from 'react';
import axios from '../api/axios';
import { Request_move } from "../api/api"
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import '../css.css';
import { Link } from 'react-router-dom';
import List_pr from './List'
import { auth } from '../firebase/firebase'
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import '../css.css'
import { AuthContext } from '../context/auth'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import StarsIcon from '@material-ui/icons/Stars';
import { useSelector } from 'react-redux';
import { selectUserPhoto } from '../features/Profile/profileSlice';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

const Prof = () => {
  const userPhoto = useSelector(selectUserPhoto);

  return (
    <div>
      <Link to="/profile" >
        {
          userPhoto ? <img src={userPhoto} className="profile2" alt="" /> :
            <div className="profile2">
              <PermIdentityIcon style={{ fontSize: "30px", color: "#999" }} />
            </div>
        }

      </Link>
    </div>
  );
}
export default function Slider__() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState();
  const { user } = useContext(AuthContext);
  const [open_D, setOpen_D] = useState(false);
  const url_img = "https://image.tmdb.org/t/p/original"
  const [content, setContent] = useState([])

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(Request_move.Trending_movie);
      setContent(response.data.results);
      return response
    }
    fetchData()
  }, [])

  const subString_str = (str, n) => {
    return str.length > n ? `${str.substring(0, n)}...` : str
  }


  const handleClickOpen = () => {
    setOpen_D(true);
  };

  const handleCloseCancel = () => {
    setOpen_D(false);
  };


  const handleCloseLogOut = () => {
    setOpen_D(false);
    auth.signOut()
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };



  return (
    <div >

      <div>
        <Dialog
          open={open_D}
          onClose={handleCloseCancel}
          PaperComponent={PaperComponent}
          aria-labelledby="draggable-dialog-title"
        >
          <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
            Subscribe
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address here. We will send updates
              occasionally.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleCloseCancel} color="primary">
              Cancel
            </Button>
            <Button onClick={handleCloseLogOut} color="primary">
              Log out
            </Button>
          </DialogActions>
        </Dialog>

        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open && user}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose} >
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
          <List_pr />
          <List>
            <Link to={{ pathname: `/search` }} style={{ textDecoration: 'none' }}>
              <ListItem button={false}>
                <ListItemIcon> <SearchIcon /> </ListItemIcon>
                <ListItemText primary={"Search"} color="#aaa" />
              </ListItem>
            </Link>

            <Link to={{ pathname: `/favorites` }} style={{ textDecoration: 'none' }}>
              <ListItem button={false}>
                <ListItemIcon> <StarsIcon /> </ListItemIcon>
                <ListItemText primary={"Favorites"} />
              </ListItem>
            </Link>

            <Link to={{ pathname: `/Saved` }} style={{ textDecoration: 'none' }}>
              <ListItem button={false}>
                <ListItemIcon> <BookmarksIcon /> </ListItemIcon>
                <ListItemText primary={"Saved"} />
              </ListItem>
            </Link>

            <Link to={{ pathname: `/search` }} style={{ textDecoration: 'none' }}>
              <ListItem button={false}>
                <ListItemIcon> <HelpOutlineIcon /> </ListItemIcon>
                <ListItemText primary={"Help"} />
              </ListItem>
            </Link>

            <ListItem button onClick={handleClickOpen} >
              <ListItemIcon> <ExitToAppIcon /> </ListItemIcon>
              <ListItemText primary={"Log out"} />
            </ListItem>

          </List>

          <Divider />

        </Drawer>
      </div>



      <Slider autoplay={10000}>
        {content.map((item, index) => (
          <div
            key={index}
            className="slider_"
            style={{
              height: "500px",
              backgroundSize: "cover",
              backgroundImage: `url(${url_img}${item.backdrop_path})`,
              backgroundPosition: "center center"
            }}
          >
            <div className="nav">
              <div style={{ display: 'flex' }}>

                <IconButton onClick={handleDrawerOpen}>
                  <MenuIcon style={{ color: "#fff" }} />
                </IconButton>



                <Link to={{
                  pathname: `/search`

                }}>
                  <IconButton>
                    <SearchIcon style={{ color: "#fff" }} />
                  </IconButton>
                </Link>
              </div>

              {
                !user ? <div className="logIn">
                  <Link to="/login" style={{ textDecoration: 'none' }}>
                    <Button style={{ color: "#f3e5f5" }}>Log in</Button>
                  </Link >
                  <Link to="/signin" style={{ textDecoration: 'none' }}>
                    <Button style={{ color: "#f3e5f5" }}>Sign in</Button>
                  </Link>
                </div> : <Prof />
              }


            </div>
            <div className="Title_Overview" >
              <Typography variant="h6" style={{ color: "#fff" }}>
                {item?.original_title || item?.title || item?.original_name}
              </Typography>
              <Typography variant="caption" style={{ color: "#fff", fontSize: "13px" }}>
                {subString_str(item.overview, 150)}
              </Typography>
            </div>

            <div className="center">

            </div>
          </div>
        ))}
      </Slider>
    </div>
  )
}



function PaperComponent(props) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}