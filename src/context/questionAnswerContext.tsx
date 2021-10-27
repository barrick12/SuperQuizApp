import React from "react";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { IQuestionAnswerProviderProps, QuestionAnswer, QuestionAnswerContextType } from '../type'

export const QuestionAnswerContext = React.createContext<QuestionAnswerContextType | null>(null);

const QuestionAnswerProvider = (props: IQuestionAnswerProviderProps ) => {
  const { children } = props;
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
  
  const initialContext : QuestionAnswerContextType = {    
    getQuestionAnswers,
    saveQuestionAnswers,    
  }

  return(
    <QuestionAnswerContext.Provider value={ initialContext }>{ children }</QuestionAnswerContext.Provider>
  )
}

export default QuestionAnswerProvider;