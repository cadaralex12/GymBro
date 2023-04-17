import React from 'react';
import { useState , useEffect} from "react";
import { Text , FlatList, Alert, StyleSheet, SafeAreaView} from "react-native";
import {Card} from 'react-native-paper'
import { httpsUrl } from '../constants/HttpUrl';

function Print_Exercise({navigation, user_id}) {

  const [data, setData] = useState(null)

    useEffect (() => {
      fetch(`${httpsUrl}/exercise/print/`,{
        method:"POST",
        headers: {
          'Content-Type':'application/json'
        },
  
        body: JSON.stringify({id_for_user:user_id})
      })
      .then(resp => resp.json())
      .then(console.log(data))
      .then(data => {
        setData(data)
      })
      .catch(error => Alert.alert("erorr", error))
    }, []);

    const clickedItem = (data) => {
      navigation.navigate("Details", {data:data})
    }

    const renderData = (item) => {
      return (
        <Card style = {styles.cardstyle} onPress = {() => clickedItem(item)}>
          <Text style={{fontSize:25, color:'black'}}>{item.exercise_name} ➜</Text>
        </Card>
      )
    }

    return (
        <SafeAreaView style={styles.container}>
          <Text style={styles.baseText}>Gym
            <Text style={styles.innerText}>Bro </Text>
            </Text>
        <Text style={styles.text}>Your  
        <Text style={styles.innerText}> Exercises:</Text></Text>
        <FlatList 
          data = {data}
          renderItem = {({item}) => {
            console.log(item)
            return renderData(item)
          }}
          keyExtractor = {item => item.id}
        />
        </SafeAreaView>
      
    )
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'black',
      flex: 1,
      padding: 20,
    },
    item: {
      padding: 20,
      fontSize: 15,
      marginTop: 5,
    },
    cardstyle: {
      top: 20,
      backgroundColor: '#ffff3f',
      padding: 12,
      marginVertical: 10,
      marginHorizontal: 16,
      borderRadius: 6
      
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
  text: {
      top: 20,
      color: 'white',
      fontWeight: 'bold',
      fontSize:24,
  },
  });
  

export default Print_Exercise