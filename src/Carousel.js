import React from 'react';
import Carousel from 'react-material-ui-carousel'
import {Paper, Button, Skeleton} from '@mui/material'
import image1 from './assets/example1.png';
import image2 from './assets/example2.jpg';
import image3 from './assets/example3.jpg';

function Example(props) {
    var items = [
        {
            name: "Random Name #1",
            description: "Probably the most random thing you have ever seen!",
            image: image1

        },
        {
            name: "Random Name #2",
            description: "Hello World!",
            image: image2
        }
    ]

    return (

        <Carousel style={{width: '100%', height: 'auto', objectFit: 'fill'}}>
            {
                items.map( (item, i) => <Item key={i} item={item} /> )
            }
        </Carousel>
    )
}

function Item(props) {
    return (
        // <Skeleton >
        //     <img src={props.item.image} alt="" style={{width: '100%', height: 'auto', objectFit: 'cover'}}/>
        //
        // </Skeleton>
    <img src={props.item.image} alt="" style={{width: '100%', height: 'auto', objectFit: 'cover'}}/>

    // <Paper>
        //     <h2>{props.item.name}</h2>
        //     <p>{props.item.description}</p>
        //
        //     <Button className="CheckButton">
        //         Check it out!
        //     </Button>
        // </Paper>
    )
}

export default Example;