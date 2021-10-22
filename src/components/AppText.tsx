import React from 'react';
import { StyleSheet, Text} from 'react-native';
import { useFonts } from 'expo-font';

interface IAppTextProps {
  fontSize: number,
  color: string,  
  children: string,
}

export default (props: IAppTextProps): JSX.Element => {
  let [fontsLoaded] = useFonts({
    'PressStart2P': require('../../assets/fonts/PressStart2P-Regular.ttf'),
  });
  
  if(!fontsLoaded)
    return <></>
  else
    return (
      <Text
        style={styles(props).AppText__text}
      >
        {props.children}
      </Text>
    )
}

export const styles = (props: IAppTextProps) => StyleSheet.create({
  AppText__text: {
    fontSize: props.fontSize,
    color: props.color,
    textAlign: 'center',
    fontFamily:'PressStart2P'
  }
})