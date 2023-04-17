import React from 'react';
import {View} from "react-native";

import Print_Exercise from '../components/Print_Exercise'

export default ProfileScreen = ({navigation, route}) => {
    return (
      <View style={{flex:1, blackgroundColor: '#eddfdf'}}>
    <Print_Exercise navigation={navigation} user_id={route.params.user_id}>
    </Print_Exercise>
    </View>
    )
}
  