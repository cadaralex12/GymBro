import React from 'react';
import { ImageBackground, Alert, StyleSheet, View, Text, TextInput, TouchableOpacity} from 'react-native';
import { httpsUrl } from '../constants/HttpUrl';

export default register_template_Button = ({navigation, img, button_name}) => {
  const [number0, onChangeNumber0] = React.useState(null);
  const [number1, onChangeNumber1] = React.useState(null);
  const [number2, onChangeNumber2] = React.useState(null);
  const [number3, onChangeNumber3] = React.useState(null);

  const InsertUser = () => {
    fetch(`${httpsUrl}/users/`,{
      method:"POST",
      headers: {
        'Content-Type':'application/json'
      },

      body: JSON.stringify({email:number0, username:number2, password:number3})
    })
    .then(resp => {
      if (resp.ok)
      {
          navigation.navigate('Login')
      }
      else
      {
          Alert.alert("Error")
      }
  })
}

    return (
    <View>
      <ImageBackground source={img} style={styles.image}>
      <Text style={styles.baseText}>Gym
        <Text style={styles.innerText}>Bro </Text>
      </Text>
      <TextInput
          maxLength={30}
          style={styles.input}
          onChangeText={onChangeNumber0}
          value={number0}
          placeholder="Email"
        />
      <TextInput
          maxLength={15}
          style={styles.input}
          onChangeText={onChangeNumber1}
          value={number1}
          placeholder="Phone"
          keyboardType="numeric"
        />
      <TextInput
          maxLength={15}
          style={styles.input}
          onChangeText={onChangeNumber2}
          value={number2}
          placeholder="Username"
        />
        <TextInput
          maxLength={15}
          secureTextEntry={true}
          style={styles.input}
          onChangeText={onChangeNumber3}
          value={number3}
          placeholder="Password"
        />
        
        <Text style={{ color: 'white', top: 120, fontSize: 12} }>    By continuing you accept our Privacy Policy</Text>
        <TouchableOpacity
            style={styles.registerButton}
            onPress={() =>InsertUser()}
            // onPress={() =>
            //   navigation.navigate("Choose_Profile")
            //       }
        >
        <Text style={styles.testwst}>{button_name}</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
    )
}

const styles = StyleSheet.create({
  image: {
      resizeMode: 'cover',
      justifyContent: 'flex-start',
      width: '100%',
      height: '100%'
    },

  input: {
    top: 80,
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color:"#000000",
    borderColor:"#ffffff",
    backgroundColor:"#ffffff"
    
  },
  baseText: {
    top: 40,
    color: 'white',
    fontWeight: 'bold',
    fontSize:24,
    textAlign: 'center'
},
innerText: {
    color: 'yellow'
  },

  registerButton:{
    width: 380,
    height: 40,
    left: 10,
    top: 230,
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