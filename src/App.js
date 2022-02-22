import React, {useState} from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import User from "./User";
import TopToolbar from "./TopToolbar";
import Home from "./Home";
import AppContext from "./AppContext";

export default function App() {
    const [token, setToken] = useState('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMmUzMmZkYzUxNWJkMDAzMTM0YWFjYSIsImlhdCI6MTY0NTUxNzkxMywiZXhwIjoxNjQ1NjA0MzEzLCJpc3MiOiJzdHJhcGkifQ.BHhu0FRCVaf6tkiY6ijgL0ytg0qXROyNFBOAungrZ5g')
    const [loading, setLoading] = useState(null)
    const [disabledIncrease, setDisabledIncrease] = useState(false)
    const [disabledDecrease, setDisabledDecrease] = useState(false)
    const [columnWidth, setColumnWidth] = useState(200)
    const appSettings = {
        //Posso includere anche delle funzioni...
        token: token,
        loading: loading,
        disabledIncrease: disabledIncrease,
        disabledDecrease: disabledDecrease,
        columnWidth: columnWidth
    };

    const checkIncreaseDecrease = () => {
        if (columnWidth >= 500) {
            setDisabledIncrease(true);
            setDisabledDecrease(false);
            return;
        }

        if (columnWidth <= 250) {
            setDisabledIncrease(false);
            setDisabledDecrease(true);
            return;
        }
        setDisabledIncrease(false);
        setDisabledDecrease(false);
    }

    const increaseColumnsSize = () => {
        checkIncreaseDecrease();

        if (columnWidth >= 500) {
            setColumnWidth(columnWidth);
        } else {
            setColumnWidth(columnWidth + 50);
        }
    }

    const decreaseColumnsSize = () => {
        checkIncreaseDecrease();

        if (columnWidth <= 250) {
            setColumnWidth(columnWidth);
        } else {
            setColumnWidth(columnWidth - 50);
        }
    }

    const setLoadingState = (loadingState) => {
        setLoading(loadingState);
    }

    return (
        <AppContext.Provider value={appSettings}>
            <Router>
                <TopToolbar increaseColumnsSize={increaseColumnsSize}
                            decreaseColumnsSize={decreaseColumnsSize}/>
                <Routes>
                    <Route exact path='/home' element={<Home/>}/>
                    <Route exact path='/user/:username' element={<User/>}/>
                </Routes>
            </Router>
        </AppContext.Provider>
    );
}