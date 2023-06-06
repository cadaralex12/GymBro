import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';

const Pictures_rand = ({navigation, imageleft, imageright, leftname, rightname, username, user_id}) => {
    return (
        <View style={styles.container}>
        <TouchableOpacity
            onPress={() =>
                navigation.navigate('ExerciseListPage', { name: leftname, username:username, user_id:user_id })
                    }
        >
            <Image
                source = {imageleft}
                style={styles.pic_left}
            />
        </TouchableOpacity>
        <TouchableOpacity
            onPress={() =>{
                if(rightname === 'Custom'){
                    navigation.navigate('SearchEx', { name: rightname, username:username, user_id:user_id })

                }
                else{
                    navigation.navigate('ExerciseListPage', { name: rightname, username:username, user_id:user_id })
                }
                
                    }
        }>
            <Image
                source = {imageright}
                style={styles.pic_right}
            />
        </TouchableOpacity>
        </View>
    )
  }

  const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:'row',
        backgroundColor:'black',
        paddingTop: 20,
      },
    pic_left: {
        left:25,
        width: 150,
        height: 110,
        borderWidth: 1,
        borderColor: 'yellow',
        
      },  
    pic_right: {
        left:60,
        width: 150,
        height: 110,
        borderWidth: 1,
        borderColor: 'yellow',
      },  
  });

  export default Pictures_rand;