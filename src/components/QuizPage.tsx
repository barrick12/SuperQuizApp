import React, {useContext, useEffect, useState} from 'react';
import { StyleSheet, TouchableOpacity, View, Pressable } from 'react-native';
import AppText from './AppText'
import { QuestionAnswerContext } from '../context/questionAnswerContext';
import Colors from "../utils/colors"

const QuizPage = (props) : JSX.Element => {
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [countCorrectQuestions, setCountCorrectQuestions] = useState(0);
  const [isOverlayActive, setIsOverlayActive] = useState(false);
  const [buttonPressed, setButtonPressed] = useState(-1);
  const {getQuestionAnswers} = useContext(QuestionAnswerContext) as unknown as QuestionAnswerContextType;
  
  let { id, imageUrl, question, options, answer, time} = getQuestionAnswers()[currentQuestionIndex];
  
  const onPress = async (index:number) : Promise<void> =>{    
        
    setCountCorrectQuestions( prev => index === answer ? prev + 1 : prev );
    setButtonPressed(index);
    // await a timer to return using 'time'
    await new Promise((res)=>setTimeout(res,2000));
    // TODO Remove
    if(currentQuestionIndex === getQuestionAnswers().length-1) {setCurrentQuestionIndex(0);return}
    //
    setCurrentQuestionIndex(prev => prev + 1);
    setButtonPressed(-1);
  };  
  
  const questionCard = () : JSX.Element => {    
    return (
      <View key={`${id}-question`} style={{width:'100%'}} >
        <View style={{width:'100%'}}>
          <AppText {...styles.quizPage__question__question_text}
            >
            {question}
          </AppText>            
        </View>        
      {
        options.map((option,index)=>(          
          <View key={`${id}-${index}`} style={{width:'100%'}} >            
                        
            <TouchableOpacity
              style={ index === options.length -1 ? 
                [styles.quizPage__button__last, buttonPressed === index && styles.quizPage__button__pressed ]
                : [styles.quizPage__button, buttonPressed === index && styles.quizPage__button__pressed]}      
              onPress={()=>onPress(index)}
              activeOpacity={0.75}              
              disabled={buttonPressed !== -1}
            >
              <AppText {...styles.quizPage__question__options_text}
              >
                {option}
              </AppText>
            </TouchableOpacity>
          </View>
        ))
      }
      </View>)
    }

  return (
    <View style={styles.quizPage__container}>    
      {questionCard()}
    </View>
  )
}

const styles = StyleSheet.create({
  quizPage__container: {
    flex:1,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },  
  quizPage__button: {    
    width: '100%',
    backgroundColor: Colors.blue_azure_medium,
    paddingTop: 20,
    paddingBottom: 10,
    borderRadius: 0,
    borderColor: Colors.blue_azure_darkest,
    borderWidth: 5,
    borderBottomWidth: 0,
  },
  quizPage__button__last: {    
    width: '100%',
    backgroundColor: Colors.blue_azure_medium,
    paddingTop: 20,
    paddingBottom: 10,
    borderRadius: 0,
    borderColor: Colors.blue_azure_darkest,
    borderWidth: 5,
  },
  quizPage__question__options_text: {
    color: Colors.white_azure_pale,
    fontSize: 10,
    lineHeight: 15
  },
  quizPage__question__question_text: {
    color: Colors.blue_azure_dark,
    backgroundColor: Colors.white_azure_pale,
    fontSize: 12,
    lineHeight: 20,
    padding: 10,
    paddingBottom: 5,
  },
  quizPage__button__pressed: {
    backgroundColor: Colors.orange_light,
  }
});

export default QuizPage;