import React, { Component } from 'react';
import {
    View,
    Animated,
    PanResponder
} from 'react-native';

class Deck extends Component {
    constructor(props) {
        super(props);

        const position = new Animated.ValueXY(); // not set (0,0) -> don't want to make any assumptions where my card is on the screen at any given point in time.

        // create an instance of PanResponder
        const panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true, // want PanResponder handling user's gesture
            onPanResponderMove: (event, gesture) => { // callback when user dragging screen.
                position.setValue({ x: gesture.dx, y: gesture.dy });
            },
            onPanResponderRelease: () => {}
        });

        this.state = { panResponder, position }; // 'panResponder' is own self-contained object, we're not trying to update (mutable) it in shape form.

        // OR - do not call 'setState' with panResponder, position
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
            <Animated.View 
              style={this.state.position.getLayout()}
              {...this.state.panResponder.panHandlers}
            >
                {this.renderCards()}
            </Animated.View>
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
