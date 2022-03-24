import StackGrid, {easings, transitions} from "react-stack-grid";
import React from "react";
import ProductCard from "./ProductCard";
import {CircularProgress, ImageListItem} from "@mui/material";
import Box from "@mui/material/Box";
import PictureCard from "./PictureCard";
import {useSelector} from "react-redux";

export default function GridSystem(props) {
    const myTransition = 'fadeDown';
    const columnWidth = useSelector((state) => state.columnWidth.value);

    return (
        <>
            <StackGrid duration={500}
                       columnWidth={props.columnWidth ?? columnWidth}
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
                        (<ProductCard
                            key={index}
                            product={product}
                            showAvatar={!(props.isUser)}
                            updateProduct={props.updateProduct}
                            deleteProduct={props.deleteProduct}/>))
                }
                {!props.isProducts &&
                    props.pictures.map((picture) => {
                            if (!picture.add) {
                                return <ImageListItem
                                    key={picture.index}
                                    cols={1}
                                    rows={1}>
                                    <PictureCard
                                        picture={picture.image}
                                        height={'150px'}
                                        width={'150px'}/>
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
    );
}
