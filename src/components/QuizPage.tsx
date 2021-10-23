import React, {useContext, useEffect} from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import AppText from './AppText'
import { QuestionAnswerContext } from '../context/questionAnswerContext';

const QuizPage = (props) : JSX.Element => {
  const {getQuestionAnswers} = useContext(QuestionAnswerContext) as unknown as QuestionAnswerContextType;
    
  // const {questionAnswers} = questionAnswerContxt;
  // const {questionAnswers} = useContext(QuestionAnswerContext) as unknown as QuestionAnswerContextType;
    // const { questionAnswerContxt }  = route.params;
  

  let textProps = {    
    color: "#f0ffff",
    fontSize: 10,
    lineHeight: 15
  }

  const onPress = () =>{};
  
  useEffect(()=>{
    console.log("QUIZ: ",getQuestionAnswers());
  },[])

  return (
    <View style={styles.quizPage__container}>    
      {
      getQuestionAnswers()[0].options.map((option,index)=>(          
        <TouchableOpacity      
          style={ index === getQuestionAnswers()[0].options.length -1 ? styles.quizPage__button__last : styles.quizPage__button}      
          onPress={onPress}
        >
        <AppText {...textProps}
        >
          {option}
        </AppText>
        </TouchableOpacity>))
      }      
    </View>
  )
}

const styles = StyleSheet.create({
  quizPage__container: {
    flex:1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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
});

export default QuizPage;