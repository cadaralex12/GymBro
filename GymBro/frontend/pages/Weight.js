import { View } from 'react-native';

import Weight_Template from '../components/Weight_Template';

const image = require('.././images/background.png') ;

const Weight = ({navigation, route}) => {
    return (
      <View>
        <Weight_Template navigation={navigation} img={image} username={route.params.username} user_id={route.params.user_id}></Weight_Template>
      </View>
    )
  }

  export default Weight;