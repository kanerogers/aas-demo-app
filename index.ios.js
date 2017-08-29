/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  TouchableOpacity,
  Dimensions,
  Image,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  LayoutAnimation,
} from 'react-native';
import * as firebase from 'firebase';
import twitter from 'react-native-twitter';

var config = {
  apiKey: 'AIzaSyBkYlzxcFIxrdNWWBE2bgIPi7fXYSntfSM',
  authDomain: 'aas-demo.firebaseapp.com',
  databaseURL: 'https://aas-demo.firebaseio.com',
  projectId: 'aas-demo',
  storageBucket: '',
  messagingSenderId: '499087202872',
};
firebase.initializeApp(config);

const { width } = Dimensions.get('window');

const { rest } = twitter({
  consumerKey: 'Zau5AjveWUQ6GFGAIgPSsoX3G',
  consumerSecret: 'yuUa9KLBjgNCiMT1Lg74SgD8PyYavYLP9y50nG7J39mQC2Bb28',
  accessToken: '364098981-oXLka7sQEYqgAoi0u5OgHgx8HFHp2MKXaxVvCGSM',
  accessTokenSecret: 'tbmkKVIJX3VDUGWcsNIMjwjPacmfoB9eqF8dW1u0JxzNg',
});

const sendTweet = status =>
  rest.post('statuses/update', { status }).then(() => alert('Tweet sent!'));

const Alert = ({ title, tweet }) =>
  <View style={{ marginTop: 16 }}>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <View>
        <Text style={styles.header}>
          {title}
        </Text>
        <Text style={styles.text}>
          {tweet}
        </Text>
      </View>

      <Button title="Tweet" color="#046a38" onPress={() => sendTweet(tweet)} />
    </View>
    <View style={styles.divider} />
  </View>;

export default class demoApp extends Component {
  constructor() {
    super();
    this.state = {
      alerts: [],
    };
  }

  componentDidMount() {
    firebase.database().ref('alerts').on('value', snapshot => {
      const alerts = Object.keys(snapshot.val()).map(key => ({
        ...snapshot.val()[key],
        key,
      }));

      this.setState({
        alerts: alerts.reverse(),
      });

      LayoutAnimation.spring();
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={require('./thl.png')} />

        <View style={styles.alerts}>
          {this.state.alerts.map(a => <Alert key={a.id} {...a} />)}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 64,
    flex: 1,
    alignItems: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  alerts: {
    flex: 1,
    width: width - 64,
    padding: 32,
    marginHorizontal: 16,
    marginTop: 32,
    marginBottom: 16,
    backgroundColor: '#EEEEEE',
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
  },
  divider: {
    marginTop: 8,
    height: 0.33,
    backgroundColor: '#BBB',
  },
});

AppRegistry.registerComponent('demoApp', () => demoApp);
