import { useEffect, useState } from "react"
import axios from '../../api/axios';
import './RowMove.css'
import Unfact_loging from '../Unfact_loging'
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { infoMovie } from "../../api/api";
import StarIcon from '@material-ui/icons/Star';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    starY: {
        color: "rgb(233, 190, 0)",
    },
    starG: {
        color: "rgb(53, 53, 53))"
    },
    pStar: {
        display: "flex",
        // alignItems:"flex-end",
        justifyContent: "flex-end",
        marginTop: "20px",
    },
    buttonClose: {
        color: "#ddd",
        background: "#000",
        height: "30px",
        border: "none"
    },
    textname: {
        marginTop: "20px",
    }

}));


const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);


export default function RowMove({ tital, url_movie }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [loding, setLoding] = useState(true)
    const [movies, setMovies] = useState([])
    const [infoM, setinfoMo] = useState({})
    const url_img = "https://image.tmdb.org/t/p/original"
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(url_movie)
                setMovies(response.data.results);
                response.data.results.then(setLoding(false))

                return response
            } catch (err) {
                console.log(console.error(err))
            }

        }
        fetchData()
    }, [])



    const handleClickOpen = (id) => {
        setOpen(true);
        fetchDataIdMovi(id)
    };
    const handleClose = () => {
        setOpen(false);
    };

    const fetchDataIdMovi = async (id) => {
        const respons = await axios.get(infoMovie(id)).then(res => {
            setinfoMo(res.data)
        })
        return respons
    }


    const renderStar = (num) => {
        if (num <= 2) return <div className={classes.pStar}>
            <StarIcon className={classes.starG} />
            <StarIcon className={classes.starG} />
            <StarIcon className={classes.starG} />
            <StarIcon className={classes.starG} />
            <StarIcon className={classes.starG} /></div>
        else if (num <= 4 && num > 2) return <div className={classes.pStar}>
            <StarIcon className={classes.starY} />
            <StarIcon className={classes.starG} />
            <StarIcon className={classes.starG} />
            <StarIcon className={classes.starG} />
            <StarIcon className={classes.starG} /> </div>
        else if (num <= 6 && num > 4) return <div className={classes.pStar}>
            <StarIcon className={classes.starY} />
            <StarIcon className={classes.starY} />
            <StarIcon className={classes.starG} />
            <StarIcon className={classes.starG} />
            <StarIcon className={classes.starG} /></div>
        else if (num <= 8 && num > 6) return <div className={classes.pStar}>
            <StarIcon className={classes.starY} />
            <StarIcon className={classes.starY} />
            <StarIcon className={classes.starY} />
            <StarIcon className={classes.starG} />
            <StarIcon className={classes.starG} /></div>
        else if (num <= 10 && num > 8) return <div className={classes.pStar}>
            <StarIcon className={classes.starY} />
            <StarIcon className={classes.starY} />
            <StarIcon className={classes.starY} />
            <StarIcon className={classes.starY} />
            <StarIcon className={classes.starG} /></div>
        else if (num === 10) return <div className={classes.pStar}>
            <StarIcon className={classes.starY} />
            <StarIcon className={classes.starY} />
            <StarIcon className={classes.starY} />
            <StarIcon className={classes.starY} />
            <StarIcon className={classes.starY} /></div>
    }

    if (loding) {
        return <Unfact_loging tital={tital} />
    }
    return (

        <div className="Row__move">
            <Typography variant="h5" style={{ color: "#fff", margin: "10px" }} className="Row__tital">{tital}</Typography>
            <div className="Row__list">
                {
                    movies.map((item, i) =>
                        <div key={i}>

                            <img
                                onClick={() => handleClickOpen(item.id)}
                                className="Row__img"
                                src={`https://image.tmdb.org/t/p/w342${item.poster_path}`}
                                alt={item.tital}
                                loading="lazy"
                            />


                        </div>
                    )
                    //background: "#000" 
                }
            </div>
            <div >
                <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                    {
                        infoM.backdrop_path ?
                            <div className="dilo" style={{
                                height: "300px",
                                backgroundSize: "cover",
                                backgroundImage: `url(${url_img}${infoM.backdrop_path})`,
                                backgroundPosition: "center center"
                            }}>
                                <div className="styleDo">
                                    <Typography variant="h6" className={classes.textname} >{infoM?.original_title || infoM?.title || infoM?.original_name}</Typography>
                                    {renderStar(infoM.vote_average)}
                                </div>
                            </div> :
                            <FactDialog />
                    }

                    <DialogActions style={{ background: "#000", height: "300px" }} >
                        <Typography variant="caption" align="center" style={{ color: "#fff", margin: "10px" }} >{infoM.overview}</Typography>

                    </DialogActions>
                    <button onClick={handleClose} className={classes.buttonClose} >
                        Close
                    </button>
                </Dialog>
            </div>
        </div>
    )
}

const FactDialog = () => {
    return (
        <div className="factDialog">
            <CircularProgress disableShrink />
        </div>
    )
}
