interface IQuestionAnswer {
    id: string,
    imageUrl: string,
    question: string,
    options: string[],
    answer: number,
    time: number,    
}

type QuestionAnswerContextType = {  
  saveQuestionAnswers: (questionAnswers: IQuestionAnswer[]) => void,
  getQuestionAnswers: () => IQuestionAnswer[];
}