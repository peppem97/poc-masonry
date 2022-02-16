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

class StackComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            duration: 500,
            gutter: 30,
            easing: easings.quartOut,
            transition: 'flip',
            rtl: false,
        };
    }

    componentDidMount = () => {
        this.getInitialCards();
        window.addEventListener('scroll', () => {
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                this.multipleAppendItem();
            }
        });

    }

    multipleAppendItem = () => {
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

    generateHeight = () => {
        return Math.floor((Math.random() * (380)) + 80);
    }

    getInitialCards = () => {
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

    visualizeCards = () => {
        return this.state.items.map((item, index) =>
            (<MediaCard key={index} item={item} index={index}/>)
        )
    }

    render = () => {
        const myTransition = 'fadeDown';
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
                        <Typography variant="h1" gutterBottom component="div" className="text-center"
                                    style={{color: 'black', fontWeight: 'bold'}}>
                            Masonry&nbsp;
                        </Typography>
                        <Typography variant="h3" gutterBottom component="div" className="text-center"
                                    style={{color: 'darkred'}}>
                            Descrizione Masonry
                        </Typography>
                    </Row>
                    <br/>
                    <br/>
                    <br/>
                    <Row>
                        <StackGrid duration={this.state.duration}
                                   columnWidth={this.props.columnWidth}
                                   gutterWidth={this.state.gutter}
                                   gutterHeight={this.state.gutter}
                                   easing={this.state.easing}
                                   appear={transitions[myTransition].appear}
                                   appeared={transitions[myTransition].appeared}
                                   enter={transitions[myTransition].enter}
                                   entered={transitions[myTransition].entered}
                                   leaved={transitions[myTransition].leaved}
                                   rtl={this.state.rtl}>
                            {
                                this.visualizeCards()
                            }
                        </StackGrid>
                    </Row>
                </Container>
            </Fragment>
        );
    }
}

export default StackComponent;