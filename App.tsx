import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StartPage from './src/components/StartPage';
import QuizPage from './src/components/QuizPage';
import GameOverPage from './src/components/GameOverPage';
import QuestionAnswerProvider from './src/context/questionAnswerContext';

const Stack = createNativeStackNavigator();

export default function App() {

  useEffect(()=>{
    StatusBar.setHidden(true);
  },[]);

  return (
    
    <QuestionAnswerProvider >
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="StartPage"
          screenOptions={{
            headerShown: false
          }}
        >          
          <Stack.Screen name="StartPage" component={StartPage} />        
          <Stack.Screen name="QuizPage" component={QuizPage} />
          <Stack.Screen name="GameOverPage" component={GameOverPage} />
          
        </Stack.Navigator>
      </NavigationContainer>
      </QuestionAnswerProvider >
    
  );
}