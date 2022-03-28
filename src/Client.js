import {Col, Container, Row} from "react-bootstrap";
import Avatar from "@material-ui/core/Avatar";
import {useNavigate, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import GlobalContext from "./GlobalContext";
import {setBusy, setIdle} from "./store/loading";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {Typography} from "@mui/material";
import Box from "@mui/material/Box";
import {makeStyles} from "@material-ui/core/styles";

const useClasses = makeStyles(theme => ({
    avatar: {
        boxShadow: theme.shadows[10],
    }
}))

export default function Client(props) {
    const [name, setName] = useState(null);
    const [surname, setSurname] = useState(null);
    const [avatar, setAvatar] = useState(null);
    const classes = useClasses();
    const {username} = useParams();
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token.value);
    const appContext = useContext(GlobalContext);
    let navigate = useNavigate();

    const getClientInfo = () => {
        dispatch(setBusy());
        axios.get(appContext.ENDPOINT_CLIENTS + "?username=" + username, {
            headers: {'Authorization': 'Bearer ' + token}
        }).then((response) => {
            console.log(response)
            setName(response.data[0].name);
            setSurname(response.data[0].surname);
            setAvatar(response.data[0].avatar.url);
            dispatch(setIdle())
            // if (response.data.length > 0) {
            //     console.log(response)
            //     dispatch(setIdle());
            // } else {
            //     dispatch(setIdle());
            //     navigate(appContext.routes.noUser);
            // }
        }).catch(() => {
            dispatch(setIdle());
            navigate(appContext.routes.noUser);
        });
    };

    useEffect(() => {
        getClientInfo();
    }, [])


    return (
        <>
            <br/>
            <br/>
            <br/>
            <br/>
            <Container>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 2,
                    justifyContent: 'center'
                }}>
                    <Avatar className={classes.avatar} src={appContext.HOST + avatar} style={{width: '200px', height: '200px'}}/>
                    <Typography className='text-center' variant='h3'>{name} {surname}</Typography>
                </Box>
                <br/>
            </Container>
        </>
    );
}