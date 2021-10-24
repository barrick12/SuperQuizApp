// @ts-nocheck
import React  from 'react';
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import AppText from './AppText';
import Colors from "../utils/colors";
import SpriteSheet from 'rn-sprite-sheet';
import Images from "../utils/sprites";
import delay from "../utils/delay"

export class PlayerSprite extends React.Component {

  constructor(props) {
    super(props);
    this.player = null;
  }
  
  idleAnim = () => {
    this.player.play({
      type: "idle",
      fps: 1,
      loop: true,
      resetAfterFinish: true,
    })
  }

  attackAnim = () => {
    this.player.play({
      type: "attack",
      fps: 6,
      loop: false,
      resetAfterFinish: true,
      onFinish: ()=>{
        this.idleAnim();
      }
    })
  }

  componentDidMount = ()=>{    
    this.idleAnim();
  }

  render(){
    return (
      <View style={{margin: 0, padding: 0}}>
        <SpriteSheet
          ref={ref => this.player = ref}
          source={Images.player}
          columns={12}          
          rows={2}
          width={297}
          // height={144} // set either, none, but not both
          // width={177}
          // frameHeight={48} // manually set size of your sprite
          // frameWidth={96} // overrides auto calculation of frame size based on height, width, columns, and rows.
          // offsetX={0}
          // offsetY={0}
          // imageStyle={{ marginTop: -1 }}
          
          animations={{
            idle: [12,15,12,16],
            attack: [13,14,12,13,14,12],            
          }}
        />
      </View>
      
      
    )
  }  
}

export class EnemySprite extends React.Component {

  constructor(props) {
    super(props);
    this.enemy = null;
  }
  
  idleAnim = () => {
    this.enemy.play({
      type: "idle",
      fps: 8,
      loop: true,
      resetAfterFinish: true,

    })
  }

  attackAnim = () => {
    this.enemy.play({
      type: "attack",
      fps: 8,
      loop: false,
      resetAfterFinish: true,
      onFinish: ()=>{
        this.idleAnim();
      }
    })
  }

  hitAnim = () => {
    this.enemy.play({
      type: "hit",
      fps: 1,
      loop: false,
      resetAfterFinish: true,
      onFinish: async ()=>{
        await delay(1500);
        this.idleAnim();
      }
    })
  }

  componentDidMount = ()=>{
    this.idleAnim();    
  }

  render(){
    return (
      <View style={{margin: 0, padding: 0}}>
        <SpriteSheet
          ref={ref => this.enemy = ref}
          source={Images.enemy}
          columns={8}          
          rows={5}
          width={228}
                    
          animations={{          
            idle: [4,5,6,7],
            attack: [23,22,21,20,19,18,17,18,23,22,21,20,19,18,17],
            hit: [29],   
          }}
        />
      </View>
    )
  }  
}



