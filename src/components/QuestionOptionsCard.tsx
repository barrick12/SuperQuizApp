import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import AppText from './AppText';
import Images from '../utils/staticImages';
import Colors from '../utils/colors';

const QuestionOptionsCard = (props: IQuestionOptionsCard) => {  

  const {showAnswer, buttonPressed, index, id, answer, onPress, timer, option} = props;

  let appTextProps = showAnswer ?
    {...styles.questionOptionsCard__options_text}            
  :          
    buttonPressed === index && buttonPressed > -1 ? {...styles.questionOptionsCard__options_text}
    : buttonPressed !== index && buttonPressed > -1 ? {...styles.questionOptionsCard__options_text__not_pressed}
    : {...styles.questionOptionsCard__options_text};

  let buttonStyle: any[] = 
    showAnswer ?
    [ buttonPressed === index && index === answer && styles.questionOptionsCard__button__is_answer,
      buttonPressed === index && index !== answer && styles.questionOptionsCard__button__is_not_answer,
      buttonPressed !== index && index === answer && styles.questionOptionsCard__button__is_answer,              
      buttonPressed !== index && index !== answer && {...styles.questionOptionsCard__button__not_pressed, ...styles.questionOptionsCard__button}, 
      {flexDirection: 'row', justifyContent:'center'}
    ]
    :
    [styles.questionOptionsCard__button, 
      buttonPressed === index && styles.questionOptionsCard__button__pressed,
      buttonPressed !== index && buttonPressed > -1 && styles.questionOptionsCard__button__not_pressed
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
              style={styles.questionOptionsCard__button_icon__container} 
              >
            <Image 
              style={styles.questionOptionsCard__button_icon__image}                    
              source={Images.greenCheck} />
            </View>
          }
          { 
            showAnswer && 
            (buttonPressed === index && index !== answer) &&                  
            <View                       
              style={styles.questionOptionsCard__button_icon__container} 
              >
            <Image 
              style={styles.questionOptionsCard__button_icon__image}                    
              source={Images.redX} />
            </View>
          }
          
        </TouchableOpacity>              
      </View>
    )
        
}

const styles = StyleSheet.create({
  questionOptionsCard__button: {    
    width: '100%',
    backgroundColor: Colors.blue_azure_medium,
    paddingTop: 20,
    paddingBottom: 10,
    borderRadius: 0,
    borderColor: Colors.blue_azure_darkest,
    borderWidth: 5,
    borderBottomWidth: 0,
  },  
  questionOptionsCard__options_text: {
    color: Colors.white_azure_pale,
    fontSize: 10,
    lineHeight: 15
  },
  questionOptionsCard__options_text__not_pressed: {
    color: Colors.grey_slate,
    fontSize: 10,
    lineHeight: 15
  },
  questionOptionsCard__button__is_answer: {
    backgroundColor: Colors.green_teal,
    width: '100%',    
    paddingTop: 20,
    paddingBottom: 10,
    borderRadius: 0,
    borderColor: Colors.blue_azure_darkest,
    borderWidth: 5,
    borderBottomWidth: 0,    
  },
  questionOptionsCard__button__is_not_answer: {
    backgroundColor: Colors.red_light,    
    width: '100%',    
    paddingTop: 20,
    paddingBottom: 10,
    borderRadius: 0,
    borderColor: Colors.blue_azure_darkest,
    borderWidth: 5,
    borderBottomWidth: 0,    
  },
  
  questionOptionsCard__button__pressed: {
    backgroundColor: Colors.orange_light,
  },
  questionOptionsCard__button__not_pressed: {
    backgroundColor: Colors.blue_azuer_darker,
  },
  questionOptionsCard__button_icon__container: {
    position:'absolute',
    overflow: 'visible',
    right:15,
    top:0,
    backgroundColor: 'transparent',
  },
  questionOptionsCard__button_icon__image: {
    backgroundColor: 'transparent',                    
    width: 55,
    height: 45,
  },
})

export default QuestionOptionsCard;