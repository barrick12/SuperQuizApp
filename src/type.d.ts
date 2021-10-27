import React, { ReactNode } from 'react';

export type QuestionAnswer = {
    id: string,
    imageUrl: string,
    question: string,
    options: string[],
    answer: number,
    time: number,    
}

export type FetchQuestionAnswerResponse = {  
  imageUrl: string,
  question: string,
  options: string[],
  answer: number,
  time: number,    
}

export type QuestionAnswerContextType = {  
  saveQuestionAnswers: (questionAnswers: QuestionAnswer[]) => void,
  getQuestionAnswers: () => QuestionAnswer[];
}

export interface ITimerProps{
  timer: number,
  buttonPressedIndex: number,
  questionOptionsLength: number,
  totalTime: number,
}

export interface IQuestionOptionsCard {
  showAnswer: boolean, 
  buttonPressed: number, 
  index: number,
  id: string,
  answer: number,
  timer: number,
  option: string,
  onPress: (value: number) => void
}

export interface IQuestionAnswerProviderProps {
  children: ReactNode
}

export interface IAppTextProps {
  children: ReactNode,  
}