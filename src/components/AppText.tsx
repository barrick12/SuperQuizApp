import React from 'react';
import { StyleSheet, Text} from 'react-native';
import { useFonts } from 'expo-font';

// interface IAppTextProps {  
//   children: string,
// }

// export default (props: IAppTextProps): JSX.Element => {
export default (props): JSX.Element => {
  const { children, ...rest} = props;
  let [fontsLoaded] = useFonts({
    'PressStart2P': require('../../assets/fonts/PressStart2P-Regular.ttf'),
  });
  
  if(!fontsLoaded)
    return <></>
  else
    return (
      <Text
        style={styles({...rest}).AppText__text}
      >
        {props.children}
      </Text>
    )
}

// export const styles = (props: IAppTextProps) => StyleSheet.create({
export const styles = (props) => StyleSheet.create({
  AppText__text: {
    ...props,    
    textAlign: 'center',
    fontFamily:'PressStart2P'
  }
})