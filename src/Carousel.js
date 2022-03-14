import React, {useEffect, useState} from 'react';
import Carousel from 'react-material-ui-carousel'
import ProgressiveImg from "./ProgessiveImage";

function UserCarousel(props) {
    const [items, setItems] = useState([]);

    const initCarousel = () => {
        setItems(props.pictures.map(
            (picture, index) =>
                <ProgressiveImg  key={index} image={picture.image} />
                // <img key={index} src={picture.image} alt="" style={{width: '100%', height: '100%'}} loading="lazy"/>
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

export default UserCarousel;