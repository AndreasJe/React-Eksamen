import { StyleSheet, View, Text, Button, TouchableOpacity } from 'react-native';
import { useDispatch, getState } from 'react-redux';
import { useEffect } from 'react'
import { logout, delete_user } from '../store/actions/UserActions';
import * as SecureStore from "expo-secure-store";
import React from 'react';

const ProfileScreen = ({ navigation }) => {
    const dispatch = useDispatch()
    


    // Første forsøg:
    async function deleteAction() {
        let tokenFromSecureStore = await SecureStore.getItemAsync('token');
        if (tokenFromSecureStore) {
            console.log("success", tokenFromSecureStore);
            

            dispatch(delete_user(JSON.stringify(tokenFromSecureStore)));

        } else {
          console.log("Sorry, i could not delete your user");
        }
    }

    
// Andet forsøg:
// async function deleteAction(token) {
  
//   let result: string = getState().user.idToken
//   if (result) {
//     alert("🔐 Here's your value 🔐 \n" + result);
//     dispatch(delete_user(result))
//   } else {
//     alert('No token found. Logout and login again');
//   }
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

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  logo: {
    width: 100,
    height: 180,
    alignSelf: "center",
    marginTop: 30,
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },
  buttonContainer: {
    backgroundColor: "#5050a5",
    justifyContent: "center",
    padding: 16,
    marginLeft: 35,
    marginRight: 35,
    marginBottom: 5,
    borderRadius: 10,
    height: 60,
  },
  copy: {
    flexDirection: "row",
    alignSelf: "center",
  },
  copyText: {
    color: "#5050a5",
    fontSize: 16,
  },
  copyLink: {
    color: "#5050a5",
    fontSize: 16,
    fontWeight: "700",
    marginLeft: -4,
  },
  header: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 20,
    color: "#32305d",
    padding: 20,
  },
  input: {
    borderColor: "#00000070",
    borderWidth: 1,
    marginLeft: 40,
    marginRight: 40,
    margin: 0,
    height: 60,
    borderRadius: 4,
    padding: 10,
  },
  shadow: {
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.9,
    shadowRadius: 4.65,
    elevation: 8,
  },
});

export default ProfileScreen;