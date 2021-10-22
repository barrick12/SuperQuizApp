import React from "react";
import { v4 as uuidv4 } from 'uuid';

export const questionAnswerContext = React.createContext(null);

const questionAnswerProvider = ({ children }) => {
  const [questionAnswers, setQuestionAnswers] = React.useState<IQuestionAnswer[]>([]);

  const saveQuestionAnswers = (questionAnswers: IQuestionAnswer[]) => {
    if(questionAnswers.length <= 0) return;
    let questionAnswersTransform: IQuestionAnswer[] = [];    
    questionAnswers.forEach(questionAnswer => {
      const newQuestionAnswer: IQuestionAnswer = {
        id: uuidv4(),
        imageUrl: questionAnswer.imageUrl,
        question: questionAnswer.question,
        options: questionAnswer.options,
        answer: questionAnswer.answer,
        time: questionAnswer.time,
        isCorrect: false,
      }
      questionAnswersTransform.push(newQuestionAnswer);
    })
    
    setQuestionAnswers(prev => [...prev, ...questionAnswersTransform]);
  }
  
  const updateQuestionAnswer = (id: string, isCorrect: boolean) => {
    if(!Boolean(id)) return;
    questionAnswers.filter( questionAnswer => {
      if(questionAnswer.id === id){
        questionAnswer.isCorrect = isCorrect;
        setQuestionAnswers([...questionAnswers])
      }
    });
  }

  return(
    { children }
  )
}