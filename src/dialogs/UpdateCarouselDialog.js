import {
    Card,
    CardMedia,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, IconButton, ImageList, ImageListItem, ImageListItemBar,
    Input,
    TextField
} from "@mui/material";
import Button from "@mui/material/Button";
import {Col, Row} from "react-bootstrap";
import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import GlobalContext from "../GlobalContext";
import InfoIcon from '@mui/icons-material/Info';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export default function UpdateCarouselDialog(props) {
    // const [title, setTitle] = useState(null)

    // const onChangeTitle = (e) => {
    //     setTitle(e.target.value)
    // }

    const closeDialog = () => {
        props.onClose();
    };

    // const uploadTitle = () => {
    //     props.uploadTitle(title)
    // }

    useEffect(() => {
        console.log(props.carousel)
    }, [props.carousel])

    return (
        <Dialog open={props.open} onClose={closeDialog}>
            <DialogTitle>Modifica copertina</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Modifica le immagini da mostrare nella copertina.
                </DialogContentText>
                <br/>
                <Container>
                    <ImageList sx={{width: 500, height: 200}}
                               gap={5} cols={30}>
                        {props.carousel.map((item, i) => (
                            <ImageListItem key={i} cols={10} rows={1}>
                                <img src={item.image}
                                     alt=""
                                     loading="lazy"/>
                                <ImageListItemBar
                                    actionIcon={
                                        [
                                            <IconButton sx={{color: 'rgba(255, 255, 255, 0.54)'}}>
                                                <OpenInFullIcon/>
                                            </IconButton>,
                                            <IconButton sx={{color: 'rgba(255, 255, 255, 0.54)'}}>
                                                <DeleteForeverIcon/>
                                            </IconButton>
                                        ]}
                                />
                            </ImageListItem>
                        ))}
                    </ImageList>


                    {/*<Row>*/}
                    {/*    {props.carousel.map(*/}
                    {/*        (item, i) => (<img key={i} src={item.image} alt=""*/}
                    {/*                           style={{width: '50%', height: '50%', padding: '10px'}}/>))*/}
                    {/*        // (<Card key={i}>*/}
                    {/*        //     <CardMedia component="img" image={item.image} style={{width: '50%', height: 'auto'}}>*/}
                    {/*        //*/}
                    {/*        //     </CardMedia>*/}
                    {/*        // </Card>))*/}


                    {/*    }*/}
                    {/*</Row>*/}
                    <br/>
                    <Row>
                        <Button onClick={() => {
                        }} variant="contained" component="span" style={{backgroundColor: 'darkred'}}>
                            Aggiorna immagini
                        </Button>
                    </Row>
                </Container>
            </DialogContent>
        </Dialog>
    )
}