import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
    location:{
        display:"flex",
        justifyItems: "center",
        alignItems: "center",
    }
  },
}));
export default function Unfact_loging({ tital }) {
    const classes = useStyles();
    return (
    <div>
        <h2 className="Row__tital">{tital}</h2>

        <div className="Unfact">
            <div style={{ display:"flex",
        justifyItems: "center",
        alignItems: "center",}} className={`fact`}> <CircularProgress  disableShrink /></div>
            <div style={{ display:"flex",
        justifyItems: "center",
        alignItems: "center",}} className={`fact`}> <CircularProgress  disableShrink /></div>
            <div style={{ display:"flex",
        justifyItems: "center",
        alignItems: "center",}} className={`fact`}> <CircularProgress  disableShrink /></div>
            <div style={{ display:"flex",
        justifyItems: "center",
        alignItems: "center",}} className={`fact`}> <CircularProgress  disableShrink /></div>
            <div style={{ display:"flex",
        justifyItems: "center",
        alignItems: "center",}} className={`fact`}> <CircularProgress  disableShrink /></div>
            <div style={{ display:"flex",
        justifyItems: "center",
        alignItems: "center",}} className={`fact`}> <CircularProgress  disableShrink /></div>
        </div>marginLeft:"30px"
    </div>
    )
}