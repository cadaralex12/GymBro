import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Alert, ScrollView, Modal } from 'react-native';
import { httpsUrl } from '../constants/HttpUrl';

const logofinal_image = require('.././images/logofinal.png');
const logobun_image = require('.././images/logobun.png');

const Exercise = ({ navigation, route }) => {
  const [number1, onChangeNumber1] = useState(null);
  const [number2, onChangeNumber2] = useState(null);
  const [number3, onChangeNumber3] = useState(null);
  const [number4, onChangeNumber4] = useState(null);
  const { username, user_id, exerciseName, muscle, difficulty } = route.params;
  const currentDate = new Date().toISOString().split('T')[0];
  const [similarExercises, setSimilarExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    onChangeNumber1(route.params.exerciseName);
  }, []);

  useEffect(() => {
    const fetchSimilarExercises = async () => {
      try {
        const response = await fetch(`https://api.api-ninjas.com/v1/exercises?muscle=${muscle}&difficulty=${difficulty}`, {
          headers: {
            'X-Api-Key': 'kbsYXWFOCaLT1/F8qkcYyQ==Ci6bZf7TUE1KWUdH',
          },
        });
        if (response.ok) {
          const data = await response.json();
          const limitedExercises = data.filter((exercise) => exercise.name !== exerciseName).slice(0, 3);
          setSimilarExercises(limitedExercises);
        } else {
          console.log('Error:', response.status);
        }
      } catch (error) {
        console.log('Error:', error);
      }
    };
  
    fetchSimilarExercises();
  }, [muscle, exerciseName]);

  const InsertExercise = () => {
    fetch(`${httpsUrl}/exercise/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ exercise_name: number1, weight: number4, sets: number3, reps: number2, id_for_user: user_id, date: currentDate }),
    })
      .then(resp => {
        if (resp.ok) {
          console.log(route.params.user_id);
          navigation.navigate('Record_Workout', { username: username, user_id: user_id });
        } else {
          console.log(user_id);
          console.log(username);
          console.log(exerciseName)
          console.log(muscle)
            
          Alert.alert('Incorrect exercise template');
        }
      });
  };

  const formatAPIdata = (equipment) => {
    return equipment.replace(/_/g, ' ');
  };

  const handleInfoButtonPress = (exercise) => {
    Alert.alert('Exercise Information', exercise.instructions);
  };

  const selectExercise = (exerciseName) => {
    onChangeNumber1(exerciseName);
    setModalVisible(false);
    setSelectedExercise(null);
  };
  

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title_text}>
        {muscle} <Text style={styles.text2}>Exercise</Text>
      </Text>
      <TextInput maxLength={60} style={styles.input} onChangeText={onChangeNumber1} value={number1} defaultValue={exerciseName} />
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
        <Image source={logobun_image} style={styles.small_logo} />
        <TextInput
          maxLength={4}
          style={styles.reps_input}
          onChangeText={onChangeNumber3}
          value={number3}
          placeholder="Reps"
          keyboardType="numeric"
        />
      </View>
      <TouchableOpacity style={styles.button_submit} onPress={InsertExercise}>
        <Text style={styles.testwst}>Submit</Text>
      </TouchableOpacity>

      <View style={styles.similarExercisesContainer}>
        <Text style={styles.similarExercisesTitle}>If your Gym does not have the necessary equipment, or the equipment is currently busy, you can try these exercises which target the same movement:</Text>
        <View style={styles.separatorLine} />
        {similarExercises.map((exercise, index) => {
          if (exercise.name === number1) {
            return null;
          }
          return (
            <TouchableOpacity
              key={index}
              style={styles.exerciseContainer}
              onPress={() => selectExercise(exercise.name)}
            >
              <Text style={styles.exerciseName}>{exercise.name}</Text>
              <TouchableOpacity
                style={styles.infoButton}
                onPress={() => handleInfoButtonPress(exercise)}
              >
                <Text style={styles.infoButtonText}>i</Text>
              </TouchableOpacity>
              <Text style={styles.exerciseDeets}>Equipment Needed:</Text>
              <Text style={styles.exerciseDeetsWhite}>{formatAPIdata(exercise.equipment)}</Text>
              <Text style={styles.exerciseDeets}>Difficulty Level:</Text>
              <Text style={styles.exerciseDeetsWhite}>{exercise.difficulty}</Text>
              <Text style={styles.exerciseDeets}>Exercise Type:</Text>
              <Text style={styles.exerciseDeetsWhite}>{exercise.type}</Text>
              <View style={styles.separatorLine} />
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'black',
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  title_text: {
    textTransform: 'capitalize',
    fontSize: 30,
    color: 'yellow',
    alignSelf: 'center',
    marginBottom: 10,
    fontWeight: 'bold'
  },
  text2: {
    fontSize: 30,
    color: 'white',
  },
  big_loggo: {
    alignSelf: 'center',
    width: 150,
    height: 150,
  },
  button_submit: {
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffff00',
    borderRadius: 10,
    height: 60,
    width: 360,
    marginTop: 20,
    marginBottom: 100,
  },
  testwst: {
    alignSelf: 'center',
    fontWeight: 'bold',
    color: '#000000',
    fontSize: 30,
  },
  input: {
    fontSize: 18,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: '#000000',
    borderColor: '#ffffff',
    backgroundColor: '#ffffff',
  },
  sets_input: {
    left: -10,
    textAlign: 'center',
    fontSize: 30,
    height: 100,
    width: 100,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: '#000000',
    borderColor: '#ffffff',
    backgroundColor: '#ffffff',
  },
  reps_input: {
    left: -10,
    textAlign: 'center',
    fontSize: 30,
    height: 100,
    width: 100,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: '#000000',
    borderColor: '#ffffff',
    backgroundColor: '#ffffff',
  },
  view_style: {
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  small_logo: {
    margin: 12,
    width: 100,
    height: 100,
  },
  similarExercisesContainer: {
    marginTop: 20,
  },
  similarExercisesTitle: {
    fontSize: 16,
    //fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  exerciseContainer: {
    paddingVertical: 10,
  },
  exerciseName: {
    color: 'white',
    textTransform: 'uppercase',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  exerciseDeets: {
    color: 'yellow',
    fontWeight: 'bold',
    textTransform: 'capitalize',
    fontSize: 20,
    lineHeight: 20,
    marginBottom: 6,
  },
  exerciseDeetsWhite: {
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'capitalize',
    fontSize: 20,
    lineHeight: 20,
  },
  separatorLine: {
    height: 1,
    backgroundColor: 'yellow',
    marginVertical: 10,
  },
  infoButton: {
    position: 'absolute',
    top: 35,
    right: 10,
    width: 24,
    height: 24,
    backgroundColor: 'black',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'yellow',
    borderWidth: 1,
  },
  infoButtonText: {
    color: 'yellow',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: 'yellow',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'black',
    fontSize: 16,
  },
});

export default Exercise;
