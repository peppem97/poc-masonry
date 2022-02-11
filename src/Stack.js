import React, {Component} from "react";
import StackGrid, {easings, transitions} from "react-stack-grid";
import image from './assets/example.png';
import MediaCard from "./MediaCard";
import {Slider} from "@mui/material";
import Box from "@mui/material/Box";
import {Container, Row} from "react-bootstrap";
import PrimarySearchAppBar from "./TopToolbar";

class StackComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            items: [],
            duration: 480,
            columnWidth: 100,
            gutter: 30,
            easing: easings.quartOut,
            transition: 'fadeDown',
            rtl: false,
        };
    }

    componentDidMount() {
        this.getInitialCards();
        window.addEventListener('scroll', () => {
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                this.multipleAppendItem();
            }
        });

    }

    multipleAppendItem() {
        this.setState({loading: true})
        const newItems = [];
        for (let i = 0; i < 5; i++) {
            newItems.push({
                height: this.generateHeight(),
                image: image
            });
        }
        this.setState({
            items: [...this.state.items, ...newItems],
        });
        setTimeout(() => {this.setState({loading: false})}, 500)
    }

    generateHeight() {
        return Math.floor((Math.random() * (300 - 80)) + 80);
    }

    getInitialCards() {
        let tmpItems = [];
        for (let i = 0; i < 20; i += 1) {
            tmpItems.push({
                height: this.generateHeight(),
                image: image
            });
        }
        this.setState({items: tmpItems})
    }

    visualizeCards() {
        return this.state.items.map((item, index) =>
            (<MediaCard key={index} item={item} index={index}/>)
        )
    }

    removeItem() {
        console.log('Rimuovo...')
    }

    handleChangesSlider(event) {
        this.setState({columnWidth: 130 + event.target.value})
    }

    render() {
        const myTransition = 'fadeDown';
        return (
            <Container>
                <PrimarySearchAppBar loading={this.state.loading}/>
                <br/>
                <br/>
                <br/>
                <Row  className="justify-content-center">
                    <Box style={{width: '25%'}}>
                        <Slider
                            aria-label="Temperature"
                            defaultValue={30}
                            valueLabelDisplay="auto"
                            step={10}
                            marks
                            onChange={this.handleChangesSlider.bind(this)}
                            min={10}
                            max={110}
                        />
                    </Box>
                </Row>
                <Row>
                    <StackGrid duration={this.state.duration}
                               columnWidth={this.state.columnWidth}
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
        );
    }
}

export default StackComponent;