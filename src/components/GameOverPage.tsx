import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { QuestionAnswerContext } from '../context/questionAnswerContext';
import { CommonActions } from '@react-navigation/native';
import AppText from './AppText';
import Colors from "../utils/colors"


const GameOverPage = ({route, navigation}) : JSX.Element => {
  const { getQuestionAnswers } = useContext(QuestionAnswerContext) as unknown as QuestionAnswerContextType;
  const { countCorrectQuestions } = route.params;
  
  const onPress = () : void => {    
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          { name: 'StartPage' },
          { name: 'QuizPage'  },
        ],
      })
    );
  }
  
  return (
  
    <View style={styles.gameOverPage__container} >
      <AppText {...styles.gameOverPage__text}
      >
        { countCorrectQuestions >2 ? `You win!` : `You lose!` }
      </AppText>        

        <TouchableOpacity      
          style={styles.gameOverPage__restart_button}      
          onPress={onPress}
          activeOpacity={0.75}
        >
          <AppText {...styles.gameOverPage__restart_button__text}          
          >
            Start Again?
          </AppText>
        </TouchableOpacity>
      
      
    </View>      
  )
}

const styles = StyleSheet.create({
  gameOverPage__container: {
    flex:1,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gameOverPage__restart_button: {
    width: '50%',
    backgroundColor: Colors.red_honda,
    paddingTop: 20,
    paddingBottom: 10,    
  },  
  gameOverPage__restart_button__text: {
    color: Colors.white,
    fontSize: 20,
  },
  gameOverPage__text: {
    color: Colors.black,
    fontSize: 20,
  }
});



export default GameOverPage;