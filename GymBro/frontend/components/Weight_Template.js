import React from 'react';
import { ImageBackground, StyleSheet, View, Text, TextInput} from 'react-native';
import {Button} from 'react-native-paper'

export default weight_template = ({img}) => {
  const [number0, onChangeNumber0] = React.useState(null);
    return (
    <View>
      <ImageBackground source={img} style={styles.image}>
      <Text style={styles.baseText}>Gym
        <Text style={styles.innerText}>Bro </Text>
      </Text>
      <Text style={styles.baseText}>
      <Text style={styles.innerText}>Your Weight History </Text>
      </Text>
      <TextInput
          maxLength={30}
          style={styles.input}
          onChangeText={onChangeNumber0}
          value={number0}
          placeholder="Your Current Weight (kg)"
          keyboardType="numeric"
        />
        <Button
                style={styles.button}
                buttonColor='yellow'
                textColor='black'
                textAlign='center'
                // icon = "update"
                mode = "contained"
                onPress = {() => props.navigation.navigate("Record Weight", {data:data})} >
            Add
            </Button>

      </ImageBackground>
    </View>
    )
}

const styles = StyleSheet.create({
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
  image: {
    resizeMode: 'cover',
    justifyContent: 'flex-start',
    width: '100%',
    height: '100%'
  },
  input: {
    top: 80,
    width:250,
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color:"#000000",
    borderColor:"#ffffff",
    backgroundColor:"#ffffff"
    
  },
  button: {
    borderRadius: 4,
    width: 120,
    height:52,
    left: '67%',
    top: '2.5%'
  },
});