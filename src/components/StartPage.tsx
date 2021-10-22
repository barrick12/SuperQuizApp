import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
// import {}
import AppText from './AppText'

const StartPage = ({navigation}) : JSX.Element => {
  let startButtonFontProps = {    
    color: "#fff",
    fontSize: 20,    
  }
  
  const onPress = () : void => {
    navigation.navigate('QuizPage');
  }

  return (
    <View style={styles.startPage__container}>
      <TouchableOpacity      
        style={styles.startPage__start_button}      
        onPress={onPress}
      >
        <AppText {...startButtonFontProps}          
        >
          Start
        </AppText>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  startPage__container: {
    flex:1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  startPage__start_button: {
    width: '50%',
    backgroundColor: '#CC0000',
    paddingTop: 20,
    paddingBottom: 10,
    borderRadius: 10,
  },  
});

export default StartPage;