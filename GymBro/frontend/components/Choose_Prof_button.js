import React from 'react';
import { ImageBackground, StyleSheet, View, Text, TextInput, TouchableOpacity} from 'react-native';

export default Choose_prof_button = ({navigation, img, button_name}) => {
  const [number0, onChangeNumber0] = React.useState(null);
  const [number1, onChangeNumber1] = React.useState(null);
  
    return (
    <View>
      <ImageBackground source={img} style={styles.image}>
      <Text style={styles.baseText}>Gym
        <Text style={styles.innerText}>Bro </Text>
      </Text>
      <Text style={styles.genderStyle}> Choose your gender </Text>
      <TextInput
          style={styles.input}
          onChangeText={onChangeNumber0}
          value={number0}
          placeholder="Gender"
        />
      <TextInput
          style={styles.input}
          onChangeText={onChangeNumber1}
          value={number1}
          placeholder="Weight"
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeNumber1}
          value={number1}
          placeholder="Height"
          keyboardType="numeric"
        />
        
        {/* <Text style={{ color: 'white', top: 120, fontSize: 12} }>    By continuing you accept our Privacy Policy</Text> */}
        <TouchableOpacity
            style={styles.registerButton}
            onPress={() =>
                navigation.navigate('Login')
                    }
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
  text: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  genderStyle: {
    top: 60,
    color: 'white',
    fontWeight: 'bold',
    fontSize:18,
    textAlign: 'center'
  },
  input: {
    top: 80,
    height: 70,
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
    top: 200,
    justifyContent: "center", 
    alignContent: "center",
    backgroundColor: "#ffff00",
  },
  testwst: {
    left: 110,
    alignContent: "center",
    fontWeight: "bold", 
    color: "#000000", 
    fontSize: 28
},
});