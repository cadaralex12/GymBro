import { View, Text, StyleSheet} from 'react-native';
import Pictures_rand from '../components/Pictures_rand';

const abs_image = require('.././images/Abs.png') ;
const shoulder_image = require('.././images/Shoulders.png') ;
const triceps_image = require('.././images/Triceps.png') ;
const back_image = require('.././images/Back.png') ;
const chest_image = require('.././images/Chest.png') ;
const biceps_image = require('.././images/Biceps.png') ;
const legs_image = require('.././images/Legs.jpg') ;
const custom_image = require('.././images/Custom.jpg') ;

const Choose_Workout = ({navigation, route}) => {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
            Choose your Workout
        </Text>
        <Pictures_rand navigation={navigation} imageleft={biceps_image} imageright={abs_image} username={route.params.username} user_id={route.params.user_id} leftname='Biceps' rightname='Abdominals'>
        </Pictures_rand>
        <Pictures_rand navigation={navigation} imageleft={shoulder_image} imageright={legs_image} username={route.params.username} user_id={route.params.user_id} leftname='Shoulders' rightname='Quadriceps'>
        </Pictures_rand>
        <Pictures_rand navigation={navigation} imageleft={triceps_image} imageright={back_image} username={route.params.username} user_id={route.params.user_id} leftname='Triceps' rightname='Lats'>
        </Pictures_rand>
        <Pictures_rand navigation={navigation} imageleft={chest_image} imageright={custom_image} username={route.params.username} user_id={route.params.user_id} leftname='Chest' rightname='Custom'>
        </Pictures_rand>
      </View>
    )
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'black',
      paddingHorizontal: 5
    },
    text:{
        left: 40,
        fontSize:30,
        color:"white",
        justifyContent: "center",
    },
  });

  export default Choose_Workout;