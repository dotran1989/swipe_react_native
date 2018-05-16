import React, { Component } from 'react';
import { View, Animated } from 'react-native';

class Ball extends Component{
    componentWillMount() {
        this.position = new Animated.ValueXY({ x: 0, y: 0 }); // ({ x: 0, y: 0 })
        /* 
        this.position + this.position.getLayout()
        Object {
            "left": 0,
            "top": 0 
        }*/
        Animated.spring(this.position, {
            toValue: { x: 200, y: 500 }
        }).start();
    }

    render() {
        return ( // getLayout() contains some information to tell the animated view how it should be changing.
            <Animated.View style={this.position.getLayout()}>
                <View style={styles.ball}/>
            </Animated.View>
        );
    }
}

const styles = {
    ball: {
        height: 60,
        width: 60,
        borderRadius: 30,
        borderWidth: 30,
        borderColor: 'black'
    }
}

export default Ball;