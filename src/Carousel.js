import React, {useEffect, useState} from 'react';
import Carousel from 'react-material-ui-carousel'
import ProgressiveImg from "./ProgessiveImage";

function ShopCarousel(props) {
    const [items, setItems] = useState([]);

    const initCarousel = () => {
        setItems(props.pictures.map(
            (picture, index) =>
                <ProgressiveImg  key={index} image={picture.image} />
        ));
    };

    useEffect(() => {
        initCarousel();
    }, [props.pictures]);

    return (
        <>
            <Carousel sx={{height: '100%'}}>
                {items}
            </Carousel>
        </>
    );
}

export default ShopCarousel;