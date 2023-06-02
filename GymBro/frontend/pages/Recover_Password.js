import { View } from 'react-native';

import Recover_Button from '../components/Recover_Pass';

const Recover_Password = ({navigation}) => {
    return (
      <View>
        <Recover_Button navigation={navigation} Button_name={"Recover my Password"}></Recover_Button>
      </View>
    )
  }

  export default Recover_Password;