import React, { useEffect, useState } from "react";
import { StyleSheet, Button, TextInput, View, Text, Touchable, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import Input from "../Input";
import Ionicons from "@expo/vector-icons/Ionicons";
import styles from "../../constants/styles";
import { Formik } from 'formik';
import { addChatroom } from '../../store/actions/ChatActions';
import { edit_profile } from "../../store/actions/UserActions";


 const EditProfileForm = props => (
  <Formik
    initialValues={{ displayName: '', imgUrl: '' }}
    onSubmit={values => dispatch(edit_profile(displayName, imgUrl)) }
  >
    {({ handleChange, handleBlur, handleSubmit, values }) => (
      <View>
        <TextInput
          style={styles.formInput}
          placeholder='Username'
          onChangeText={handleChange('displayName')}
          onBlur={handleBlur('displayName')}
          value={values.displayName}
        />
        <TextInput
          style={styles.formInput}
          placeholder='Chatroom Title'
          onChangeText={handleChange('imgUrl')}
          onBlur={handleBlur('imgUrl')}
          value={values.imgUrl}
        />
        <Button onPress={handleSubmit} title="Submit" />
        
      </View>

    )}
  </Formik>
);


export default EditProfileForm;