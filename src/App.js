import './App.css';
import {Component} from "react";
import {Container, Row} from "react-bootstrap";
import PrimarySearchAppBar from "./Toolbar";
import Home from "./home";
import Stack from "./Stack";

class App extends Component {
    render() {
        return (
            <div>
                <Container>
                    <PrimarySearchAppBar/>
                    <br/>
                    <Row>
                        <Stack/>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default App;
