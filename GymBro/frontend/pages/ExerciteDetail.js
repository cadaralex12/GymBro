import React, { useEffect, useState } from 'react';
import { Text, Alert, View, StyleSheet, Image } from 'react-native';
import { Button } from 'react-native-paper';
import { httpsUrl } from '../constants/HttpUrl';

function ExerciseDetails(props) {
  const data = props.route.params.data;
  const [progress, setProgress] = useState(null);

  const deleteData = () => {
    fetch(`${httpsUrl}/exercise/${data.id}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((resp) => {
        if (resp.ok) {
          console.log(data);
          props.navigation.navigate('Progress_History', { user_id: data.id_for_user });
        } else {
          Alert.alert('Incorrect exercise template');
        }
      });
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString).toLocaleDateString(undefined, options);
    return date;
  };

  const fetchExerciseProgress = () => {
    fetch(`${httpsUrl}/exercise/progress/${data.exercise_name}?user_id=${data.id_for_user}`)
      .then((response) => response.json())
      .then((data) => {
        setProgress(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  

  useEffect(() => {
    fetchExerciseProgress();
  }, []);

  return (
    <View style={styles.viewStyle}>
      <Text style={styles.baseText}>
        Gym
        <Text style={styles.innerText}>Bro </Text>
      </Text>
      <Text style={styles.text}>
        Exercise Name: <Text style={styles.innerText}>{data.exercise_name}</Text>
      </Text>
      <Text style={styles.text}>
        Weight: <Text style={styles.innerText}>{data.weight} kg</Text>
      </Text>
      <Text style={styles.text}>
        Number of Sets: <Text style={styles.innerText}>{data.sets}</Text>
      </Text>
      <Text style={styles.text}>
        Number of Reps: <Text style={styles.innerText}>{data.reps}</Text>
      </Text>
      <Text style={styles.text}>
        Date Recorded: <Text style={styles.innerText}>{formatDate(data.date)}</Text>
        </Text>
        {progress && (
        <View>
          <Text style={styles.progressText}><Text style={styles.innerText}>Progress compared to other entries:</Text></Text>
          <Text style={styles.progressText}>Maximum Weight: <Text style={styles.innerText}> {progress.maxWeight} kg</Text></Text>
          <Text style={styles.progressText}>Minimum Weight: <Text style={styles.innerText}> {progress.minWeight} kg</Text></Text>
          <Text style={styles.progressText}>Average Weight: <Text style={styles.innerText}> {progress.avgWeight} kg</Text></Text>
        </View>
      )}
      
      <Image source={require('.././images/logofinal.png')} style={styles.logo} />
      <View style={styles.btnStyle}>
        <Button
          buttonColor="yellow"
          textColor="black"
          mode="contained"
          onPress={() => props.navigation.navigate('Update', { data: data })}
        >
          EDIT
        </Button>

        <Button buttonColor="yellow" textColor="black" mode="contained" onPress={() => deleteData()}>
          DELETE
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewStyle: {
    alignSelf: 'stretch',
    backgroundColor: 'black',
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
  btnStyle: {
    top: '80%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 10,
    padding: 10,
    backgroundColor: 'black',
  },
  text: {
    left: 5,
    top: 90,
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  progressText: {
    left: 5,
    top: 90,
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  baseText: {
    top: 40,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
  },
  innerText: {
    color: 'yellow',
  },
  logo: {
    top: 200,
    left: 160,
    justifyContent: 'center',
    width: 100,
    height: 100,
  },
});

export default ExerciseDetails;
