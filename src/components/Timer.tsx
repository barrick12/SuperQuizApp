import React  from 'react';
import { StyleSheet, View } from 'react-native';
import AppText from './AppText'
import Colors from "../utils/colors"

import * as Progress from 'react-native-progress';

const Timer = (props: ITimerProps) : JSX.Element => {
  const {timer,buttonPressedIndex,questionOptionsLength,totalTime} = props;

  return (
  <View style={styles.timer__container}>
      {
        timer === 0 && buttonPressedIndex === questionOptionsLength ?
        <AppText {...{          
          ...styles.timer__text,
          color: timer < 4 ? Colors.red_light : Colors.green_bright, 
          }} >
        Time's Up!
        </AppText>
        :
        <>
          <AppText {...{...styles.timer__text__number, color: timer < 4 ? Colors.red_light : Colors.green_bright}}>
            {timer === 0 ? "" : timer}
          </AppText>          
          <Progress.Circle
            progress={timer/totalTime || 0}
            thickness={15}
            borderWidth={2} 
            borderColor={'white'}
            color={timer < 4 ? Colors.red_light : Colors.green_bright}
            size={100}
            
            animated={false}
          />
        </>
      }
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
  timer__container: {
    alignItems: 'center',
    backgroundColor:'transparent',
    justifyContent: 'center',
    marginBottom: 30
  },
  timer__text: {
    lineHeight: 20,
    paddingTop: 50,
    paddingBottom: 0,
    height: 100, 
    backgroundColor: 'transparent', 
    fontSize: 30,
  },
  timer__text__number: {    
    lineHeight: 20,
    padding: 10,
    paddingBottom: 5,
    height: 70, 
    backgroundColor: 'transparent', 
    fontSize: 20,     
    position: 'absolute',    
    paddingTop: 27, 
  }  
})

export default Timer;