import { View } from 'react-native';

import Register_Template_Button from '../components/Register_Template_Button';

const image = require('.././images/background.png') ;

const Register = ({navigation}) => {
    return (
      <View>
        <Register_Template_Button navigation={navigation} img={image} button_name={"Register"}></Register_Template_Button>
      </View>
    )
  }

  export default Register;