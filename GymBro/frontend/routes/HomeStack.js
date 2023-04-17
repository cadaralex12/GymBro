import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../pages/HomeScreen'
import RecordWorkout from '../pages/RecordWorkout';
import ProfileScreen from '../pages/ProfileScreen'
import ProgressHistory from '../pages/ProgressHistory';
import WeightHistory from '../pages/WeightHistory';
import Weight from '../pages/Weight';
import Choose_Workout from '../pages/Choose_workout';
import Exercise from '../pages/Exercise';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Choose_Profile from '../pages/Choose_profile';
import ExerciseDetail from '../pages/ExerciteDetail';
import ExerciseUpdate from '../pages/ExerciseUpdate';

const Stack = createNativeStackNavigator();

export default MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{headerShown: false}}
          name="Home_Screen"
          component={HomeScreen}
        />
        <Stack.Screen name="Record_Workout" component={RecordWorkout} options={{headerShown: false}}/>
        <Stack.Screen name="Progress_History" component={ProgressHistory} options={{headerShown: false}}/>
        <Stack.Screen name="Weight_History" component={WeightHistory} options={{headerShown: false}}/>
        <Stack.Screen name="Weight" component={Weight} options={{headerShown: false}}/>
        <Stack.Screen name="Choose_Workout" component={Choose_Workout} options={{headerShown: false}}/>
        <Stack.Screen name="Exercise" component={Exercise} options={{headerShown: false}}/>
        <Stack.Screen name="Profile" component={ProfileScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
        <Stack.Screen name="Register" component={Register} options={{headerShown: false}}/>
        <Stack.Screen name="Choose_Profile" component={Choose_Profile} options={{headerShown: false}}/>
        <Stack.Screen name="Details" component={ExerciseDetail} options={{headerShown: false}}/>
        <Stack.Screen name="Update" component={ExerciseUpdate} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
