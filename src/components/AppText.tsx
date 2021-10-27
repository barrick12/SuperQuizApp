import React from 'react';
import { StyleSheet, Text} from 'react-native';
import { useFonts } from 'expo-font';
import Fonts from "../utils/fonts";
import { IAppTextProps } from '../type'

export default (props: IAppTextProps): JSX.Element => {
  const { children, ...rest} = props;
  let [fontsLoaded] = useFonts({
    'PressStart2P': Fonts.PressStart2P,
  });
  
  if(!fontsLoaded)
    return <></>
  else
    return (
      <Text
        style={styles({...rest}).AppText__text}
      >
        {children}
      </Text>
    )
}

export const styles = (props: any) => StyleSheet.create({
  AppText__text: {
    ...props,    
    textAlign: 'center',
    fontFamily:'PressStart2P'
  }
})