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

// const divStyle = {
//     'background-color': 'yellow',
//     // 'background-image': image
//
// }

// class Card extends Component {
//     render() {
//         return <div style={divStyle}>
//             Sono la card {this.props.numero}
//         </div>
//     }
// }

class StackComponent extends Component {
    items = [];
    constructor(props) {
        super(props);
        // const items = [];
        for (let i = 0; i < 10; i += 1) {
            this.items.push(this.generateWindowsSize());
        }
        this.state = {
            duration: 480,
            columnWidth: 150,
            gutter: 5,
            easing: easings.quartOut,
            transition: 'fadeDown',
            rtl: false,
        };
    }


    generateWindowsSize() {
        const height = Math.floor((Math.random() * (300 - 80)) + 80);
        const modifier = itemModifier[Math.floor(Math.random() * itemModifier.length)];
        return { height, modifier };
    }

    removeItem() {
        console.log('Rimuovo...')
    }

    render() {
        const myTransition = 'fadeDown';

        return (
            <StackGrid duration={this.state.duration}
                       columnWidth={this.statecolumnWidth}
                       gutterWidth={this.state.gutter}
                       gutterHeight={this.state.gutter}
                       easing={this.state.easing}
                       appear={transitions[myTransition].appear}
                       appeared={transitions[myTransition].appeared}
                       enter={transitions[myTransition].enter}
                       entered={transitions[myTransition].entered}
                       leaved={transitions[myTransition].leaved}
                       rtl={this.state.rtl}>
                {this.items.map((item, index) =>
                    (<div style={{backgroundColor: 'grey'}} key={index}>
                        <img src={image}
                            alt={'OK'}
                            className={`item item--${item.modifier}`}
                            style={{ height: item.height}}
                            onClick={() => this.removeItem(item.id)}
                        />
                    </div>)
                )}
            </StackGrid>
        );
    }
}

export default StackComponent;