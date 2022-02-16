import React, {Component} from "react";
import './App.css'
import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom';
import User from "./User";
import TopToolbar from "./TopToolbar";
import Home from "./Home";

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
        this.setState({columnWidth: this.state.columnWidth - 50});
    }

    setLoading = (stateLoading) => {
        this.setState({loading: stateLoading});
    }

    render() {
        return (
            <>
                <Router>
                    <TopToolbar loading={this.state.loading}
                                increaseColumnsSize={this.increaseColumnsSize.bind(this)}
                                decreaseColumnsSize={this.decreaseColumnsSize.bind(this)}/>
                    <Routes>
                        <Route exact path='/' element={<Home
                            setLoading={this.setLoading.bind(this)}
                            columnWidth={this.state.columnWidth}
                            increaseColumnsSize={this.increaseColumnsSize.bind(this)}
                            decreaseColumnsSize={this.decreaseColumnsSize.bind(this)}/>}/>
                        <Route exact path='/user/:id' element={<User/>}/>
                    </Routes>
                </Router>
            </>
        );
    }
}

export default App;
