import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from "@mui/material/Typography";
import {DialogContent, IconButton, useMediaQuery, useTheme} from "@mui/material";
import {makeStyles} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import {Row, Column, Item} from '@mui-treasury/components/flex';
import CardMedia from "@material-ui/core/CardMedia";
import image from './assets/example3.jpg';


const useBasicProfileStyles = makeStyles(({palette}) => ({
    overline: {
        fontSize: 10,
        textTransform: 'uppercase',
        letterSpacing: 1,
        color: '#8D9CAD',
    },
    name: {
        fontSize: 14,
        fontWeight: 500,
        color: '#495869',
    },
}));

const useCardHeaderStyles = makeStyles(() => ({
    root: {paddingBottom: 0},
    title: {
        fontSize: '1.25rem',
        color: '#122740',
    },
    subheader: {
        fontSize: '0.875rem',
        color: '#495869',
    },
}));


export default function ProductDialog(props) {
    const {onClose, selectedValue, open} = props;
    const fullScreen = useMediaQuery(useTheme().breakpoints.down('md'));
    const gap = {xs: 1, sm: 1.5, lg: 2}
    const descriptionStyle = useCardHeaderStyles();
    const userInfoStyle = useBasicProfileStyles();

    const closeDialog = (value) => {
        onClose(value);
    };

    return (
        <Dialog onClose={closeDialog} open={open} fullScreen={fullScreen} fullWidth={true} maxWidth={'md'}>
            <DialogContent>
                <Row p={{xs: 0.5, sm: 0.75, lg: 1}} gap={gap}>
                    <Column>
                        <Item grow>
                            <Box minHeight={200} borderRadius={8}>
                                <img src={image} style={{borderRadius: '1rem'}}/>
                            </Box>
                        </Item>
                    </Column>
                    <Column>
                        <Row>
                            <Item position={'middle'}>
                                <Typography variant='h3'>
                                    <b>{props.title}</b>
                                </Typography>
                                <Typography variant='subtitle1' className={descriptionStyle.subheader}>
                                    {props.description}
                                </Typography>
                            </Item>
                        </Row>
                        <Row position={'bottom'}>
                            <Item>
                                <IconButton>
                                    <Avatar src={'https://i.pravatar.cc/300?img=13'}/>
                                </IconButton>
                            </Item>
                            <Item position={'middle'} pl={{sm: 0.5, lg: 0.5}}>
                                <Typography className={userInfoStyle.overline}>Pubblicato da:</Typography>
                                <Typography className={userInfoStyle.name}>{props.user}</Typography>
                            </Item>
                        </Row>
                    </Column>
                </Row>
            </DialogContent>
        </Dialog>
    );
}

