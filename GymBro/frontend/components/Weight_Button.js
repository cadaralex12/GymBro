import { StyleSheet, Text, View, TouchableOpacity  } from 'react-native';
    
    
export default Weight_Button = ({ navigation, button_name, username, user_id }) => {
    return (
        
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.weight_button}
          onPress={() =>
            navigation.navigate('Weight', { username: username, user_id: user_id })
          }
        >
          <Text style={styles.text_button}>{button_name}</Text>
        </TouchableOpacity>
  
        <TouchableOpacity
          style={styles.arrow_button}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.arrow_text}>       Log Out ➜</Text>
        </TouchableOpacity>
      </View>
    );
  };
  

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      paddingHorizontal: 10
    },
    weight_button:{
        width: 266,
        height: 66,
        left: 66,
        top: 100,
        justifyContent: "center", 
        alignContent: "center",
        borderRadius: 100,
        backgroundColor: 'rgba(52, 52, 0, 0)',
        borderRadius: 100,
        borderWidth: 4,
        borderColor: '#ffff00'
      },
      arrow_button:{
        width: 266,
        height: 66,
        left: 66,
        top: 200,
        justifyContent: "center", 
        alignContent: "center",
        backgroundColor: 'rgba(52, 52, 0, 0)',
        borderRadius: 100,
        borderWidth: 4,
        borderColor: '#ffff00'
      },
    text_button: {
        left: 18,
        alignContent: "center",
        fontWeight: "bold", 
        color: "#ffff00", 
        fontSize: 30
    },
    arrow_text: {
        top: -1,
        left: 15,
        fontWeight:'bold',
        alignContent: "center",
        color: "#ffff00", 
        fontSize: 30
  }
  });