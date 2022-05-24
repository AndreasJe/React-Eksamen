import React from 'react';
 import { Button, TextInput, View } from 'react-native';
 import { Formik } from 'formik';
import { edit_profile } from '../store/actions/UserActions';
 
 export const EditProfileForm = props => (
   <Formik
     initialValues={{ displayName: '',  imgUrl: ''}}
     onSubmit={values => console.log(values)}
     handleSubmit{...edit_profile(displayName,imgUrl)}
   >
     {({ handleChange, handleBlur, handleSubmit, values }) => (
       <View>
         <TextInput
           placeholder='Display Name'
           onChangeText={handleChange('displayName')}
           onBlur={handleBlur('displayName')}
           value={values.displayName}
         />
         <TextInput
           placeholder='Image URL'
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