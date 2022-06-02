import { StatusBar, View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useDispatch, useSelector} from 'react-redux';
import { logout, delete_user } from '../store/actions/UserActions';
import * as SecureStore from "expo-secure-store";
import React, { useState } from 'react';
import styles from "../constants/styles";
import Ionicons from '@expo/vector-icons/Ionicons';
import { RootState } from '../App';
const defaultImage = require("../assets/defaultImage.png");



const ProfileScreen = ({ navigation }: { navigation: any }) => {
  const dispatch = useDispatch()
  const active = useSelector((state : RootState) => state.user.idToken);
  const user = useSelector((state: RootState) => state.user)
  const chat = useSelector((state: RootState) => state.chat)



    async function deleteAction() {
      let tokenFromSecureStore  = await SecureStore.getItemAsync('idToken');
      if (tokenFromSecureStore) {
          console.log("success", tokenFromSecureStore);

          dispatch(delete_user(tokenFromSecureStore));

      } else {  
          console.log("Couldn't load from the SecureStore");
      }
  }


    return (
      <ScrollView style={styles.mainContainer}>
        <View style={styles.StatusBar}>
          <StatusBar translucent barStyle="light-content" />
        </View>
        <View style={styles.blockHeader}>
            <Ionicons name="grid-outline" style={styles.headerIkon}></Ionicons>
          <Text style={styles.blockHeaderText}>Menu:</Text>
        </View> 

        <View style={styles.flexContainer}>
        <View style={styles.userDetails}>
          <Text style={styles.subHeader}>Hello, {user.displayName} </Text>
          <Text style={styles.copyText}>Here is your profile information. If you want to change it or escape our hold, follow the options below.</Text>
        <View></View>
        </View>


        <View style={styles.avatarContainer}>
          <Image style={styles.avatarDef} source={defaultImage} />
        </View>

        </View>

        
        <View style={styles.userDetailsStore}>
        <Text style={styles.type}>DisplayName:</Text><Text  style={styles.value}>{user.displayName}</Text>
        </View>
        <View style={styles.userDetailsStore}>
        <Text style={styles.type}>IdToken:</Text>
        
        <View style={styles.value}>
        {active !== undefined ? (
            <Ionicons name="key" style={styles.validToken}></Ionicons>
        ) : (<Ionicons name="key" style={styles.invalidToken}></Ionicons>)}</View>
        </View>
        <View style={styles.userDetailsStore}>
        <Text style={styles.type}>Email:</Text><Text  style={styles.value}>{user.email}</Text>
        </View>
        <View style={styles.userDetailsStore}>
        <Text style={styles.type}>LocalID:</Text><Text  style={styles.value}>{user.localId}</Text>
        </View>
     

        <View style= {{justifyContent:'flex-end'}}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => navigation.navigate("EditProfile")}
          >
              <Text style={styles.buttonText}> Edit Profile</Text>
          </TouchableOpacity>
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
      </ScrollView>
    );
}


export default ProfileScreen;