import React, { useState, useEffect } from 'react';
import { Text, FlatList, Alert, StyleSheet, SafeAreaView, TouchableOpacity, View, Modal, TextInput, Button } from 'react-native';
import { Card } from 'react-native-paper';
import { httpsUrl } from '../constants/HttpUrl';

function Print_Exercise({ navigation, user_id }) {
  const [data, setData] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editedWorkout, setEditedWorkout] = useState(null);
  const [newWorkoutName, setNewWorkoutName] = useState('');

  useEffect(() => {
    fetch(`${httpsUrl}/exercise/print/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id_for_user: user_id }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        const groupedData = data.reduce((acc, exercise) => {
          const date = exercise.date.split('T')[0];
          if (!acc[date]) {
            acc[date] = [];
          }
          acc[date].push(exercise);
          return acc;
        }, {});
        setData(groupedData);
      })
      .catch((error) => Alert.alert('Error', error));
  }, []);

  const clickedItem = (exercise) => {
    navigation.navigate('Details', { data: exercise });
  };

  const handleEditWorkoutName = (workout) => {
    if (workout && workout.date) {
      const date = workout.date.split('Your Workout on ')[1];
      setEditedWorkout({ ...workout, date });
      setNewWorkoutName('');
      setEditModalVisible(true);
    }
  };

  const handleSaveWorkoutName = () => {
    setEditModalVisible(false);
    setData((prevData) => {
      const updatedData = { ...prevData };
      const workouts = updatedData[editedWorkout.date];
      if (workouts) {
        workouts.forEach((workout) => {
          if (workout === editedWorkout) {
            const currentDate = workout.workoutName.split('Your Workout on ')[1];
            workout.workoutName = `Your Workout on ${newWorkoutName || currentDate}`;
          }
        });
      }
      return updatedData;
    });
    setEditedWorkout(null);
    setNewWorkoutName('');
  };
  


  const renderData = ({ item }) => {
    const date = item[0];
    const exercises = item[1];
    return (
      <Card style={styles.cardstyle}>
        <View style={styles.header}>
          <Text style={styles.workoutDate}>{`${editedWorkout ? editedWorkout.workoutName : 'Your Workout'} on ${date}`}</Text>
        </View>
        {exercises.map((exercise) => (
          <Text
            key={exercise.id}
            style={styles.exerciseText}
            onPress={() => clickedItem(exercise)}
          >
            {exercise.exercise_name} ➜
          </Text>
        ))}
      </Card>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.baseText}>
        Your
        <Text style={styles.innerText}> Exercises </Text>
      </Text>
      <FlatList
        data={data ? Object.entries(data).reverse() : []}
        renderItem={renderData}
        keyExtractor={(item) => item[0]}
        ListEmptyComponent={<Text style={styles.item}>No exercises found</Text>}
      />

      {editedWorkout && (
        <Modal visible={editModalVisible} animationType="slide" transparent>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TextInput
                style={styles.input}
                placeholder="Enter new workout name"
                value={newWorkoutName}
                onChangeText={setNewWorkoutName}
              />
              <Button title="Save" onPress={handleSaveWorkoutName} />
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
}

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
    top: 10,
    backgroundColor: '#ffff3f',
    padding: 12,
    marginVertical: 10,
    marginHorizontal: 16,
    borderRadius: 6,
  },
  baseText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
  },
  innerText: {
    color: 'yellow',
  },
  text: {
    top: 5,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  workoutDate: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  editButton: {
    fontSize: 16,
    color: 'blue',
    textDecorationLine: 'underline',
  },
  exerciseText: {
    fontSize: 18,
    color: 'black',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default Print_Exercise;
