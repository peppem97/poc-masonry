import React, {Component} from "react";
import image from './assets/example3.jpg';
import {Container, Row} from "react-bootstrap";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Typography from "@mui/material/Typography";
import GridSystem from "./GridSystem";
import axios from "axios";

function Title() {
    return (
        <>
            <Typography variant="h1" gutterBottom className="text-center" style={{color: 'black', fontWeight: 'bold'}}>
                Masonry
            </Typography>
            <Typography variant="h3" gutterBottom className="text-center" style={{color: 'darkred'}}>
                Descrizione Masonry
            </Typography>
        </>)
}

class Home extends Component {
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

    // getInitialItems = () => {
    //     let tmpItems = [];
    //     for (let i = 0; i < 20; i += 1) {
    //         tmpItems.push({
    //             height: this.generateHeight(),
    //             avatar: 'https://i.pravatar.cc/300',
    //             user: 'Utente... ',
    //             title: 'Titolo...',
    //             picture: image,
    //             titleShop: 'Shop1...',
    //             emailShop: 'Email1...',
    //             description: 'Descrizione...'
    //         });
    //     }
    //     this.setState({items: tmpItems})
    // }

    getInitialItems = () => {
        axios.get("http://zion.datafactor.it:40505/products", {
            headers: {
                'Authorization': 'Bearer ' + this.props.token,
            }
        }).then((response) => {
            let items = response.data.map((element) => ({
                height: this.generateHeight(),
                avatar: "http://zion.datafactor.it:40505" + element.avatar.url, //devo prendere in qualche modo l'avatar dell'utente,
                title: element.title,
                description: element.description,
                picture: "http://zion.datafactor.it:40505" + element.picture.url,
                titleShop: this.state.title,
                username: element.username}))
            this.setState({items: items})

            // this.setState({
            //     idShopStrapi: response.data[0].id,
            //     email: response.data[0].email,
            //     title: response.data[0].title,
            //     description: response.data[0].description,
            //     avatar: "http://zion.datafactor.it:40505" + response.data[0].avatar.url,
            //     carousel: "http://zion.datafactor.it:40505" + response.data[0].carousel.url,
            //     telephone: response.data[0].telephone,
            //     website: response.data[0].website
            // })
        }).catch((error) => {
        })

        // let tmpItems = [];
        // for (let i = 0; i < 30; i += 1) {
        //     tmpItems.push({
        //         height: this.generateHeight(),
        //         imageCard: image,
        //         imageAvatar: 'https://i.pravatar.cc/300',
        //         user: 'Utente... ',
        //         title: 'Titolo...',
        //         description: 'Descrizione...'
        //     });
        // }
    }


    // getMultipleItems = () => {
    //     this.props.setLoading(true)
    //     const newItems = [];
    //     for (let i = 0; i < 5; i++) {
    //         newItems.push({
    //             height: this.generateHeight(),
    //             imageCard: image,
    //             imageAvatar: 'https://i.pravatar.cc/300',
    //             user: 'Utente... ',
    //             title: 'Titolo...',
    //             description: 'Descrizione...'
    //         });
    //     }
    //     this.setState({
    //         items: [...this.state.items, ...newItems],
    //     });
    //     setTimeout(() => {
    //         this.props.setLoading(false)
    //     }, 500)
    // }

    render = () => {
        return (
            <Container fluid>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <Row>
                    <Title/>
                </Row>
                <br/>
                <br/>
                <br/>
                <Row>
                    <GridSystem items={this.state.items} columnWidth={this.props.columnWidth} isUser={false}/>
                </Row>
            </Container>
        );
    }
}

export default Home;