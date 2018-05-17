import React, { Component } from 'react';
import {
    View,
    PanResponder
} from 'react-native';

class Deck extends Component {
    constructor(props) {
        super(props);

        // create an instance of PanResponder
        const panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true, // want PanResponder handling user's gesture
            onPanResponderMove: (event, gesture) => { // callback when user dragging screen.
                // console.log(`gesture:  + ${JSON.stringify(gesture)}`);
                // console.log({...gesture});
            },
            onPanResponderRelease: () => {}
        });

        this.state = { panResponder }; // 'panResponder' is own self-contained object, we're not trying to update it in shape form.

        // OR - do not call 'setState' with panResponder
        /* this._panResponder = PanResponder.create({

        }); */
    }

    renderCards() {
        return this.props.data.map(item => {
            return this.props.renderCard(item);
        });
    };

    render() {
        // 'this.renderCards()' only need to run once and immediately when the component renders. Helper methods use parenthesis.
        return (
            <View {...this.state.panResponder.panHandlers}>
                {this.renderCards()}
            </View>
        );
    }
};

export default Deck;

/* gesture:
{
    "stateID":0.8235344785010503,
    "moveX":195.029296875,
    "moveY":358.28125,
    "x0":223.154296875,
    "y0":221.71875,
    "dx":-28.125,
    "dy":136.5625,
    "vx":-2.5164748801137946e-8,
    "vy":1.2218883584552535e-7,
    "numberActiveTouches":1,
    "_accountsForMovesUpTo":1117634840
} */
