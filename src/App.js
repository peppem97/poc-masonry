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
import ImageUploadExample from "./ImageUploadExample";

class App extends Component {
    constructor(props) {
        super(props);
        console.disableYellowBox = true;
        this.state = {
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
                                  increaseColumnsSize={this.increaseColumnsSize.bind(this)}
                                  decreaseColumnsSize={this.decreaseColumnsSize.bind(this)}/>}/>
                        <Route exact path='/user/:id' element={
                            <User columnWidth={this.state.columnWidth}
                                  setLoading={this.setLoading.bind(this)}/>}/>
                        <Route exact path='/image-upload' element={<ImageUploadExample/>}/>
                    </Routes>
                </Router>
            </>
        );
    }
}

export default App;
