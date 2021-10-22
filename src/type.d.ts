interface IQuestionAnswer {

    id: string,
    imageUrl: string,
    question: string,
    options: string[],
    answer: number,
    time: number,
    isCorrect: boolean,
}

type ContextType = {
  questionAnswers: IQuestionAnswer[]
  saveQuestionAnswers: (questionAnswers: IQuestionAnswer[]) => void 
  updateQuestionAnswer: (id: string, isCorrect: boolean) => void  
}