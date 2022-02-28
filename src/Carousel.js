import React from 'react';
import Carousel from 'react-material-ui-carousel'

function UserCarousel(props) {

    return (
        <Carousel style={{width: 'auto%', height: '100%', objectFit: 'fill'}}>
            {props.items.map((item, i) => <img key={i} src={item.image} alt=""
                                               style={{width: '100%', height: '100%', objectFit: 'cover'}}/>)}
        </Carousel>
    )
}

export default UserCarousel;