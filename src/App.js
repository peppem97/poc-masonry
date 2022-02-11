import './App.css';
import {Component} from "react";
import {Container, Row} from "react-bootstrap";
import PrimarySearchAppBar from "./Toolbar";
import Home from "./home";

class App extends Component {
    render() {
        return (
            <div>
                <Container>
                    <PrimarySearchAppBar/>
                    <br/>
                    <Row>
                        <Home/>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default App;
