import React, { useState, useEffect } from 'react';
import { ImageBackground, StyleSheet, View, Text, TextInput } from 'react-native';
import { Button } from 'react-native-paper';
import { httpsUrl } from '../constants/HttpUrl';
import { VictoryChart, VictoryLine, VictoryAxis } from 'victory-native';

export default weight_template = ({ img, navigation, username, user_id }) => {
  const [number0, onChangeNumber0] = React.useState(null);
  const [weightData, setWeightData] = useState([]);
  const currentDate = new Date().toISOString().split('T')[0];

  useEffect(() => {
    fetch(`${httpsUrl}/weight-data/?user_id=${user_id}`)
      .then(response => response.json())
      .then(data => {
        const processedData = data.map(entry => ({
          weight: entry.weight,
          date: new Date(entry.date_added),
        }));
        setWeightData(processedData);
      })
      .catch(error => {
        console.log('Error:', error);
      });
  }, []);
  
  
  

  const addWeight = () => {
    fetch(`${httpsUrl}/weight/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ weight: number0, user_id: user_id, date_added: currentDate }),
    })
      .then(response => {
        if (response.ok) {
          console.log('Weight added successfully');
          navigation.navigate('Weight_History', { username: username, user_id: user_id });
        } else {
          console.log('Error:', response.status);
        }
      })
      .catch(error => {
        console.log('Error:', error);
      });
  };

  return (
    <View>
      <ImageBackground source={img} style={styles.image}>
        <Text style={styles.baseText}>
          Gym<Text style={styles.innerText}>Bro </Text>
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
        <Button style={styles.button} buttonColor="yellow" textColor="black" textAlign="center" onPress={addWeight}>
          Add
        </Button>
        <VictoryChart
  style={{
    parent: { backgroundColor: '#000000' },
  }}
>
  <VictoryAxis
    dependentAxis
    label="Weight"
    style={{ axisLabel: { padding: 30 }, axis:{stroke: 'white'}, tickLabels: { fontSize: 10, fill:'white' } }}
    domain={{ y: [40, 120] }} 
  />
  <VictoryAxis
  label="Date"
  tickFormat={(date) => new Date(date).toLocaleDateString()}
  style={{ axisLabel: { padding: 30 }, tickLabels: { fontSize: 10, fill:'white' }, axis:{stroke: 'white'} }}
/>

  <VictoryLine
    data={weightData}
    x="date"
    y="weight"
    style={{
      data: { stroke: 'yellow' }, // Change the color to red
    }}
  />
</VictoryChart>

      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  baseText: {
    top: 30,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
  },
  innerText: {
    color: 'yellow',
  },
  image: {
    resizeMode: 'cover',
    justifyContent: 'flex-start',
    width: '100%',
    height: '100%',
  },
  input: {
    top: 65,
    width: 250,
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: '#000000',
    borderColor: '#ffffff',
    backgroundColor: '#ffffff',
  },
  button: {
    borderRadius: 4,
    width: 120,
    height: 52,
    left: '67%',
    top: '0 %',
  },
});
