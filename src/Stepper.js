import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Container, TextField, ToggleButton, ToggleButtonGroup} from "@mui/material";
import {Col, Row} from "react-bootstrap";
import StoreIcon from '@mui/icons-material/Store';
import GroupIcon from '@mui/icons-material/Group';
import {useState} from "react";

export default function MyStepper() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const [userType, setUserType] = React.useState(null);
    const steps = ['Sei un negozio o un cliente?', 'Inserisci le informazioni', 'Registrati'];

    const [email, setEmail] = useState(null);
    const [title, setTitle] = useState(null);
    const [website, setWebsite] = useState(null);
    const [telephone, setTelephone] = useState(null);
    const [description, setDescription] = useState(null);


    const onChangeTypeUser = (event, typeUser) => {
        setUserType(typeUser);
    };

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    };

    const onChangeTitle = (e) => {
        setTitle(e.target.value);
    };

    const onChangeWebsite = (e) => {
        setWebsite(e.target.value);
    };

    const onChangeTelephone = (e) => {
        setTelephone(e.target.value);
    };

    const onChangeDescription = (e) => {
        setDescription(e.target.value);
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const nextStep = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const backStep = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const resetStep = () => {
        setActiveStep(0);
    };

    return (
        <>
            <Container>
                <br/>
                <br/>
                <br/>
                <br/>
                <Row className='justify-content-center'>
                    <Typography variant='h1' className='text-center'>REGISTRATI</Typography>
                </Row>
                <br/>
                <br/>
                <Row className='justify-content-center'>
                    <Col>
                        <Row className='justify-content-center'>
                            <Stepper activeStep={activeStep}>
                                {steps.map((label, index) => {
                                    return (
                                        <Step key={label} completed={isStepSkipped(index)}>
                                            <StepLabel>{label}</StepLabel>
                                        </Step>
                                    );
                                })}
                            </Stepper>
                        </Row>
                        <br/>
                        <br/>
                        <Row className='justify-content-center'>
                            <Col className='align-self-center'>
                                {(activeStep === 0) &&
                                    <>
                                        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                            <ToggleButtonGroup
                                                size="large"
                                                value={userType}
                                                onChange={onChangeTypeUser}
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
                                        </Box>
                                    </>
                                }
                                {(activeStep === 1) &&
                                    <>
                                        {
                                            (userType === 'negozio') &&
                                            <>
                                                <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2, justifyContent: 'center'}}>
                                                    <TextField
                                                        onChange={onChangeEmail}
                                                        autoFocus
                                                        color='secondary'
                                                        margin="dense"
                                                        label="Email"
                                                        variant="outlined"/>
                                                    <TextField
                                                        onChange={onChangeTitle}
                                                        autoFocus
                                                        color='secondary'
                                                        margin="dense"
                                                        label="Nome"
                                                        variant="outlined"/>
                                                    <TextField
                                                        onChange={onChangeWebsite}
                                                        autoFocus
                                                        color='secondary'
                                                        margin="dense"
                                                        label="Sito Web"
                                                        variant="outlined"/>
                                                    <TextField
                                                        onChange={onChangeTelephone}
                                                        autoFocus
                                                        color='secondary'
                                                        margin="dense"
                                                        label="Telefono"
                                                        variant="outlined"/>
                                                </Box>
                                                    <TextField fullWidth={true}
                                                        onChange={onChangeDescription}
                                                        autoFocus
                                                        multiline={true}
                                                        color='secondary'
                                                        margin="dense"
                                                        label="Descrizione"
                                                        variant="outlined"/>

                                            </>
                                        }
                                        {
                                            (userType === 'cliente') && <></>
                                        }
                                    </>
                                }
                                {(activeStep === 2) &&
                                    <>
                                        <Typography variant='h2'>Step C</Typography>
                                    </>
                                }
                                {(activeStep === 3) &&
                                    <>
                                        <Typography sx={{mt: 2, mb: 1}}>
                                            Step completati
                                        </Typography>
                                        <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
                                            <Box sx={{flex: '1 1 auto'}}/>
                                            <Button onClick={resetStep}>Reset</Button>
                                        </Box>
                                    </>
                                }
                            </Col>
                        </Row>
                        <br/>
                        <br/>
                        <Row>
                            <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
                                <Button
                                    variant='contained'
                                    style={{backgroundColor: activeStep === 0 ? 'grey' : 'darkred'}}
                                    disabled={activeStep === 0}
                                    onClick={backStep}
                                    sx={{mr: 1}}>
                                    Indietro
                                </Button>
                                <Box sx={{flex: '1 1 auto'}}/>
                                <Button onClick={nextStep}
                                        variant='contained'
                                        style={{backgroundColor: 'darkred'}}>
                                    {(activeStep === steps.length - 1) ? 'Concludi' : 'Avanti'}
                                </Button>
                            </Box>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
