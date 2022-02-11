import React, {Component} from "react";
import StackGrid, {easings, transitions} from "react-stack-grid";
import image from './assets/example.png';

const itemModifier = [
    'pattern1',
    'pattern2',
    'pattern3',
    'gray',
    'gray-light',
    'gray-dark',
    'yellow',
    'pink',
    'purple',
];

const divStyle = {
    'background-color': 'yellow',
    // 'background-image': image

}

class Card extends Component {
    render() {
        return <div style={divStyle}>
            Sono la card {this.props.numero}
        </div>
    }
}

class StackComponent extends Component {
    constructor(props) {
        super(props);
        const items = []

        for (let i = 0; i < 10; i += 1) {
            items.push(this.createItem());
        }
        this.state = {
            items,
            duration: 480,
            columnWidth: 150,
            gutter: 5,
            easing: easings.quartOut,
            transition: 'fadeDown',
            rtl: false,
        };
    }

    createItem() {
        const id = Math.random().toString(36).substr(2, 9);
        const height = Math.floor((Math.random() * (300 - 80)) + 80);
        const modifier = itemModifier[Math.floor(Math.random() * itemModifier.length)];
        return { id, height, modifier };
    }

    removeItem() {
        console.log('Rimuovo...')
    }

    render() {
        const {
            items,
            duration,
            columnWidth,
            gutter,
            easing,
            transition: transitionSelect,
            rtl,
        } = this.state;
        const transition = transitions[transitionSelect];

        return (
            <StackGrid duration={duration}
                       columnWidth={columnWidth}
                       gutterWidth={gutter}
                       gutterHeight={gutter}
                       easing={easing}
                       appear={transition.appear}
                       appeared={transition.appeared}
                       enter={transition.enter}
                       entered={transition.entered}
                       leaved={transition.leaved}
                       rtl={rtl}>
                {items.map(item =>
                    (<img
                        key={item.id}
                        src={image}
                        className={`item item--${item.modifier}`}
                        style={{ height: item.height, backgroundColor: 'yellow'}}
                        onClick={() => this.removeItem(item.id)}
                    />)
                )}
            </StackGrid>
        );
    }
}

export default StackComponent;