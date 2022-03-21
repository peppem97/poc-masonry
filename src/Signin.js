import {
    CircularProgress,
    Container, Grid,
    IconButton,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
    useMediaQuery,
    useTheme
} from "@mui/material";
import {Col, Row} from "react-bootstrap";
import Typography from "@mui/material/Typography";
import React from "react";
import girl from './assets/girl.svg';
import {Visibility, VisibilityOff} from "@material-ui/icons";
import StoreIcon from "@mui/icons-material/Store";
import GroupIcon from "@mui/icons-material/Group";
import Box from "@mui/material/Box";

export default function Signin() {
    const theme = useTheme();
    const smallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const mediumScreen = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <>
            <Container>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <Row>
                    <Typography variant="h1" gutterBottom className="text-center" style={{color: 'black', fontWeight: 'bold'}}>
                        Masonry
                    </Typography>
                    <Typography variant="h3" gutterBottom className="text-center" style={{color: 'darkred'}}>
                        Descrizione Masonry
                    </Typography>
                </Row>
                <br/>
                <br/>
                <Row className='justify-content-center'>
                    <Grid container spacing={5}>
                        {(!smallScreen && !mediumScreen) && <Grid item  md={5} lg={5} xl={7}>
                            <img src={girl} style={{width: '100%', height: 'auto'}} alt=""/>
                        </Grid>}
                        <Grid item xs={12} sm={12} md={7} lg={7} xl={5}>
                            <Row className='justify-content-center'>
                                <Typography variant='subtitle1'>Inserisci qui le informazioni per accedere: </Typography>
                            </Row>
                            <Row className='justify-content-center'>
                                <TextField
                                    onChange={null}
                                    autoFocus
                                    color='secondary'
                                    margin="dense"
                                    label="Email"
                                    variant="outlined"/>
                            </Row>
                            <Row className='justify-content-center'>
                                <TextField
                                    onChange={null}
                                    type={'password'}
                                    color='secondary'
                                    margin="dense"
                                    label="Password"
                                    variant="outlined"/>
                            </Row>
                            <br/>
                            <Row className='justify-content-center'>
                                <ToggleButtonGroup
                                    size="large"
                                    value={''}
                                    onChange={null}
                                    exclusive={true}>
                                    <ToggleButton value="negozio">
                                        <StoreIcon/>
                                        <Typography variant='subtitle1'>Negozio</Typography>
                                    </ToggleButton>,
                                    <ToggleButton value="cliente">
                                        <GroupIcon/>
                                        <Typography variant='subtitle1'>Cliente</Typography>
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </Row>
                        </Grid>
                    </Grid>
                </Row>
                <br/>
            </Container>
        </>
    )
}