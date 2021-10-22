import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import AppText from './AppText'

const QuizPage = () : JSX.Element => {
  let props = {    
    color: "#000000",
    fontSize: 20,
  }
  
  return (
    <View style={styles.quizPage__container}>    
        <AppText {...props}          
        >
          QuizPage
        </AppText>      
    </View>
  )
}

const styles = StyleSheet.create({
  quizPage__container: {
    flex:1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default QuizPage;