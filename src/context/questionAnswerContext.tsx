import React from "react";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

export const QuestionAnswerContext = React.createContext(null);

const QuestionAnswerProvider = ({ children }) => {
  const [questionAnswers, setQuestionAnswers] = React.useState<QuestionAnswer[]>([]);

  const saveQuestionAnswers = (questionAnswers: QuestionAnswer[]) => {
    if(questionAnswers.length <= 0) return;
    let questionAnswersTransform: QuestionAnswer[] = [];    
    questionAnswers.forEach(questionAnswer => {
      const newQuestionAnswer: QuestionAnswer = {
        id: uuidv4(),
        imageUrl: questionAnswer.imageUrl,
        question: questionAnswer.question,
        options: questionAnswer.options,
        answer: questionAnswer.answer,
        time: questionAnswer.time,        
      }
      questionAnswersTransform.push(newQuestionAnswer);
    })
    
    setQuestionAnswers([...questionAnswersTransform]);
  }
  
  const getQuestionAnswers = () => (questionAnswers);
  
  const initialContext = {    
    getQuestionAnswers,
    saveQuestionAnswers,
    // updateQuestionAnswer,
  }

  return(
    <QuestionAnswerContext.Provider value={ initialContext}>{ children }</QuestionAnswerContext.Provider>
  )
}

export default QuestionAnswerProvider;