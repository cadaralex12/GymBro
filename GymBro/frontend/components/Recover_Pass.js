import React, { useState } from 'react';
import { ImageBackground, View, TextInput, Button, Alert, StyleSheet, Image } from 'react-native';
import { httpsUrl } from '../constants/HttpUrl';


const PasswordRecoveryScreen = () => {
    const [email, setEmail] = useState('');

    const handleEmailChange = (text) => {
        setEmail(text);
        console.log('Email: ', text)
      };
  
    const handlePasswordRecovery = () => {
        
      fetch(`${httpsUrl}/password-recovery/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
        
      })
        .then((response) => response.json())
        .then((data) => {
          // Handle the response data
          //console.log(JSON.stringify({ email })),
          console.log('Response from backend:', data);
          Alert.alert('Success', data.message);
        })
        .catch((error) => {
          // Handle any errors
          console.error(error);
          Alert.alert('Error', 'Failed to initiate password recovery. Please try again.');
        });
    };

  return (
    <View style={{backgroundColor:'black'}}>
    <ImageBackground style={styles.image}>
    <Image source={require('.././images/logofinal.png') } style={styles.logo1}/>
      <TextInput
        style = {styles.input}
        placeholder="Email"
        value={email}
        onChangeText={handleEmailChange}
      />
      <Button
        
        color={'#444444'}
        title="Recover Password"
        onPress={handlePasswordRecovery}
      />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
    image: {
        resizeMode: 'cover',
        justifyContent: 'center',
        width: '100%',
        height: '100%'
      },
      input: {
        top:0,
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        color:"#000000",
        borderColor:"#ffffff",
        backgroundColor:"#ffffff"
      },
      logo1: {
        top: -20,
        left: 150,
        justifyContent: 'center',
        width: 100,
        height: 100
      },
  });

export default PasswordRecoveryScreen;
