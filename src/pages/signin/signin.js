import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useFirestore } from '../../firebase/useFirestore'
import { auth, authGoogle } from '../../firebase/firebase'
import { useHistory } from 'react-router';
import { FcGoogle } from "react-icons/fc";
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  signinGoogle:{
    marginTop: "30px",
    marginBottom:"30px"
  }
}));

const initialstate = { email: '', password: '', confirmPassword: '', userName: '' }

export default function SignIn() {
  const classes = useStyles();
  const history = useHistory()
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const { addItem } = useFirestore();

  const handleChange = ({ target }) => {
    setInput({
      ...input,
      [target.name]: target.value
    });
    setError('');
  }

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (input.password !== input.confirmPassword) {
      return setError("Password don't match");
    }
    try {
      await auth.createUserWithEmailAndPassword(input.email, input.password,).then((res) => {
        addItemInF(res.user);
      })
      setInput(initialstate);
      history.push('/');
    } catch (err) {
      setError(err.message);
    }

  }

  async function addItemInF(user) {
    const newObject = {
      email: user.email,
      userId: user.uid,
      favorit: [{ id: "" }],
      saved: [{ id: "" }],
      photo:"",
    }
    await addItem(newObject, user.uid);
  }

const hundlSigninGoogle =()=>{
  auth.signInWithPopup(authGoogle).then((res)=>{
    addItemInF(res.user)
    history.push('/');
  })
}

const hundlSignOutGoogle =()=>{
  
}
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={input.email}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
            value={input.password}
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={input.confirmPassword}
            onChange={handleChange}
          />

          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <p className="form__error">{error}</p>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/login" variant="body2">
                {"Have an account? Log In"}
              </Link>
            </Grid>
          </Grid>
        </form>

        <Button variant="contained" className={classes.signinGoogle} color="primary" onClick={hundlSigninGoogle} disableElevation>
          <FcGoogle/> Sign In With Google
        </Button>

      </div>

    </Container>
  );
}