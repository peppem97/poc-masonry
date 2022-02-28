import React from 'react';
import Carousel from 'react-material-ui-carousel'

function UserCarousel(props) {
    return (
        <Carousel>
            {props.items.map((item, i) => <img key={i} src={item.image} alt=""
                                               style={{width: '100%', height: '100%'}}/>)}
        </Carousel>
    )
}

export default UserCarousel;