import React, { useEffect } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StartPage from './src/components/StartPage';
import QuizPage from './src/components/QuizPage';
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
          
        </Stack.Navigator>
        
      </NavigationContainer>
      </QuestionAnswerProvider >
    
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });