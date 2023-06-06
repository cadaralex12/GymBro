import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Text, Alert } from 'react-native';

const ExerciseListPage = ({ navigation, route }) => {
  const { name, username, user_id } = route.params;
  const [muscle, setMuscle] = useState(name);
  const [exercises, setExercises] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const [selectedType, setSelectedType] = useState([]);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        let apiUrl = `https://api.api-ninjas.com/v1/exercises?muscle=${muscle}`;

        if (selectedDifficulty) {
          apiUrl += `&difficulty=${selectedDifficulty}`;
        }

        if (selectedType.length > 0) {
          const typeQuery = selectedType.map(type => `type=${type}`).join('&');
          apiUrl += `&${typeQuery}`;
        }

        const response = await fetch(apiUrl, {
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
  }, [muscle, selectedDifficulty, selectedType]);

  const handleInfoButtonPress = (exercise) => {
    Alert.alert('Exercise Information', exercise.instructions);
  };

  const formatAPIdata = (equipment) => {
    return equipment.replace(/_/g, ' ');
  };

  const handleExercisePress = (exercise) => {
    navigation.navigate('Exercise', {
      username: username,
      user_id: user_id,
      exerciseName: exercise.name,
      muscle,
      difficulty: exercise.difficulty
    });
  };

  const handleDifficultyChange = (difficulty) => {
    setSelectedDifficulty(difficulty);
  };

  const handleTypeChange = (type) => {
    const updatedTypes = [...selectedType];
    const index = updatedTypes.indexOf(type);

    if (index > -1) {
      updatedTypes.splice(index, 1);
    } else {
      updatedTypes.push(type);
    }

    setSelectedType(updatedTypes);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>Difficulty:</Text>
        <View style={styles.filterOptions}>
          <TouchableOpacity
            style={selectedDifficulty === 'beginner' ? styles.filterOptionActive : styles.filterOption}
            onPress={() => handleDifficultyChange('beginner')}
          >
            <Text style={styles.filterOptionText}>Beginner</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={selectedDifficulty === 'intermediate' ? styles.filterOptionActive : styles.filterOption}
            onPress={() => handleDifficultyChange('intermediate')}
          >
            <Text style={styles.filterOptionText}>Intermediate</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>Exercise Type:</Text>
        <View style={styles.filterOptions}>
          <TouchableOpacity
            style={selectedType.includes('strength') ? styles.filterOptionActive : styles.filterOption}
            onPress={() => handleTypeChange('strength')}
          >
            <Text style={styles.filterOptionText}>Strength</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={selectedType.includes('strongman') ? styles.filterOptionActive : styles.filterOption}
            onPress={() => handleTypeChange('strongman')}
          >
            <Text style={styles.filterOptionText}>Strongman</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={selectedType.includes('powerlifting') ? styles.filterOptionActive : styles.filterOption}
            onPress={() => handleTypeChange('powerlifting')}
          >
            <Text style={styles.filterOptionText}>Powerlifting</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={selectedType.includes('olympic_weightlifting') ? styles.filterOptionActive : styles.filterOption}
            onPress={() => handleTypeChange('olympic_weightlifting')}
          >
            <Text style={styles.filterOptionText}>Olympic</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.separatorLine} />
      </View>
      {exercises.map((exercise, index) => (
        <TouchableOpacity
          key={index}
          style={styles.exerciseContainer}
          onPress={() => handleExercisePress(exercise)}
        >
          <Text style={styles.exerciseName}>{exercise.name}</Text>
          <Text style={styles.exerciseDeetsWhite}>Equipment Needed:</Text>
          <Text style={styles.exerciseDeets}>{formatAPIdata(exercise.equipment)}</Text>
          <Text style={styles.exerciseDeetsWhite}>Difficulty Level:</Text>
          <Text style={styles.exerciseDeets}>{exercise.difficulty}</Text>
          <Text style={styles.exerciseDeetsWhite}>Exercise Type:</Text>
          <Text style={styles.exerciseDeets}>{formatAPIdata(exercise.type)}</Text>
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
  filterContainer: {
    marginBottom: 20,
  },
  filterLabel: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
  },
  filterOptions: {
    flexDirection: 'row',
  },
  filterOption: {
    backgroundColor: 'gray',
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 10,
    borderRadius: 8,
  },
  filterOptionActive: {
    backgroundColor: 'green',
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 10,
    borderRadius: 8,
  },
  filterOptionText: {
    color: 'white',
    fontWeight: 'bold',
  },
  exerciseContainer: {
    marginBottom: 20,
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
    marginBottom: 6 ,
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
    top: 25,
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
    fontWeight: 'bold',
  },
});

export default ExerciseListPage;
