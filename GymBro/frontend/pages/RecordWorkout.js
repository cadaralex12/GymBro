import { View } from 'react-native';

import Template_Button from '../components/Template_Button';
import Record_Workout_Button from '../components/Record_Workout_Button';

const image = require('.././images/Record_Workout.png') ;

const Record_Workout = ({navigation, route}) => {
    return (
      <View>
        <Template_Button navigation={navigation} img={image} Button_type={Record_Workout_Button} Button_name={"Record Workout"} username={route.params.username} user_id={route.params.user_id}></Template_Button>
      </View>
    )
  }

  export default Record_Workout;