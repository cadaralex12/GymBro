import {StyleSheet, Text, View, TouchableOpacity  } from 'react-native';

export default Home_Button = ({navigation, button_name}) => {
    return (
        <View style={styles.container}>
        <TouchableOpacity
            style={styles.button}
            onPress={() =>
                navigation.navigate('Login')
                    }
        >
        <Text style={styles.text}>{button_name}</Text>
        </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      paddingHorizontal: 10
    },
    button:{
        width: 250,
        height: 66,
        left: 66,
        top: 260,
        justifyContent: "center", 
        alignContent: "center",
        backgroundColor: "#ffff00",
        borderRadius: 10
      },
    text: {
        left: 23,
        alignContent: "center",
        fontWeight: "bold", 
        color: "#000000", 
        fontSize: 40
    }
  });