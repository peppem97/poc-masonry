import {Component} from "react";
import Stack from "./Stack";

class App extends Component {
    constructor(props) {
        super(props);
        console.disableYellowBox = true;
    }

    render() {
        return (
            <Stack/>
        );
    }
}

export default App;
