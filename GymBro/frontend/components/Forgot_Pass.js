import { StyleSheet, Text, View, TouchableOpacity, Alert  } from 'react-native';

export default Forgot_Button = ({navigation, button_name}) => {
    return (
        <View style={styles.container}>
        <TouchableOpacity
            style={styles.forgotButton}
            onPress={() =>
                    Alert.alert("Gandeste-te mai bine, boss")
                    }
        >
        <Text style={styles.testwst}>{button_name}</Text>
        </TouchableOpacity>
        
        </View>
    )
}

const styles = StyleSheet.create({
    forgotButton:{
        width: 100,
        height: 50,
        left: 300,
        top: 20,
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