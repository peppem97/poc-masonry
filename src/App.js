import React, {Component} from "react";
import './App.css'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Switch
} from 'react-router-dom';
import User from "./User";
import TopToolbar from "./TopToolbar";
import Home from "./Home";
import ImageUploadExample from "./ImageUploadExample";
import Prova from "./prova";

class App extends Component {
    constructor(props) {
        super(props);
        console.disableYellowBox = true;
        this.state = {
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMmUzMmZkYzUxNWJkMDAzMTM0YWFjYSIsImlhdCI6MTY0NTQyOTY3NiwiZXhwIjoxNjQ1NTE2MDc2LCJpc3MiOiJzdHJhcGkifQ.0Mu4QBxqSU2koFu8Fg07Jc_6yC8nu4KZModJVmdHNx8',
            loading: false,
            disabledIncrease: false,
            disabledDecrease: false,
            columnWidth: 200,
        };
    }

    checkIncreaseDecrease = () => {
        if (this.state.columnWidth >= 500) {
            this.setState({disabledIncrease: true});
            this.setState({disabledDecrease: false});
            return;
        }

        if (this.state.columnWidth <= 250) {
            this.setState({disabledIncrease: false});
            this.setState({disabledDecrease: true});
            return;
        }

        this.setState({disabledIncrease: false});
        this.setState({disabledDecrease: false});

    }

    increaseColumnsSize = () => {
        this.checkIncreaseDecrease();

        if (this.state.columnWidth >= 500) {
            this.setState({columnWidth: this.state.columnWidth});
        } else {
            this.setState({columnWidth: this.state.columnWidth + 50});
        }
    }

    decreaseColumnsSize = () => {
        this.checkIncreaseDecrease();

        if (this.state.columnWidth <= 250) {
            this.setState({columnWidth: this.state.columnWidth});
        } else {
            this.setState({columnWidth: this.state.columnWidth - 50});
        }
    }

    setLoading = (stateLoading) => {
        this.setState({loading: stateLoading});
    }

    render() {
        return (
            <>
                <Router>
                    <TopToolbar loading={this.state.loading}
                                disableIncrease={this.state.disabledIncrease}
                                disableDecrease={this.state.disabledDecrease}
                                increaseColumnsSize={this.increaseColumnsSize.bind(this)}
                                decreaseColumnsSize={this.decreaseColumnsSize.bind(this)}/>
                    <Routes>
                        <Route exact path='/' element={
                            <Home setLoading={this.setLoading.bind(this)}
                                  columnWidth={this.state.columnWidth}
                                  token={this.state.token}
                                  increaseColumnsSize={this.increaseColumnsSize.bind(this)}
                                  decreaseColumnsSize={this.decreaseColumnsSize.bind(this)}/>}/>
                        <Route exact path='/user/:id' element={
                            <User columnWidth={this.state.columnWidth}
                                  token={this.state.token}
                                  setLoading={this.setLoading.bind(this)}/>}/>
                        <Route exact path='/image-upload' token={this.state.token} element={<ImageUploadExample/>}/>
                        <Route exact path='/prova/:id' element={<Prova/>} component={Prova}/>
                    </Routes>
                </Router>
            </>
        );
    }
}

export default App;
