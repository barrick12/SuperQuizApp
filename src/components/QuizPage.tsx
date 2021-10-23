import React, {useContext, useEffect, useState} from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import AppText from './AppText'
import { QuestionAnswerContext } from '../context/questionAnswerContext';

const QuizPage = (props) : JSX.Element => {
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  const {getQuestionAnswers} = useContext(QuestionAnswerContext) as unknown as QuestionAnswerContextType;
  
  let { id, imageUrl, question, options, answer, time} = getQuestionAnswers()[currentQuestionIndex];
  
  const onPress = (index:number) =>{    
    // TODO Remove
    if(currentQuestionIndex === getQuestionAnswers().length-1) {setCurrentQuestionIndex(0);return}
    setCurrentQuestionIndex(prev => prev + 1);
  };  
  
  const questionCard = () => {    
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
              style={ index === options.length -1 ? styles.quizPage__button__last : styles.quizPage__button}      
              onPress={()=>onPress(index)}              
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },  
  quizPage__button: {    
    width: '100%',
    backgroundColor: '#4B92DB',
    paddingTop: 20,
    paddingBottom: 10,
    borderRadius: 0,
    borderColor: '#003399',
    borderWidth: 5,
    borderBottomWidth: 0,
  },
  quizPage__button__last: {    
    width: '100%',
    backgroundColor: '#4B92DB',
    paddingTop: 20,
    paddingBottom: 10,
    borderRadius: 0,
    borderColor: '#003399',
    borderWidth: 5,
  },
  quizPage__question__options_text: {
    color: "#f0ffff",
    fontSize: 10,
    lineHeight: 15
  },
  quizPage__question__question_text: {
    color: "#0038a8",
    backgroundColor:"#f0ffff",
    fontSize: 12,
    lineHeight: 20,
    padding: 10,
    paddingBottom: 5,
  }
});

export default QuizPage;