import React, { Component } from 'react';
import {
    View,
    Animated,
    PanResponder,
    Dimensions
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

class Deck extends Component {
    constructor(props) {
        super(props);

        const position = new Animated.ValueXY(); // not set (0,0) -> don't want to make any assumptions where my card is on the screen at any given point in time.

        // create an instance of PanResponder
        const panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true, // want PanResponder handling user's gesture
            onPanResponderMove: (event, gesture) => { // callback when user dragging screen.
                // position.setValue({ x: gesture.dx, y: gesture.dy });
                Animated.spring(position, {
                    toValue: { x: gesture.dx, y: gesture.dy}
                }).start();
            },
            onPanResponderRelease: () => {}
        });

        this.state = { panResponder, position }; // 'panResponder' is own self-contained object, we're not trying to update (mutable) it in shape form.

        // OR - do not call 'setState' with panResponder, position
        /* this._panResponder = PanResponder.create({

        }); */
    }

    getCardStyle() {
        // interpolation between 'x' direction that card has been dragged and the amount of rotation/size/color -> Horizontal
        const { position } = this.state;
        const rotate = position.x.interpolate({
            inputRange: [-SCREEN_WIDTH, 0, SCREEN_WIDTH], // takes a lot more distance to get 120 degrees of rotation.
            outputRange: ['-90deg', '0deg', '90deg']
        });

        return {
            ...position.getLayout(), // this.state.position.getLayout() -> error ':' expected. Because we return an object key:value pair 
            // put '...' here to return object { x: ..., y: ..., transform: ... }. Take all properties of this.getLayout()
            transform: [{ rotate }]
        }
    }

    renderCards() {
        return this.props.data.map((item, index) => {
            if (index === 0) {
                return (
                    <Animated.View
                        key={item.id}
                        style={this.getCardStyle()}
                        {...this.state.panResponder.panHandlers}
                    >
                        {this.props.renderCard(item)}
                    </Animated.View>
                );
            }
            return this.props.renderCard(item);
        });
    };

    render() {
        // 'this.renderCards()' only need to run once and immediately when the component renders. Helper methods use parenthesis.
        return (
            <View>
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

/* Transform - https://facebook.github.io/react-native/docs/transforms.html#transform
array of object: 
{perspective: number}, ,object: {rotate: string}, ,object: {rotateX: string}, ,object: {rotateY: string}, ,object: {rotateZ: string}, 
,object: {scale: number}, ,object: {scaleX: number}, ,object: {scaleY: number}, ,object: {translateX: number}, 
,object: {translateY: number}, ,object: {skewX: string}, ,object: {skewY: string}	 */
