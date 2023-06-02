import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import { httpsUrl } from '../constants/HttpUrl';

const logofinal_image = require('.././images/logofinal.png') ;
const logobun_image = require('.././images/logobun.png') ;

const Exercise = ({navigation, route}) => {
  const [number1, onChangeNumber1] = React.useState(null);
  const [number2, onChangeNumber2] = React.useState(null);
  const [number3, onChangeNumber3] = React.useState(null);
  const [number4, onChangeNumber4] = React.useState(null);
  const { username, user_id, exerciseName, muscle } = route.params;

  React.useEffect(() => {
    onChangeNumber1(route.params.exerciseName);
  }, []);


  const InsertExercise = () => {
      fetch(`${httpsUrl}/exercise/`,{
        method:"POST",
        headers: {
          'Content-Type':'application/json'
        },

        body: JSON.stringify({exercise_name:number1, weight:number4, sets:number3, reps:number2, id_for_user:user_id})
      })
      .then(resp => {
      if (resp.ok)
      {
        console.log(route.params.user_id)
          navigation.navigate('Record_Workout', {username:username, user_id:user_id})
      }
      else
      {
          console.log(user_id)
          console.log(username)
          //console.log(exerciseName)
          //console.log(muscle)

          Alert.alert("Incorect exercise template")
      }
    })
  }


    return (
      <View style={styles.container}>
        <Text style={styles.title_text}>
            {muscle} <Text style={styles.text2}>Exercise
        </Text>
        </Text>
        <TextInput
          maxLength={20}
          style={styles.input}
          onChangeText={onChangeNumber1}
          value={number1}
          defaultValue={exerciseName}
        />
        <TextInput
          maxLength={4}
          style={styles.input}
          onChangeText={onChangeNumber4}
          value={number4}
          placeholder="Weight (kg)"
          keyboardType="numeric"
        />
        <View style={styles.view_style}>
          <TextInput
            maxLength={4}
            style={styles.sets_input}
            onChangeText={onChangeNumber2}
            value={number2}
            placeholder="Sets"
            keyboardType="numeric"
          />
          <Image
            source = {logobun_image}
            style={styles.small_logo}
            />
          <TextInput
            maxLength={4}
            style={styles.reps_input}
            onChangeText={onChangeNumber3}
            value={number3}
            placeholder="Reps"
            keyboardType="numeric"
          />
        </View>
        <TouchableOpacity
            style={styles.button22}
            onPress={() => InsertExercise()}
        >
        <Text style={styles.testwst}>Submit</Text>
        </TouchableOpacity>

        <Image
            source = {logofinal_image}
            style={styles.big_loggo}
            />
      </View>
    )
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'black',
      paddingHorizontal: 10
    },
    title_text:{
        fontSize:30,
        color:"yellow",
        left:90,
        right:20,
        justifyContent: "center"
    },
    text2:{
      fontSize:30,
      color:"white",
      left:40,
      right:20,
      justifyContent: "center"
  },
    big_loggo:{
        left:120,
        width: 150,
        height: 150,
    },
    button22:{
        left: 15,
        top: -150,
        justifyContent: "center", 
        backgroundColor: "#ffff00",
        borderRadius: 10,
        height: 60,
        width: 360
      },
    testwst: {
        justifyContent: "center",
        left:140,
        fontWeight: "bold", 
        color: "#000000", 
        fontSize: 30
    },
    input: {
      fontSize: 18,
      left: 10,
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      color:"#000000",
      borderColor:"#ffffff",
      backgroundColor:"#ffffff"
    },
    sets_input: {
      textAlign: 'center',
      fontSize: 30,
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
      textAlign: 'center',
      fontSize: 30,
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
      margin: 12,
      width: 100,
      height: 100,
  },
  });

  export default Exercise;