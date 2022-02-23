import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'
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
        <Carousel fullHeightHover={true}>
            {
                items.map( (item, i) => <Item key={i} item={item} /> )
            }
        </Carousel>
    )
}

function Item(props) {
    return (
        <img src={props.item.image} alt="" style={{height: '100%', width: '100%', objectFit: 'cover'}}/>
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