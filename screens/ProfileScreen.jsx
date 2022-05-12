import { StyleSheet, View, Text, Button, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { logout, delete_user } from '../store/actions/UserActions';
import * as SecureStore from "expo-secure-store";
import React from 'react';
import styles from '../constants/styles'


const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch()


    async function deleteAction() {
      let tokenFromSecureStore = await SecureStore.getItemAsync('token');
      if (tokenFromSecureStore) {
          console.log("success", tokenFromSecureStore);

          dispatch(delete_user(tokenFromSecureStore));

      } else {  
          console.log("Couldn't load from the SecureStore");
      }
  }



    // async function deleteAction() {
    //     let tokenFromSecureStore = await SecureStore.getItemAsync('token');
    //     if (tokenFromSecureStore) {
    //         console.log("success", tokenFromSecureStore);
            

    //         dispatch(delete_user(JSON.stringify(tokenFromSecureStore)));

    //     } else {
    //       console.log("Sorry, i could not delete your user");
    //     }
    // }

    

    return (
        <View>
            <Text>I am ProfileScreen</Text>
            <Button title="Edit Profile" onPress={() => navigation.navigate('EditProfile')} />
            <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => dispatch(logout())}
      >
        <Text style={styles.buttonText}> Logout</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => dispatch(deleteAction())}
      >
        <Text style={styles.buttonText}> Delete user</Text>
      </TouchableOpacity>
        </View>
    );
}


export default ProfileScreen;