import React, {Component} from "react";
import StackGrid from "react-stack-grid";
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
    // 'background-color': 'yellow',
    'background-image': image

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
        this.getList();
    }

    createItem() {
        const id = Math.random().toString(36).substr(2, 9);
        const height = Math.floor((Math.random() * (300 - 80)) + 80);
        const modifier = itemModifier[Math.floor(Math.random() * itemModifier.length)];
        return { id, height, modifier };
    }

    getList() {
        for (let i = 0; i < 10; i += 1) {
            this.items.push(this.createItem());
        }
    }

    render() {
        return (
            <StackGrid columnWidth={150}>
                {this.items.map(item =>
                    (<div
                        key={item.id}
                        className={`item item--${item.modifier}`}
                        style={{ height: item.height }}
                        onClick={() => this.removeItem(item.id)}
                    />)
                )}
            </StackGrid>
        );
    }
}

export default StackComponent;