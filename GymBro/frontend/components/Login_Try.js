import React , {useEffect, useState} from 'react';
import { ImageBackground, Image, StyleSheet, View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import Account_Button from './Account_Button';
import Forgot_Button from './Forgot_Pass';
import { httpsUrl } from '../constants/HttpUrl';
import { LoginButton, AccessToken } from 'react-native-fbsdk';



export default login_template_Button = ({navigation, Button_name}) => {
  const [my_email, onChangeNumber1] = React.useState(null);
  const [my_password, onChangeNumber2] = React.useState(null);

  const [user, setUser] = useState({
    id:"",
    email:"",
    username: "",
    password: "",
});

sendAccessTokenToBackend = accessToken => {
  fetch(`${httpsUrl}/users/login/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ accessToken }),
  })
    .then(response => response.json())
    .then(data => {
      // Handle the response
      console.log('Response from backend:', data);
      navigation.navigate('Record_Workout', {username:data.username, user_id:data.id})
    })
    .catch(error => {
      console.log('Error sending fb access token to backend:', error);
    });
};


  function LoginUser() {
    fetch(`${httpsUrl}/users/login/`,{
      method:"POST",
      headers: {
        'Content-Type':'application/json'
      },

      body: JSON.stringify({email:my_email, password:my_password})
    })
    .then((response) => response.json())
    .then((responseData) => {
      console.log(responseData)
      console.log(responseData.username)
      if ( responseData.username )
      {
        navigation.navigate('Record_Workout', {username:responseData.username, user_id:responseData.id})
        return responseData
      }
      else
      {
        Alert.alert("Username or password are incorrect!Try again.")
      }
    })
    // .catch(error => Alert.alert("Username or password are incorrect!Try again.",error))
  //   .then(json => setUser(json))
  //   .then(console.log(user.username))
  //   .then(console.log(user.id))
  //   .then( resp => {if (user.username) {
  //     navigation.navigate('Record_Workout', {username:user.username, user_id:user.id})
  // }})
  //   .catch(error => Alert.alert("Username or password are incorrect!Try again.",error))
    }

    return (
    <View style={{backgroundColor:'black'}}>
      <ImageBackground style={styles.image}>
      <Image source={require('.././images/logofinal.png') } style={styles.logo1}/>
      <TextInput
          style={styles.input}
          onChangeText={onChangeNumber1}
          value={my_email}
          placeholder="Phone/Email"
        />
      <TextInput
          secureTextEntry={true}
          style={styles.input}
          onChangeText={onChangeNumber2}
          value={my_password}
          placeholder="Password"
        />
        <View style={styles.container}>
        <TouchableOpacity
            style={styles.loginButton}
            onPress={() => {LoginUser()}}
        >
        <Text style={styles.testwst}>{Button_name}</Text>
        </TouchableOpacity>
        
        </View>
        <LoginButton
          onLoginFinished={(error, result) => {
          if (error) {
            // Handle error during login
            console.log('Facebook login error:', error);
          } else if (result.isCancelled) {
            // Handle login cancellation
            console.log('Facebook login cancelled');
          } else {
            // Login successful
            AccessToken.getCurrentAccessToken().then(data => {
              const accessToken = data.accessToken.toString();
              // Send the accessToken to your Django backend
              this.sendAccessTokenToBackend(accessToken);
            });
          }
        }}
        onLogoutFinished={() => {
          // Handle logout event
          console.log('Facebook logout');
        }}
      />
        <Image source={require('.././images/google.png') } style={styles.logo3}/>
        <Forgot_Button button_name={'Forgot Password?'} navigation={navigation}></Forgot_Button>
        <Account_Button button_name={'Don`t have an account?'} navigation={navigation}>
        </Account_Button>
      </ImageBackground>
    </View>
    )
}

const styles = StyleSheet.create({
  image: {
      resizeMode: 'cover',
      justifyContent: 'center',
      width: '100%',
      height: '100%'
    },
    logo1: {
      top: 100,
      left: 150,
      justifyContent: 'center',
      width: 100,
      height: 100
    },
    logo2: {
      top: 0,
      left: 160,
      justifyContent: 'center',
      width: 30,
      height: 30
    },
    logo3: {
      top: -32,
      left: 200,
      justifyContent: 'center',
      width: 37,
      height: 37
    },
  text: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  input: {
    top: 180,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color:"#000000",
    borderColor:"#ffffff",
    backgroundColor:"#ffffff"
  },
  arrow_button:{
    width: 140,
    height: 50,
    left: 30,
    top: -10,
    justifyContent: "center", 
    alignContent: "center",
    backgroundColor: "#00000000",
    color: "#00000000",
    borderRadius: 10
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10
  },
  countContainer: {
    alignItems: "center",
    padding: 10
  },
  loginButton:{
      width: 386,
      height: 40,
      left: 0,
      top: 80,
      justifyContent: "center", 
      alignContent: "center",
      backgroundColor: "#ffff00",
    },
    testwst: {
        left: 140,
        alignContent: "center",
        fontWeight: "bold", 
        color: "#000000", 
        fontSize: 28
    },
});