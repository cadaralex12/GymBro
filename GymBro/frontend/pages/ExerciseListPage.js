import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, ScrollView, Text, Alert } from 'react-native';

const ExerciseListPage = ({navigation, route}) => {
  const { name, username, user_id } = route.params;
  const [muscle, setMuscle] = useState(name);
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await fetch(`https://api.api-ninjas.com/v1/exercises?muscle=${muscle}`, {
          headers: {
            'X-Api-Key': 'kbsYXWFOCaLT1/F8qkcYyQ==Ci6bZf7TUE1KWUdH',
          },
        });
        if (response.ok) {
          const data = await response.json();
          setExercises(data);
        } else {
          console.log('Error:', response.status);
        }
      } catch (error) {
        console.log('Error:', error);
      }
    };

    fetchExercises();
  }, [muscle]);

  const handleInfoButtonPress = (exercise) => {
    Alert.alert('Exercise Information', exercise.instructions);
  };

  const formatAPIdata = (equipment) => {
    return equipment.replace(/_/g, ' ');
  };

  const handleExercisePress = (exercise) => {
    navigation.navigate('Exercise', {username:username, user_id:user_id, exerciseName: exercise.name, muscle});
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {exercises.map((exercise, index) => (
        <TouchableOpacity
        key={index}
        style={styles.exerciseContainer}
        onPress={() => handleExercisePress(exercise)}
      >
            <Text style={styles.exerciseName}> {exercise.name}</Text>
            <Text style={styles.exerciseDeetsWhite}> Equipment Needed:
            <Text style={styles.exerciseDeets}> {formatAPIdata(exercise.equipment)}</Text></Text>
            <Text style={styles.exerciseDeetsWhite}> Difficulty Level:
            <Text style={styles.exerciseDeets}> {exercise.difficulty}</Text></Text>
            <Text style={styles.exerciseDeetsWhite}> Exercise Type:
            <Text style={styles.exerciseDeets}> {formatAPIdata(exercise.type)}</Text></Text>
            <TouchableOpacity
              style={styles.infoButton}
              onPress={() => handleInfoButtonPress(exercise)}
            >
              <Text style={styles.infoButtonText}>i</Text>
            </TouchableOpacity>
        
          {index !== exercises.length - 1 && <View style={styles.separatorLine} />}
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: 'black',
  },
  exerciseContainer: {
    marginBottom: 20,
  },
  exerciseName: {
    color: 'white',
    textTransform: 'uppercase',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  exerciseDeets: {
    color: 'yellow',
    fontWeight: 'bold', 
    textTransform: 'capitalize',
    fontSize: 20,
    lineHeight: 20,
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
    top: 5,
    right: 10,
    backgroundColor: 'gray',
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ExerciseListPage;
