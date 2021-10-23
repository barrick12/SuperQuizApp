import React, { useContext, useEffect, useState, useRef } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { QuestionAnswerContext } from '../context/questionAnswerContext';
import AppText from './AppText';
import axios from "axios";
import sampleData from '../utils/data'

const StartPage = ({navigation}) : JSX.Element => {

  const isMockData = true;
  const [isLoading, setIsLoading] = useState(true);

  const {getQuestionAnswers, saveQuestionAnswers} = useContext(QuestionAnswerContext) as unknown as QuestionAnswerContextType;
    

  useEffect(()=>{ 
    
    const fetchData = async () => {      
      let data = null;      
      if(isMockData) {
        await new Promise((res)=>setTimeout(res,1000));
        data = sampleData;
      } 
      else {
        let response = await axios.get('https://scs-interview-api.herokuapp.com/questions');
        data  = response.data;
      }
      // TODO data transform --- can likely remove this
      data.forEach(datum => {datum.isCorrect = false;})            
      saveQuestionAnswers(data as IQuestionAnswer[]);       
      setIsLoading(false);
    };

    if(getQuestionAnswers().length < 1)
      fetchData();    
  },[])
  
  const onPress = () : void => {    
    navigation.navigate('QuizPage');
  }

  return (
    <View style={styles.startPage__container} >
      
      { isLoading?
        <AppText {...styles.startPage__loading__text}          
        >
          Loading...
        </AppText>
        :
        <TouchableOpacity      
          style={styles.startPage__start_button}      
          onPress={onPress}
        >
          <AppText {...styles.startPage__start_button__text}          
          >
            Start
          </AppText>
        </TouchableOpacity>
      }
      
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
  },  
  startPage__start_button__text: {
    color: "#fff",
    fontSize: 20,
  },
  startPage__loading__text: {
    color: "#000000",
    fontSize: 20,
  }
});

export default StartPage;