import React from 'react';
import { Text , Alert, View, StyleSheet, Image,} from "react-native";
import {Button} from 'react-native-paper'
import { httpsUrl } from '../constants/HttpUrl';

function ExerciseDetails(props) {

    const data = props.route.params.data;

    const deleteData = () => {
        fetch(`${httpsUrl}/exercise/${data.id}/`,{
        method:"DELETE",
        headers: {
          'Content-Type':'application/json'
        }
      })
      .then(resp => {
      if (resp.ok)
      {
        console.log(data)
        props.navigation.navigate('Progress_History', {user_id:data.id_for_user})
      }
      else
      {
          Alert.alert("Incorect exercise template")
      }
    }) 
    }

    return (
        <View style = {styles.viewStyle}>
            <Text style={styles.baseText}>Gym
            <Text style={styles.innerText}>Bro </Text>
            </Text>
            <Text style = {styles.text}>
                Exercise Name: <Text style={styles.innerText}>{data.exercise_name} </Text> 
            </Text>
            <Text style = {styles.text}>
                Weight: <Text style={styles.innerText}>{data.weight} kg</Text> 
            </Text>
            <Text style = {styles.text}>
                Number of Sets: <Text style={styles.innerText}>{data.sets} </Text> 
            </Text>
            <Text style = {styles.text}>
                Number of Reps: <Text style={styles.innerText}>{data.reps} </Text> 
            </Text>
            <Image source={require('.././images/logofinal.png') } style={styles.logo}></Image>
            <View style = {styles.btnStyle}>
            <Button
                buttonColor='yellow'
                textColor='black'
                // icon = "update"
                mode = "contained"
                onPress = {() => props.navigation.navigate("Update", {data:data})} >
            EDIT
            </Button>

            <Button
                buttonColor='yellow'
                textColor='black'
                //icon = "delete"
                mode = "contained"
                onPress = {() => deleteData()} >
            DELETE
            </Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    viewStyle: {
        alignSelf: 'stretch',
        backgroundColor: 'black',
        height: '100%',
        width: '100%',
        resizeMode: 'cover'
    },
    btnStyle:{
        top: '80%',
        flexDirection:"row",
        justifyContent:"space-around",
        margin:10,
        padding:10,
        backgroundColor: 'black'
    },
    text: {
        left: 5,
        top:90,
        fontSize: 22,
        fontWeight: 'bold',
        color: 'white'
        
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
      logo: {
        top: 200,
        left: 160,
        justifyContent: 'center',
        width: 100,
        height: 100
      },
})

export default ExerciseDetails;