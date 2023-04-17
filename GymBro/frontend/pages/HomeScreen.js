import {View} from 'react-native';

import Home_Button from '../components/Home_Button';
import Home_Template from '../components/Home_Template';

const image = require('.././images/Get_started.png') ;

export default HomeScreen = ({ navigation }) => {
    return (
        <View>
            <Home_Template navigation={navigation} img={image} Button_type={Home_Button} Button_name={"Get Started"}></Home_Template>
        </View>
      
    );
  };