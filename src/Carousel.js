import React, {useEffect, useState} from 'react';
import Carousel from 'react-material-ui-carousel'

function UserCarousel(props) {
    const [items, setItems] = useState([]);
    const initCarousel = () => {
        setItems(props.items.map(
            (item, i) =>
                <img key={i} src={item.image} alt="" style={{width: '100%', height: '100%'}} loading="lazy"/>
        ))
    };

    useEffect(() => {
        initCarousel();
    }, [props.items]);

    return (
        <>
            <Carousel sx={{height: '100%'}}>
                {items}
            </Carousel>
        </>
    )
}

export default UserCarousel;