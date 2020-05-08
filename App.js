import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Image,
  ImageBackground
} from 'react-native';

export default class animatedBasic extends Component {
  componentWillMount() {
    this.animatedValue = new Animated.Value(0);
    this.value = 0;
    this.animatedValue.addListener(({ value }) => {
      this.value = value;
    })
    this.frontInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg'],
    })
    this.backInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg']
    })
    this.frontOpacity = this.animatedValue.interpolate({
      inputRange: [89, 90],
      outputRange: [1, 0]
    })
    this.backOpacity = this.animatedValue.interpolate({
      inputRange: [89, 90],
      outputRange: [0, 1]
    })
  }

  flipCard() {
    if (this.value >= 90) {
      Animated.spring(this.animatedValue,{
        toValue: 0,
        friction: 8,
        tension: 10
      }).start();
    } else {
      Animated.spring(this.animatedValue,{
        toValue: 180,
        friction: 8,
        tension: 10
      }).start();
    }

  }

  render() {
    const frontAnimatedStyle = {
      transform: [
        { rotateY: this.frontInterpolate }
      ]
    }
    const backAnimatedStyle = {
      transform: [
        { rotateY: this.backInterpolate }
      ]
    }

    const tablePattern = require('./assets/table.jpeg');
    const cardFace = require('./assets/card-back.png');
    const cardBack = require('./assets/ace_diamonds.jpeg');

    return (
        <View style={styles.mainContainer}>
            <View style={styles.fullScreen}>
              <ImageBackground style={styles.backgroundImage} imageStyle={{resizeMode: 'repeat'}} source={{ uri: tablePattern }}/>
            </View>

            <View style={styles.contentContainer}>
                <View style={styles.cardContainer}>
                    <View>
                      <Animated.View style={[styles.flipCard, frontAnimatedStyle, {opacity: this.frontOpacity}]}>
                          <Image style={styles.flipImage} source={cardFace}/>
                      </Animated.View>
                      <Animated.View style={[styles.flipCard, styles.flipCardBack, backAnimatedStyle, {opacity: this.backOpacity}]}>
                          <Image style={styles.flipImage} source={cardBack}/>
                      </Animated.View>
                    </View>
                </View>
                <View style={styles.buttonArea}>
                    <TouchableOpacity style={styles.button} onPress={() => this.flipCard()}>
                        <Text style={{color:'white'}}>Flip!</Text>
                    </TouchableOpacity>
                </View>
            </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    contentContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'center'
    },
    cardContainer: {
        /*flex: 1,*/
        alignItems: "center",
        justifyContent: "center",
    },
    flipCard: {
        borderRadius:10,
        width: 200,
        height: 300,
        alignItems: 'center',
        justifyContent: 'center',
        backfaceVisibility: 'hidden',

        shadowColor: "#000",
        shadowOffset: {
        	width: 0,
        	height: 1,
        },

        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    flipCardBack: {
        backgroundColor: "gray",
        position: "absolute",
        top: 0,
    },
    flipImage: {
        borderRadius:10,
        width: 200,
        height: 300,
        overflow: "hidden",
    },
    fullScreen: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    },
    backgroundImage: {
        flex: 1
    },
    buttonArea: {
        alignItems: "center"
    },
    button: {
        alignItems: "center",
        backgroundColor: "#000",
        padding: 10,
        margin: 10,
        width: 200
    },
});
