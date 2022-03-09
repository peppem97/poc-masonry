import StackGrid, {easings, transitions} from "react-stack-grid";
import React, {useContext} from "react";
import ProductCard from "./ProductCard";
import {CircularProgress, ImageListItem} from "@mui/material";
import Box from "@mui/material/Box";
import GlobalContext from "./GlobalContext";
import PictureCard from "./PictureCard";

export default function GridSystem(props) {
    const myTransition = 'fadeDown';
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
                       rtl={false}>
                {props.isProducts &&
                    props.products.map((product, index) =>
                        (<ProductCard key={index} product={product} showAvatar={!(props.isUser)}/>))
                }
                {!props.isProducts &&
                    props.pictures.map((element) => {
                            if (!element.add) {
                                return <ImageListItem key={element.index} cols={1} rows={1}>
                                    <PictureCard picture={element.image} height={'150px'} width={'150px'}/>
                                </ImageListItem>
                            } else {
                                return null;
                            }
                        }
                    )
                }
            </StackGrid>
            {props.loadingProducts &&
                <Box sx={{display: 'flex'}} className={'justify-content-center'} style={{color: 'darkred'}}>
                    <CircularProgress size={100} color='inherit'/>
                </Box>}
        </>
    )
}
