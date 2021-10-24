import React, {useContext, useEffect, useState} from 'react';
import { StyleSheet, TouchableOpacity, View, Image  } from 'react-native';
import AppText from './AppText';
import { QuestionAnswerContext } from '../context/questionAnswerContext';
import Colors from '../utils/colors';
import delay from '../utils/delay';
import Timer from './Timer'

const QuizPage = ({navigation}) : JSX.Element => {
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [countCorrectQuestions, setCountCorrectQuestions] = useState(0);  
  const [buttonPressed, setButtonPressed] = useState(-1);
  const [showAnswer, setShowAnswer] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [timer, setTimer] = React.useState(10);

  const {getQuestionAnswers} = useContext(QuestionAnswerContext) as unknown as QuestionAnswerContextType;
  
  let { id, imageUrl, question, options, answer, time} = getQuestionAnswers()[currentQuestionIndex];
  
  const onPress = async (index:number) : Promise<void> =>{
    setCountCorrectQuestions( prev => index === answer ? prev + 1 : prev );
    setButtonPressed(index);    
  };  

  useEffect(()=>{ setTimer(time) },[])

  useEffect(() => {
    (async () =>{

      if(timer ===0){
        if(buttonPressed === -1)
          onPress(options.length);        
        else 
          setShowAnswer(true);

        await delay();    
        if(currentQuestionIndex !== getQuestionAnswers().length-1) 
          setCurrentQuestionIndex(prev => prev + 1);
        
        if(currentQuestionIndex === getQuestionAnswers().length-1)
          setQuizComplete(true);
        
        setTimer(time) 
        setButtonPressed(-1);
        setShowAnswer(false);
        return;
      }

      timer > 0 && setTimeout(() => setTimer(timer - 1), 1000);    
    })();
  }, [timer]);  

  useEffect(()=>{
    if(currentQuestionIndex === 0) return;
    
    if(currentQuestionIndex === getQuestionAnswers().length-1) {      
      navigation.navigate('GameOverPage',{ countCorrectQuestions });
      return;
    }
  },
  [quizComplete])
  
  const questionCard = () : JSX.Element => {

    return (
      <View key={`${id}-question`} style={{width:'100%'}} >
        <View style={{width:'100%'}}>
          <AppText {...styles.quizPage__question__question_text}
            >
            {question}
          </AppText>            
        </View>        
      {
        options.map((option,index)=>{          
          
          let appTextProps = showAnswer ?
            {...styles.quizPage__question__options_text}            
          :          
            buttonPressed === index && buttonPressed > -1 ? {...styles.quizPage__question__options_text}
            : buttonPressed !== index && buttonPressed > -1 ? {...styles.quizPage__question__options_text__not_pressed}
            : {...styles.quizPage__question__options_text};

          let buttonStyle = 
            showAnswer ?
            [ buttonPressed === index && index === answer && styles.quizPage__button__is_answer,
              buttonPressed === index && index !== answer && styles.quizPage__button__is_not_answer,
              buttonPressed !== index && index === answer && styles.quizPage__button__is_answer,              
              buttonPressed !== index && index !== answer && {...styles.quizPage__button__not_pressed, ...styles.quizPage__button}, 
              {flexDirection: 'row', justifyContent:'center'}
            ]
            :
            [styles.quizPage__button, 
              buttonPressed === index && styles.quizPage__button__pressed,
              buttonPressed !== index && buttonPressed > -1 && styles.quizPage__button__not_pressed
            ];
          
          return (
            <View key={`${id}-${index}`} style={{width:'100%'}} >
              <TouchableOpacity
                style={buttonStyle}
                onPress={()=>onPress(index)}
                activeOpacity={0.75}              
                disabled={buttonPressed !== -1 || timer === 0}
              >
                <AppText {...appTextProps}
                >
                  {option}                  
                </AppText>
                { 
                  showAnswer && ((buttonPressed === index && index === answer) || (buttonPressed !== index && index === answer)) &&
                  <View                       
                    style={styles.quizPage__button_icon__container} 
                    >
                  <Image 
                    style={styles.quizPage__button_icon__image}                    
                    source={require('../../assets/greenCheck.png')} />
                  </View>
                }
                { 
                  showAnswer && 
                  (buttonPressed === index && index !== answer) &&                  
                  <View                       
                    style={styles.quizPage__button_icon__container} 
                    >
                  <Image 
                    style={styles.quizPage__button_icon__image}                    
                    source={require('../../assets/redX.png')} />
                  </View>
                }
                
              </TouchableOpacity>              
            </View>
          )
        })
      }
      </View>)
    }

  let timerProps = {timer: timer, buttonPressedIndex: buttonPressed, questionOptionsLength: options.length, totalTime: time};

  return (
    <View style={styles.quizPage__container}>
      <View style={{justifyContent:"flex-end", width:"100%", height: "100%"}}>
        <Timer {...timerProps} />
      </View>      
      {questionCard()}
      <View style={styles.quizPage__border__bottom} />
    </View>
  )
}

const styles = StyleSheet.create({
  quizPage__container: {
    flex:1,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },  
  quizPage__button: {    
    width: '100%',
    backgroundColor: Colors.blue_azure_medium,
    paddingTop: 20,
    paddingBottom: 10,
    borderRadius: 0,
    borderColor: Colors.blue_azure_darkest,
    borderWidth: 5,
    borderBottomWidth: 0,
  },  
  quizPage__question__options_text: {
    color: Colors.white_azure_pale,
    fontSize: 10,
    lineHeight: 15
  },
  quizPage__question__options_text__not_pressed: {
    color: Colors.grey_slate,
    fontSize: 10,
    lineHeight: 15
  },
  quizPage__question__question_text: {
    color: Colors.blue_azure_dark,
    backgroundColor: Colors.white_azure_pale,
    fontSize: 12,
    lineHeight: 20,
    padding: 10,
    paddingBottom: 5,
  },
  quizPage__button__pressed: {
    backgroundColor: Colors.orange_light,
  },
  quizPage__button__not_pressed: {
    backgroundColor: Colors.blue_azuer_darker,
  },
  quizPage__button__is_answer: {
    backgroundColor: Colors.green_teal,
    width: '100%',    
    paddingTop: 20,
    paddingBottom: 10,
    borderRadius: 0,
    borderColor: Colors.blue_azure_darkest,
    borderWidth: 5,
    borderBottomWidth: 0,    
  },
  quizPage__button__is_not_answer: {
    backgroundColor: Colors.red_light,    
    width: '100%',    
    paddingTop: 20,
    paddingBottom: 10,
    borderRadius: 0,
    borderColor: Colors.blue_azure_darkest,
    borderWidth: 5,
    borderBottomWidth: 0,    
  },
  quizPage__button_icon__container: {
    position:'absolute',
    overflow: 'visible',
    right:15,
    top:0,
    backgroundColor: 'transparent',
  },
  quizPage__button_icon__image: {
    backgroundColor: 'transparent',                    
    width: 55,
    height: 45,
  },
  quizPage__border__bottom: {
    width: '100%', 
    height: 5, 
    backgroundColor: Colors.blue_azure_darkest 
  },
  // quizPage__timer__container: {
  //   alignItems: 'center',
  //   backgroundColor:'transparent',
  //   justifyContent: 'center'
  // },
  // quizPage__timer__text: {
  //   height: 70, 
  //   backgroundColor: 'transparent', 
  //   fontSize: 20,     
  //   position: 'absolute' 
  // },
  
});

export default QuizPage;