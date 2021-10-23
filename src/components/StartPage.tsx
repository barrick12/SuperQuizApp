import React, { useContext, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { QuestionAnswerContext } from '../context/questionAnswerContext';
import AppText from './AppText';
import axios from "axios";
import sampleData from '../utils/data'

const StartPage = ({navigation}) : JSX.Element => {
  
  const isMockData = true;

  const {getQuestionAnswers, saveQuestionAnswers} = useContext(QuestionAnswerContext) as unknown as QuestionAnswerContextType;
  
  let startButtonFontProps = {    
    color: "#fff",
    fontSize: 20,    
  }

  useEffect(()=>{
    (async () => {
      let data = null;
      if(isMockData) {
        data = sampleData;
      } 
      else {
        let response = await axios.get('https://scs-interview-api.herokuapp.com/questions');
        data  = response.data;
      }       
      // data transform
      data.forEach(datum => {datum.isCorrect = false;})      
      saveQuestionAnswers(data as IQuestionAnswer[]);      
    })();
  },[])
  
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