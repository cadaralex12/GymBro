import React from 'react';
import { View, StyleSheet, Image, TextInput, Alert, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { httpsUrl } from '../constants/HttpUrl';

const logobun_image = require('.././images/logobun.png') ;

const ExerciseUpdate = (props) => {

    const data = props.route.params.data;
    const [weight, onChangeNumber1] = React.useState(data.weight)
    const [sets, onChangeNumber2] = React.useState(data.sets)
    const [reps, onChangeNumber3] = React.useState(data.reps)

  const updateExercise = () => {
      fetch(`${httpsUrl}/exercise/${data.id}/`,{
        method:"PUT",
        headers: {
          'Content-Type':'application/json'
        },

        body: JSON.stringify({exercise_name:data.exercise_name, weight:weight, sets:sets, reps:reps})
      })
      .then(resp => {
      if (resp.ok)
      {
        console.log(data)
        props.navigation.navigate('Progress_History',{user_id:data.id_for_user})
      }
      else
      {
          Alert.alert("Incorect exercise template")
      }
    })
  }


    return (
      <View style={styles.container}>
        <Text style={styles.baseText}>Gym
            <Text style={styles.innerText}>Bro </Text>
            </Text>
        <TextInput
          style={styles.input}
          value={weight}
          placeholder="Weight"
          keyboardType="numeric"
          onChangeText={onChangeNumber1}
        />
        <View style={styles.view_style}>
          <TextInput
            style={styles.sets_input}
            onChangeText={onChangeNumber2}
            value={sets}
            placeholder="Sets"
            keyboardType="numeric"
          />
          <Image
            source = {logobun_image}
            style={styles.small_logo}
            />
          <TextInput
            style={styles.reps_input}
            onChangeText={onChangeNumber3}
            value={reps}
            placeholder="Reps"
            keyboardType="numeric"
          />
            </View>
            <Button
            buttonColor = 'yellow'
            textColor = 'black'
            icon = "update"
            mode = "contained"
            onPress = {() => updateExercise()} >
            Update Exercise
            </Button>
      </View>
    )
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'black',
      paddingHorizontal: 10
    },
    input: {
      top:15,
      left: 10,
      height: 40,
      width: 350,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      color:"#000000",
      borderColor:"#ffffff",
      backgroundColor:"#ffffff"
    },
    sets_input: {
      top:30,
      height: 100,
      width:100,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      color:"#000000",
      borderColor:"#ffffff",
      backgroundColor:"#ffffff"
    },
    reps_input: {
      top:30,
      height: 100,
      width:100,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      color:"#000000",
      borderColor:"#ffffff",
      backgroundColor:"#ffffff"
    },
    view_style: {
      flex: 1,
      flexDirection:'row',
      backgroundColor:'black',
      paddingHorizontal: 10
    },
    small_logo:{
      top:30,
      margin: 12,
      width: 100,
      height: 100,
  },
  baseText: {
    top: 10,
    color: 'white',
    fontWeight: 'bold',
    fontSize:24,
    textAlign: 'center'
},
innerText: {
    color: 'yellow'
  },
  });

  export default ExerciseUpdate;