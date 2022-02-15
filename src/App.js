import React, {Component, Fragment} from "react";
import Stack from "./Stack";
import './App.css'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from 'react-router-dom';
import Prova from "./prova";
import TopToolbar from "./TopToolbar";

class App extends Component {
    constructor(props) {
        super(props);
        console.disableYellowBox = true;
        this.state = {
            loading: false,
            columnWidth: 200,
        };
    }

    increaseColumnsSize = () => {
        this.setState({columnWidth: this.state.columnWidth + 50})
    }

    decreaseColumnsSize = () => {
        this.setState({columnWidth: this.state.columnWidth - 50})
    }

    setLoading = (stateLoading) => {
        this.setState({loading: stateLoading})
    }

    render() {
        return (
            <Fragment>
                <TopToolbar loading={this.state.loading}
                            increaseColumnsSize={this.increaseColumnsSize.bind(this)}
                            decreaseColumnsSize={this.decreaseColumnsSize.bind(this)}/>
                <Router>
                    <Routes>
                        <Route exact path='/' element={<Stack
                            setLoading={this.setLoading.bind(this)}
                            columnWidth={this.state.columnWidth}
                            increaseColumnsSize={this.increaseColumnsSize.bind(this)}
                            decreaseColumnsSize={this.decreaseColumnsSize.bind(this)}/>}/>
                        <Route exact path='/prova' element={<Prova/>}/>
                    </Routes>
                </Router>
            </Fragment>

        );
    }
}

export default App;
