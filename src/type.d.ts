interface IQuestionAnswer {
    id: string,
    imageUrl: string,
    question: string,
    options: string[],
    answer: number,
    time: number,    
}

interface ITimerProps{
  timer: number,
  buttonPressedIndex: number,
  questionOptionsLength: number,
  totalTime: number,
}

type QuestionAnswerContextType = {  
  saveQuestionAnswers: (questionAnswers: IQuestionAnswer[]) => void,
  getQuestionAnswers: () => IQuestionAnswer[];
}