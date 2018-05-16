import React, { Component } from 'react';
import { View, Animated, TouchableOpacity, Text } from 'react-native';

class Deck extends Component {
    renderCards() {
        return this.props.data.map(item => {
            return this.props.renderCard(item);
            // return (
            //     <Text>{item.text}</Text>
            // )
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