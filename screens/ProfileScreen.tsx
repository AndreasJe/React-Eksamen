import { StyleSheet, View, Text, Button, TouchableOpacity, Image } from 'react-native';
import { useDispatch, useSelector} from 'react-redux';
import { useEffect } from 'react';
import { logout, delete_user, get_UserInfo } from '../store/actions/UserActions';
import * as SecureStore from "expo-secure-store";
import React from 'react';
import styles from "../constants/styles";
import { RootState } from '../App';
const defaultImage = require("../assets/defaultImage.png");



const ProfileScreen = ({ navigation }: { navigation: any }) => {
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.user)


    async function deleteAction() {
      let tokenFromSecureStore = await SecureStore.getItemAsync('token');
      if (tokenFromSecureStore) {
          console.log("success", tokenFromSecureStore);

          dispatch(delete_user(tokenFromSecureStore));

      } else {  
          console.log("Couldn't load from the SecureStore");
      }
  }


  async function fetchUserInfo() {
    let tokenFromSecureStore = await SecureStore.getItemAsync("token");
    if (tokenFromSecureStore) {
      console.log("User data has been fetched");

      dispatch(get_UserInfo(tokenFromSecureStore));
    } else {
      console.log("Couldn't load tokenID from the SecureStore");
    }
  }

  useEffect(() => {
    fetchUserInfo(); // uncomment to read from secure store
  }, []);

    

    return (
        <View>
          <Button title="Edit Profile" onPress={() => navigation.navigate('EditProfile')} />
            <Text style={styles.header}>Profile:</Text>
            <Text>Hello, {user.displayName}</Text>
            <Image source={defaultImage} />
            <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => dispatch(logout())}
      >
        <Text style={styles.buttonText}> Logout</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => deleteAction()}
      >
        <Text style={styles.buttonText}> Delete user</Text>
      </TouchableOpacity>
        </View>
    );
}


export default ProfileScreen;