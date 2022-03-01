import React, {useEffect, useState} from 'react';
import Carousel from 'react-material-ui-carousel'

function UserCarousel(props) {
    const [loading, setLoading] = useState(false);

    const initCarousel = () => {
        return props.items.map(
            (item, i) => <img key={i} src={item.image} alt="" style={{width: '100%', height: '100%'}}/>
        );
    }

    useEffect(() => {
        setLoading(true);
        initCarousel();
        setLoading(false);
    }, [props.items])

    return (
        !loading && <Carousel>
            {initCarousel()}
        </Carousel>
    )
}

export default UserCarousel;