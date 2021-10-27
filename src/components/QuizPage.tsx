import React, {useContext, useEffect, useState, useRef} from 'react';
import { StyleSheet, View, Image, Animated } from 'react-native';
import AppText from './AppText';
import { QuestionAnswerContext } from '../context/questionAnswerContext';
import Colors from '../utils/colors';
import delay from '../utils/delay';
import Timer from './Timer'
import Images from '../utils/staticImages';
import { PlayerSprite, EnemySprite } from './Sprite';
import QuestionOptionsCard from './QuestionOptionsCard';
import { QuestionAnswerContextType } from '../type';

const QuizPage = ({navigation}:any) : JSX.Element => {
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [countCorrectQuestions, setCountCorrectQuestions] = useState(0);  
  const [buttonPressed, setButtonPressed] = useState(-1);
  const [showAnswer, setShowAnswer] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [timer, setTimer] = React.useState(10);
  const fireAnim = useRef<Animated.Value>(new Animated.Value(-0.5)).current

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(
        fireAnim,        
        {
          toValue: 0.5,
          duration: 1,
          useNativeDriver: false,
        }),
        Animated.delay(250),
        Animated.timing(
          fireAnim,          
          {
            toValue: -0.5,
            duration: 1,
            useNativeDriver: false,
          },
        ),
        Animated.delay(250),
    ])).start();
  }, [fireAnim])

  const {getQuestionAnswers} = useContext(QuestionAnswerContext) as unknown as QuestionAnswerContextType;
  
  let { id, imageUrl, question, options, answer, time} = getQuestionAnswers()[currentQuestionIndex];
  
  let player = useRef(null);
  let enemy = useRef(null);

  const onPress = async (index:number) : Promise<void> =>{
    setCountCorrectQuestions( prev => index === answer ? prev + 1 : prev );
    setButtonPressed(index);    
  };  

  useEffect(()=>{ setTimer(time) },[])

  useEffect(() => {
    (async () =>{

      if(timer ===0){
        if(buttonPressed === -1){
          onPress(options.length);
          if(enemy?.current)
            //@ts-ignore
            enemy.current.attackAnim();        
        }
        else {
          
          if(buttonPressed === answer) {
            if(player?.current)
              //@ts-ignore
              player.current.attackAnim();
            if(enemy?.current)
              //@ts-ignore
              enemy.current.hitAnim();
          }
          else {
            if(enemy?.current)
              //@ts-ignore
              enemy.current.attackAnim();
          }
          setShowAnswer(true);
        }

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
          options.map((option,index)=> 
            QuestionOptionsCard({showAnswer, buttonPressed, index, id, answer, timer, option, onPress}))        
        }
        </View>)
      }

  let timerProps = {timer: timer, buttonPressedIndex: buttonPressed, questionOptionsLength: options.length, totalTime: time};
  
  return (
    <View style={styles.quizPage__container}>
      <Image
        style={styles.quizPage__image__billBoard}
        source={Images.billBoard}
      />
      <Image
        style={styles.quizPage__image__billBoard_ad}
        source={{uri: imageUrl}}
      />
      <Animated.View style={{
        position:"absolute",         
        top: 60,
        left: -80,
        zIndex: 1,
        opacity: buttonPressed !== answer && timer===0 ? 1 : 0,
        transform: [
          {scaleX: 
            fireAnim,
            },{scaleY: 0.5}            
          ]
        }}>
        <Image
          source={Images.fire}
        />        
      </Animated.View>
      
      <View style={styles.quizPage__sprite_container__player}>
        <PlayerSprite            
            ref={player}            
          />
      </View>
      <View style={styles.quizPage__sprite_container__enemy}>
        <EnemySprite
          ref={enemy}            
          />
      </View>
      <View style={styles.quizPage__timer_container}>
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
    backgroundColor: 'transparent',    
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  quizPage__question__question_text: {    
    color: Colors.white_azure_pale,    
    backgroundColor: Colors.blue_azure_dark,
    fontSize: 12,
    lineHeight: 20,
    padding: 10,
    paddingBottom: 5,
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
  quizPage__image__billBoard: {
    position: 'absolute', 
    top: 0, 
    left: 0, 
    height: '72%', 
    width: '100%',
    zIndex: -1,
    resizeMode: 'stretch',
  },
  quizPage__image__billBoard_ad: {
    position: 'absolute', 
    top: 74, 
    left: 68, 
    height: 250, 
    width: 250,        
  },
  quizPage__sprite_container__player: {
    position:"absolute", 
    top:120, 
    left: -40
  },
  quizPage__sprite_container__enemy: {
    position:"absolute",
    top:120,
    right: 0
  },
  quizPage__timer_container: {
    justifyContent:"flex-end", 
    width:"100%", 
    height: "100%"
  }
});

export default QuizPage;