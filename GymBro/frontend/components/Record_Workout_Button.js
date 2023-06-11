import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default Record_Workout_Button = ({ navigation, button_name, username, user_id }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.chooseButton}
        onPress={() => navigation.navigate('Choose_Workout', { username: username, user_id: user_id })}
      >
        <Text style={styles.text_button2}>{button_name}</Text>
      </TouchableOpacity>

      <View style={styles.gridContainer}>
        <TouchableOpacity
          style={[styles.gridButton, styles.activeButton]}
          onPress={() => navigation.navigate('Record_Workout', { username: username, user_id: user_id })}
        >
          <Text style={[styles.text_button, styles.activeButtonText]}>{button_name}</Text>
        </TouchableOpacity>
        <View style={styles.verticalLine} />
        <TouchableOpacity
          style={styles.gridButton}
          onPress={() => navigation.navigate('Progress_History', { username: username, user_id: user_id })}
        >
          <Text style={styles.text_button}>Progress History</Text>
        </TouchableOpacity>
        <View style={styles.verticalLine} />
        <TouchableOpacity
          style={styles.gridButton}
          onPress={() => navigation.navigate('Weight_History', { username: username, user_id: user_id })}
        >
          <Text style={styles.text_button}>Weight</Text>
        </TouchableOpacity>
        <View style={styles.verticalLine} />
        <TouchableOpacity
          style={styles.gridButton}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.text_button}>Log Out ➜</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
   chooseButton:{
        width: 266,
        height: 66,
        left: 66,
        top: 100,
        justifyContent: "center", 
        alignContent: "center",
        backgroundColor: 'rgba(52, 52, 0, 0)',
        borderRadius: 100,
        borderWidth: 4,
        borderColor: '#ffff00'
      },
  gridContainer: {
    top: 600,
    width:420,
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'black',
    borderTopWidth: 2,
    borderColor: 'white',
    paddingVertical: 10,
  },
  gridButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  verticalLine: {
    width: 1,
    backgroundColor: 'grey',
  },
  activeButton: {
    backgroundColor: 'black',
  },
  text_button: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 16,
  },
  text_button2: {
    left: 18,
    alignContent: "center",
    fontWeight: "bold", 
    color: "#ffff00", 
    fontSize: 30
  },
  activeButtonText: {
    color: 'yellow',
  },
});
