import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import styles from "../constants/styles";

const Input = props => {
    const [text, setText] = useState(props.inputValue)
    const [entered, setEntered] = useState(false);


    const handleChangeText = (text) => {
        setText(text)
        setEntered(true)
        if (text === '') {
          props.setValid(false)
        } else {
            props.setValid(true)
        }
      }

    const handleOnBlur = (text) => {
        setEntered(true)
      }

    return (
        <View>
            <Text style={styles.label}>{props.label}</Text>
            <TextInput style={styles.input} value={text} onChangeText={handleChangeText} placeholder={props.placeholder} onBlur={handleOnBlur} />
            {!props.isValid && entered && <Text>{props.error}</Text>}
        </View>
    );
}

export default Input;