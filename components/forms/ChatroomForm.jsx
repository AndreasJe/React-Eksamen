import React, { useEffect, useState } from "react";
import { StyleSheet, Button, TextInput, View, Text, Touchable, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import Input from "../Input";
import Ionicons from "@expo/vector-icons/Ionicons";
import styles from "../../constants/styles";
import { Formik } from 'formik';
import { addChatroom } from '../../store/actions/ChatActions';



  const ChatroomForm = props => (
  <Formik
    initialValues={{ chatroomName: 'ChatroomTitle' }}
    onSubmit={values => addChatroom(values)}
  >
    {({ handleChange, handleBlur, handleSubmit, values }) => (
      <View>
        <TextInput
          style={styles.formInput}
          placeholder='Chatroom Title'
          onChangeText={handleChange('chatroomName')}
          onBlur={handleBlur('chatroomName')}
          value={values.chatroomName}
        />
        <Button onPress={handleSubmit} title="Submit" />
        
      </View>

    )}
  </Formik>
);


export default ChatroomForm;