import { StyleSheet, Text, View, TouchableOpacity  } from 'react-native';

export default Account_Button = ({navigation, button_name}) => {
    return (
        <View style={styles.container}>
        <TouchableOpacity
            style={styles.loginButton}
            onPress={() =>
                navigation.navigate('Register')
                    }
        >
        <Text style={styles.testwst}>{button_name}</Text>
        </TouchableOpacity>
        
        </View>
    )
}

const styles = StyleSheet.create({
    loginButton:{
        width: 100,
        height: 50,
        left: 30,
        top: -30,
        justifyContent: "center", 
        alignContent: "center",
        backgroundColor: "#000000",
        borderRadius: 10,
      },
      
    testwst: {
        alignContent: "center",
        color: "#ffffff", 
        fontSize: 14,
    },
  });