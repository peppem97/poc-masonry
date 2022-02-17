import React, {Component} from 'react';
import NoSsr from '@material-ui/core/NoSsr';
import GoogleFontLoader from 'react-google-font-loader';
import image from './assets/leone.jpg';

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
import GridSystem from "./GridSystem";

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

export const UserCard = React.memo(function News3Card() {
    const styles = useStyles();
    const mediaStyles = useCoverCardMediaStyles();
    return (<Card className={styles.card}>
                <Box className={styles.main} minHeight={500} position={'relative'}>
                    <CardMedia
                        classes={mediaStyles}
                        image={image}
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
                        <InfoSubtitle>+39-0922-123456</InfoSubtitle>
                    </Info>
                </Row>
                <Row
                    className={styles.author}
                    m={0}
                    p={3}
                    pt={2}
                    gap={2}
                    bgcolor={'common.white'}>
                    <Typography variant={'h4'} className="text-center" style={{color: 'black', fontWeight: 'bold'}}>
                        Aggiungere funzionalità
                    </Typography>
                </Row>
                <div className={styles.shadow}/>
                <div className={`${styles.shadow} ${styles.shadow2}`}/>
            </Card>);
});

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
        };
    }

    componentDidMount = () => {
        this.getInitialItems();
        // window.addEventListener('scroll', () => {
        //     if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        //         this.getMultipleItems();
        //     }
        // });
    }

    generateHeight = () => {
        return Math.floor((Math.random() * (380)) + 80);
    }

    getInitialItems = () => {
        let tmpItems = [];
        for (let i = 0; i < 30; i += 1) {
            tmpItems.push({
                height: this.generateHeight(),
                imageCard: image,
                imageAvatar: 'https://i.pravatar.cc/300'
            });
        }
        this.setState({items: tmpItems})
    }

    render() {
        return (
            <>
                <Container>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <UserCard/>
                    <br/>
                    <br/>
                    <br/>
                    <Row className="justify-content-center">
                        <Typography variant="h3" gutterBottom component="div" className="text-center"
                                    style={{color: 'darkred', fontWeight: 'bold'}}>
                            Tutti i prodotti:
                        </Typography>
                    </Row>
                </Container>
                <Container fluid>
                    <GridSystem items={this.state.items} columnWidth={this.props.columnWidth}/>
                </Container>
            </>
        )
    }
}

export default User;