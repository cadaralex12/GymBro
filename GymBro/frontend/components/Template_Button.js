import { ImageBackground, StyleSheet, View, Text, Image} from 'react-native';


const Menu = () => {
  return <View style={styles.menu} />;
};

export default template_Button = ({navigation, img, Button_type, Button_name, username, user_id}) => {
    return (
    <View>
      <ImageBackground source={img} style={styles.image}>
        <View style={styles.menu}>
          <Image source={require('.././images/logofinal.png')} style={styles.logo}></Image>
          <Text style={styles.text}> Welcome, {username} 💪</Text>
        </View>
        <Button_type button_name={Button_name} navigation={navigation} username={username} user_id={user_id}>
        </Button_type>
      </ImageBackground>
    </View>
    )
}

const styles = StyleSheet.create({
  menu: {
    top: 0,
    position: 'absolute',
    width: '100%',
    height: 48,
    backgroundColor: 'rgba(52, 52, 0, 0)',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ffff00'
  },
  image: {
      resizeMode: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%'
      
    },
    text: {
     alignContent: 'center',
     justifyContent: 'center',
     fontSize: 20,
     fontWeight: "bold", 
     color: "#ffff00",
     left: 60,
     top: -35
    },
    logo: {
      height: 45,
      width: 45,
      
    },
});