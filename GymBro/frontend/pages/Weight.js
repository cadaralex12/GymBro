import { View } from 'react-native';

import Weight_Template from '../components/Weight_Template';

const image = require('.././images/background.png') ;

const Weight = ({navigation}) => {
    return (
      <View>
        <Weight_Template navigation={navigation} img={image}></Weight_Template>
      </View>
    )
  }

  export default Weight;