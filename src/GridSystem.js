import StackGrid, {easings, transitions} from "react-stack-grid";
import React from "react";
import ProductCard from "./ProductCard";
import {CircularProgress} from "@mui/material";
import Box from "@mui/material/Box";

export default function GridSystem(props) {
    const myTransition = 'fadeDown';

    const generateCards = () => {
        return props.items.map((item, index) =>
            (<ProductCard key={index} item={item} showAvatar={!(props.isUser)}/>)
        )
    }

    return (
        <>
            <StackGrid duration={500}
                       columnWidth={props.columnWidth}
                       gutterWidth={30}
                       gutterHeight={30}
                       easing={easings.quartOut}
                       appear={transitions[myTransition].appear}
                       appeared={transitions[myTransition].appeared}
                       enter={transitions[myTransition].enter}
                       entered={transitions[myTransition].entered}
                       leaved={transitions[myTransition].leaved}
                       rtl={false}>{generateCards()}
            </StackGrid>
            {props.loading &&
                <Box sx={{ display: 'flex' }} className={'justify-content-center'} style={{color: 'darkred'}}>
                <CircularProgress size={100} color='inherit'/>
            </Box>}
        </>
    )
}
