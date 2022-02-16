import React, {Component, Fragment} from "react";
import StackGrid, {easings, transitions} from "react-stack-grid";
import image from './assets/example3.jpg';
import MediaCard from "./MediaCard";
import {Container, Row} from "react-bootstrap";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Typography from "@mui/material/Typography";
import GridSystem from "./GridSystem";

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
        window.addEventListener('scroll', () => {
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                this.getMultipleItems();
            }
        });
    }

    generateHeight = () => {
        return Math.floor((Math.random() * (380)) + 80);
    }

    getInitialItems = () => {
        let tmpItems = [];
        for (let i = 0; i < 20; i += 1) {
            tmpItems.push({
                height: this.generateHeight(),
                imageCard: image,
                imageAvatar: 'https://i.pravatar.cc/300'
            });
        }
        this.setState({items: tmpItems})
    }

    getMultipleItems = () => {
        this.props.setLoading(true)
        const newItems = [];
        for (let i = 0; i < 5; i++) {
            newItems.push({
                height: this.generateHeight(),
                imageCard: image,
                imageAvatar: 'https://i.pravatar.cc/300'
            });
        }
        this.setState({
            items: [...this.state.items, ...newItems],
        });
        setTimeout(() => {
            this.props.setLoading(false)
        }, 500)
    }

    render = () => {
        return (
            <Fragment>
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
                        <GridSystem items={this.state.items} columnWidth={this.props.columnWidth}/>
                    </Row>
                </Container>
            </Fragment>
        );
    }

}

export default Home;