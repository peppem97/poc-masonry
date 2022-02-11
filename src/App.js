import {Component} from "react";
import {Container, Row} from "react-bootstrap";
import PrimarySearchAppBar from "./Toolbar";
import Stack from "./Stack";

class App extends Component {
    constructor(props) {
        super(props);
        console.disableYellowBox = true;
    }
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
