import React, {useState} from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import User from "./User";
import TopToolbar from "./TopToolbar";
import Home from "./Home";
import GlobalContext from "./GlobalContext";

export default function App() {
    const [token, setToken] = useState('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMmUzMmZkYzUxNWJkMDAzMTM0YWFjYSIsImlhdCI6MTY0NTYwNTA0MCwiZXhwIjoxNjQ1NjkxNDQwLCJpc3MiOiJzdHJhcGkifQ.cryGO3jNIIma8pTTPPu8an8V8_mCPvBgQkM5T_ZrdLQ')
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
        columnWidth: columnWidth,
        host: "http://zion.datafactor.it:40505",
        hostShops: "http://zion.datafactor.it:40505/shops",
        hostProducts: "http://zion.datafactor.it:40505/products"
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
        <GlobalContext.Provider value={appSettings}>
            <Router>
                <TopToolbar increaseColumnsSize={increaseColumnsSize}
                            decreaseColumnsSize={decreaseColumnsSize}/>
                <Routes>
                    <Route exact path='/home' element={<Home/>}/>
                    <Route exact path='/user/:username' element={<User/>}/>
                </Routes>
            </Router>
        </GlobalContext.Provider>
    );
}