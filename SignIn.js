import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  TextInput,
  Image,
  View,
  Pressable,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function SignIn({ navigation }) {
  const [mobile, setMobile] = useState(null);
  const [password, setPassword] = useState(null);

  const ui = (
    <SafeAreaView style={styles.signIpMain}>

      <Text style={styles.signInText}>Welcome to ChatPilot</Text>

      <Image
        source={require("./images/welcome-img.png")}
        style={styles.signInImage}
      />

      <View style={styles.signInView1}>
        <Icon name="mobile" style={styles.signInIcon1} />
        <TextInput
          style={styles.signInInput1}
          autoCorrect={false}
          inputMode={'numeric'}
          maxLength={10}
          placeholder={'Your Mobile'}
          onChangeText={setMobile}
        />
      </View>

      <View style={styles.signInView1}>
        <Icon name="lock" style={styles.signInIcon1} />
        <TextInput
          style={styles.signInInput1}
          secureTextEntry={true}
          placeholder={'Your Password'}
          onChangeText={setPassword}
        />
      </View>

      <Pressable style={styles.signInButton1} onPress={signInProcess}>
        <Text style={styles.signInText1}>Sign In</Text>
      </Pressable>
      <Pressable style={styles.signInButton2}>
        <Text style={styles.signInText1} onPress={signUpProcess}>New User? Go to Sign Up</Text>
      </Pressable>
    </SafeAreaView>
  );

  function signInProcess() {
    var jsRequestObject = { mobile: mobile, password: password };
    var jsonRequestText = JSON.stringify(jsRequestObject);

    var formData = new FormData();
    formData.append('jsonRequestText', jsonRequestText);

    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (request.readyState == 4 && request.status == 200) {
        var jsonResponseText = request.responseText;
        var jsResponseObject = JSON.parse(jsonResponseText);

        if (jsResponseObject.msg == 'Error') {
          Alert.alert('Message', 'Invalid Details');
        } else {
          var userObject = jsResponseObject.user;
          AsyncStorage.setItem('user', JSON.stringify(userObject));

          // Navigate to Home
          navigation.navigate('Home');

        }
      }
    };

    request.open('POST', 'http://10.0.2.2/chat_pilot/signIn.php', true);
    request.send(formData);
  }

  function signUpProcess() {

    // Navigate to Home
    navigation.navigate('Sign Up');

  }

  return ui;
}

const styles = StyleSheet.create({
  signInText: {
    color: "#075e54",
    fontSize: 24,
    marginBottom: 20,
  },
  signIpMain: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    backgroundColor: "white",
  },
  signInText1: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white',
  },
  signInButton1: {
    width: '80%',
    height: 50,
    backgroundColor: '#303030',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInButton2: {
    width: '80%',
    height: 50,
    backgroundColor: '#01d56a',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInMain: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  signInImage: {
    width: 180,
    height: 180,
    borderRadius: 50,
  },
  signInView1: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  signInIcon1: {
    fontSize: 30,
    position: 'absolute',
    start: -20,
    bottom: 10,
    left: -25,
  },
  signInInput1: {
    width: '60%',
    borderBottomWidth: 2,
    fontSize: 20,
    borderBottomColor: "#128c7e",
    textAlign: 'center'
  },
});