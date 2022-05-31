import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import styles from "../constants/styles";

const Input = props => {
  const [text, setText] = useState(props.inputValue)
  const [entered, setEntered] = useState(false);

  const handleChangeText = (text) => {
      setEntered(true);
      setText(text);
      if (text === '') {
          props.setValid(false);
      } else {
          props.setValid(true);
      }
  }
  const handleOnBlur = () => {
      setEntered(true);
  }

  return (
      <View>
          <Text style={styles.label}>{props.label}</Text>
          <TextInput 
          style={styles.input}
          value={text} 
          onChangeText={handleChangeText} 
          placeholder={props.placeholder} 
          onBlur={handleOnBlur} />
          {!props.valid && entered ? <Text style={styles.errormsg}>{props.error}</Text> : <></>}
      </View>
  );
}

export default Input;