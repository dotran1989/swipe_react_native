import React, { Component } from 'react';
import { View, Animated, TouchableOpacity, Text } from 'react-native';

class Ball extends Component{
    state = {
        text: 'hi',
        color: 'blue'
    };

    componentWillMount() {
        // console.log(`this: ${JSON.stringify(this)}`); // typeError: converting circular structure for JSON
        this.position = new Animated.ValueXY({ x: 0, y: 0 }); // ({ x: 0, y: 0 })
        console.log(`this.position: ${JSON.stringify(this.position)}`);
        /* 
        this.position + this.position.getLayout()
        Object {
            "left": 0,
            "top": 0 
        }*/
    }

    _onPress() {
        setTimeout(() => {
            Animated.spring(this.position, {
                toValue: { x: 200, y: 500 }
            }).start();
            this.setState({ text: 'animated', color: 'red' })
        }, 75);
    }

    render() {
        return ( // getLayout() contains some information to tell the animated view how it should be changing.
            <View>
                <Animated.View style={[this.position.getLayout(), {borderColor: this.state.color, borderWidth: 1}]}>
                    <View style={styles.ball}/>
                </Animated.View>
                <TouchableOpacity onPress={this._onPress.bind(this)}>
                    <Text>Press Me!</Text>
                    <Text>Text: {this.state.text}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = {
    ball: {
        height: 60,
        width: 60,
        borderRadius: 30,
        borderWidth: 30,
        borderColor: 'blue'
    }
}

export default Ball;