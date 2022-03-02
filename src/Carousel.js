import React, {useEffect, useState} from 'react';
import Carousel from 'react-material-ui-carousel'
import {Skeleton} from "@mui/material";

function UserCarousel(props) {
    const [items, setItems] = useState([])
    const [loaded, setLoaded] = useState(false)

    const initCarousel = () => {
        setItems(props.items.map(
            (item, i) =>
                <img key={i} src={item.image} alt="" style={{width: '100%', height: '100%'}} onLoad={() => {setLoaded(true)}}/>
        ))}

    useEffect(() => {
        initCarousel();
    }, [props.items])

    return (
        <>
            {/*{!loaded ? <Skeleton variant="rectangular" width={210} height={118} /> : null}*/}
            <Carousel sx={{height: '100%'}}>
                {items}
            </Carousel>
        </>

    )
}

export default UserCarousel;