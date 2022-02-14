import {Component, Fragment} from "react";
import Stack from "./Stack";
import './App.css'

class App extends Component {
    constructor(props) {
        super(props);
        console.disableYellowBox = true;
    }

    render() {
        return (
            <Fragment>
                <Stack/>
            </Fragment>
        );
    }
}

export default App;
