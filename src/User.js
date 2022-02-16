import React from 'react';
import NoSsr from '@material-ui/core/NoSsr';
import GoogleFontLoader from 'react-google-font-loader';
import {makeStyles} from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {Row, Item} from '@mui-treasury/components/flex';
import {Info, InfoSubtitle, InfoTitle} from '@mui-treasury/components/info';
import {useNewsInfoStyles} from '@mui-treasury/styles/info/news';
import {useCoverCardMediaStyles} from '@mui-treasury/styles/cardMedia/cover';
import {Container} from "react-bootstrap";

const useStyles = makeStyles(() => ({
    card: {
        minWidth: 320,
        position: 'relative',
        boxShadow: '0 8px 24px 0 rgba(0,0,0,0.12)',
        overflow: 'visible',
        borderRadius: '1.5rem',
    },
    main: {
        overflow: 'hidden',
        borderTopLeftRadius: '1.5rem',
        borderTopRightRadius: '1.5rem',
        zIndex: 1,
        '&:after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            display: 'block',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(to top, #014a7d, rgba(0,0,0,0))',
        },
    },
    content: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        zIndex: 1,
        padding: '1.5rem 1.5rem 1rem',
    },
    avatar: {
        width: 48,
        height: 48,
    },
    // tag: {
    //     display: 'inline-block',
    //     fontFamily: "'Sen', sans-serif",
    //     backgroundColor: '#ff5dac',
    //     borderRadius: '0.5rem',
    //     padding: '2px 0.5rem',
    //     color: '#fff',
    //     marginBottom: '0.5rem',
    // },
    // title: {
    //     fontFamily: "'Sen', sans-serif",
    //     fontSize: '2rem',
    //     fontWeight: 800,
    //     color: '#fff',
    // },
    author: {
        zIndex: 1,
        position: 'relative',
        borderBottomLeftRadius: '1.5rem',
        borderBottomRightRadius: '1.5rem',
        justifyContent: 'center'

    },
    shadow: {
        transition: '0.2s',
        position: 'absolute',
        zIndex: 0,
        width: '88%',
        height: '100%',
        bottom: 0,
        borderRadius: '1.5rem',
        backgroundColor: 'rgba(0,0,0,0.06)',
        left: '50%',
        transform: 'translateX(-50%)',
    },
    shadow2: {
        bottom: 0,
        width: '72%',
        backgroundColor: 'rgba(0,0,0,0.04)',
    },
}));

export const User = React.memo(function News3Card() {
    const styles = useStyles();
    const mediaStyles = useCoverCardMediaStyles();
    return (
        <Container>
            <br/>
            <br/>
            <br/>
            <br/>
            <Card className={styles.card}>
                <Box className={styles.main} minHeight={300} position={'relative'}>
                    <CardMedia
                        classes={mediaStyles}
                        image={
                            'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80'
                        }
                    />
                    <div className={styles.content}>
                        <Typography variant={'h2'} className="text-center" style={{color: 'white', fontWeight: 'bold'}}>
                            Profilo N
                        </Typography>
                    </div>
                </Box>
                <Row
                    className={styles.author}
                    m={0}
                    p={3}
                    pt={2}
                    gap={2}
                    bgcolor={'common.white'}>
                    <Item>
                        <Avatar
                            className={styles.avatar}
                            src={'https://i.pravatar.cc/300?img=13'}
                        />
                    </Item>
                    <Info position={'middle'} useStyles={useNewsInfoStyles}>
                        <InfoTitle style={{fontWeight: 'bold'}}>sito.web.it</InfoTitle>
                        <InfoSubtitle>Jul 20 | 2 Min Read</InfoSubtitle>
                    </Info>
                </Row>
                <Row
                    className={styles.author}
                    m={0}
                    p={3}
                    pt={2}
                    gap={2}
                    bgcolor={'common.white'}>
                    <Typography variant={'h2'} className="text-center" style={{color: 'black', fontWeight: 'bold'}}>
                        Ddnjdnj
                    </Typography>
                </Row>
                <div className={styles.shadow}/>
                <div className={`${styles.shadow} ${styles.shadow2}`}/>
            </Card>
        </Container>
    );
});

// function User(props) {
//     const {id} = useParams();
//
//     return (
//         <>
//             <br/>
//             <br/>
//             <br/>
//             <br/>
//             <Container fluid>
//                 <Row className="justify-content-center">
//                     <Avatar sx={{bgcolor: deepPurple[500], width: 56, height: 56}}>OP</Avatar>
//                 </Row>
//                 <br/>
//                 <Row className="justify-content-center">
//                     <Typography variant="h3" gutterBottom component="div" className="text-center"
//                                 style={{color: 'black', fontWeight: 'bold'}}>
//                         Profilo {id}
//                     </Typography>
//                     <Typography variant="subtitle1" gutterBottom component="div" className="text-center">
//                         {"Una piccola descrizione del profilo " + id}
//                     </Typography>
//                     {/*<Typography variant="h3" gutterBottom component="div" className="text-center"*/}
//                     {/*            style={{color: 'darkred'}}>*/}
//                     {/*    Descrizione Profilo*/}
//                     {/*</Typography>*/}
//                 </Row>
//             </Container>
//         </>
//
//     )
// }


export default User;