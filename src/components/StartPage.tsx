import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import { QuestionAnswerContext } from '../context/questionAnswerContext';
import AppText from './AppText';
import axios from "axios";
import sampleData from '../utils/mockData'
import Colors from "../utils/colors"
import delay from '../utils/delay';

const StartPage = ({navigation}:any) : JSX.Element => {

  const isMockData = true;
  const [isLoading, setIsLoading] = useState(true);

  const {getQuestionAnswers, saveQuestionAnswers} = useContext(QuestionAnswerContext) as unknown as QuestionAnswerContextType;

  useEffect(()=>{ 
    
    const fetchData = async () => {      
      let data: FetchQuestionAnswerResponse[] = [];
      if(isMockData) {        
        await delay(1000);
        data = sampleData;
      } 
      else {
        let response = await axios.get<FetchQuestionAnswerResponse[]>('https://scs-interview-api.herokuapp.com/questions');        
        data  = response.data;
      }

      data.forEach(datum=>{
        Image.prefetch(datum.imageUrl);
      })

      saveQuestionAnswers(data as QuestionAnswer[]);       
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
          activeOpacity={0.75}
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
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  startPage__start_button: {
    width: '50%',
    backgroundColor: Colors.red_honda,
    paddingTop: 20,
    paddingBottom: 10,    
  },  
  startPage__start_button__text: {
    color: Colors.white,
    fontSize: 20,
  },
  startPage__loading__text: {
    color: Colors.black,
    fontSize: 20,
  }
});

export default StartPage;