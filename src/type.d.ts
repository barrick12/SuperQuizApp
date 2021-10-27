type QuestionAnswer = {
    id: string,
    imageUrl: string,
    question: string,
    options: string[],
    answer: number,
    time: number,    
}

type FetchQuestionAnswerResponse = {  
  imageUrl: string,
  question: string,
  options: string[],
  answer: number,
  time: number,    
}

//{showAnswer, buttonPressed, index, id, answer, onPress, timer, option}

type QuestionAnswerContextType = {  
  saveQuestionAnswers: (questionAnswers: QuestionAnswer[]) => void,
  getQuestionAnswers: () => QuestionAnswer[];
}

interface ITimerProps{
  timer: number,
  buttonPressedIndex: number,
  questionOptionsLength: number,
  totalTime: number,
}

// const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [countCorrectQuestions, setCountCorrectQuestions] = useState(0);  
//   const [buttonPressed, setButtonPressed] = useState(-1);
//   const [showAnswer, setShowAnswer] = useState<Boolean>(false);
//   const [quizComplete, setQuizComplete] = useState<Boolean>(false);
//   const [timer, setTimer] = React.useState(10);


interface IQuestionOptionsCard {
  showAnswer: boolean, 
  buttonPressed: number, 
  index: number,
  id: string,
  answer: number,
  timer: number,
  option: string,
  onPress: (value: number) => void
}