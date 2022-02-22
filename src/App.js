import React, {useState} from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import User from "./User";
import TopToolbar from "./TopToolbar";
import Home from "./Home";

export default function  App() {
    const [token, setToken] = useState('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMmUzMmZkYzUxNWJkMDAzMTM0YWFjYSIsImlhdCI6MTY0NTUxNzkxMywiZXhwIjoxNjQ1NjA0MzEzLCJpc3MiOiJzdHJhcGkifQ.BHhu0FRCVaf6tkiY6ijgL0ytg0qXROyNFBOAungrZ5g')
    const [loading, setLoading] = useState(null)
    const [disabledIncrease, setDisabledIncrease] = useState(false)
    const [disabledDecrease, setDisabledDecrease] = useState(false)
    const [columnWidth, setColumnWidth] = useState(200)

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
        <>
            <Router>
                <TopToolbar loading={loading}
                            disableIncrease={disabledIncrease}
                            disableDecrease={disabledDecrease}
                            increaseColumnsSize={increaseColumnsSize}
                            decreaseColumnsSize={decreaseColumnsSize}/>
                <Routes>
                    <Route exact path='/' element={
                        <Home setLoading={setLoadingState}
                              columnWidth={columnWidth}
                              token={token}
                              increaseColumnsSize={increaseColumnsSize}
                              decreaseColumnsSize={decreaseColumnsSize}/>}/>
                    <Route exact path='/user/:username' element={
                        <User columnWidth={columnWidth}
                              token={token}
                              setLoading={setLoadingState}/>}/>
                </Routes>
            </Router>
        </>
    );
}