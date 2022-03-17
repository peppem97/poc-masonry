import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Container} from "@mui/material";
import {Row} from "react-bootstrap";

const steps = ['Sei un negozio o un cliente?', 'Inserisci le informazioni', 'Registrati'];

export default function MyStepper() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());

    // const isStepOptional = (step) => {
    //     return step === 1;
    // };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    // const handleSkip = () => {
    //     if (!isStepOptional(activeStep)) {
    //         // You probably want to guard against something like this,
    //         // it should never occur unless someone's actively trying to break something.
    //         throw new Error("You can't skip a step that isn't optional.");
    //     }
    //
    //     setActiveStep((prevActiveStep) => prevActiveStep + 1);
    //     setSkipped((prevSkipped) => {
    //         const newSkipped = new Set(prevSkipped.values());
    //         newSkipped.add(activeStep);
    //         return newSkipped;
    //     });
    // };

    const handleReset = () => {
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
                <Row>
                    <Stepper activeStep={activeStep}>
                        {steps.map((label, index) => {
                            const stepProps = {};
                            const labelProps = {};

                            if (isStepSkipped(index)) {
                                stepProps.completed = false;
                            }
                            return (
                                <Step key={label} {...stepProps}>
                                    <StepLabel {...labelProps}>{label}</StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>
                    {activeStep === steps.length ? (
                        <>
                            <Typography sx={{mt: 2, mb: 1}}>
                                Step completati
                            </Typography>
                            <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
                                <Box sx={{flex: '1 1 auto'}}/>
                                <Button onClick={handleReset}>Reset</Button>
                            </Box>
                        </>
                    ) : (
                        <>
                            <Typography sx={{mt: 2, mb: 1}}>Step {activeStep + 1}</Typography>
                            <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
                                <Button
                                    color="inherit"
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                    sx={{mr: 1}}
                                >
                                    Indietro
                                </Button>
                                <Box sx={{flex: '1 1 auto'}}/>

                                <Button onClick={handleNext}>
                                    {activeStep === steps.length - 1 ? 'Concludi' : 'Avanti'}
                                </Button>
                            </Box>
                        </>
                    )}
                </Row>
            </Container>
        </>
    );
}
