import {View} from 'react-native';

import Template_Button from '../components/Template_Button';
import Weight_Button from '../components/Weight_Button';

const image = require('.././images/Weight_History.jpg') ;

const Weight_History = ({navigation, route}) => {
    return (
      <View>
        <Template_Button navigation={navigation} img={image} Button_type={Weight_Button} Button_name={" Weight History"} username={route.params.username}></Template_Button>
      </View>
    )
  }

  export default Weight_History;