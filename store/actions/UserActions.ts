import * as SecureStore from "expo-secure-store";
import { Alert } from "react-native";
import { useSelector } from "react-redux";
import { Dispatch } from 'redux';
import { RootState } from "../../App";
import { User } from "../../entities/User";


export const TOGGLE_ONLINE = "TOGGLE_ONLINE";
export const SIGNUP = "SIGNUP";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const DELETE_USER = "DELETE_USER";
export const RESTORE_USER = "RESTORE_USER";
export const SETUP_PROFILE = "SETUP_PROFILE";
export const GET_USERINFO = "GET_USERINFO";
export const EDIT_NAME = "EDIT_NAME";




// Logout User script
export const logout = () => {
  SecureStore.deleteItemAsync("email");
  SecureStore.deleteItemAsync("idToken");
  return { type: LOGOUT };
};

export const restoreUser = ( idToken:any, localId:any, email: any, displayName:any, refreshToken:any,) => {
  return { type: RESTORE_USER, payload: { idToken: idToken, localId: localId, email: email, displayName:displayName, refreshToken:refreshToken  } };
};

// Delete User script
export const delete_user = (idToken: undefined) => {
  return async (dispatch: any, getState: any) => {
    const displayName = getState().user.displayName
    let idToken = await SecureStore.getItemAsync('idToken');
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:delete?key=AIzaSyDAqWRKUJZlh1-T8bUJVmaqW-E8chcZywc",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idToken: idToken,
          displayName: displayName,
        }),
      }
    );

    const data = await response.json();
    console.log(data);
    if (!response.ok) {
      Alert.alert("Something went wrong!", "Contact an administrator", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    } else {
      await SecureStore.setItemAsync("idToken", data.idToken);
      dispatch({
        type: DELETE_USER,
        payload: { idToken: data.idToken, displayName: displayName, },
      });
    }
  };
};

// Signup User script
export const signup = (email: undefined, password: undefined, displayName: string) => {
  return async (dispatch: any, getState: any) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDAqWRKUJZlh1-T8bUJVmaqW-E8chcZywc",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          displayName: displayName,
          returnSecureToken: true,
        }),
      }
    );

    const data = await response.json();
    console.log(data);
    if (!response.ok) {
      Alert.alert(
        "Something went wrong!",
        "Make sure your email is valid, and your password is longer that 8 characters",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }]
      );
    } else {
      await SecureStore.setItemAsync("email", data.email);
      await SecureStore.setItemAsync("idToken", data.idToken);
      await SecureStore.setItemAsync("localId", data.localId);
      await SecureStore.setItemAsync("displayName", data.displayName);
      await SecureStore.setItemAsync("refreshToken", data.refreshToken);
      dispatch({
        type: SIGNUP,
        payload: { idToken: data.idToken, localId: data.localId, email: data.email, displayName: data.displayName, createdAt: data.createdAt, refreshToken: data.refreshToken },
      });
    }
  };
};

// Login User script
export const login = (email: undefined, password: undefined) => {
  return async (dispatch: any, getState: any) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDAqWRKUJZlh1-T8bUJVmaqW-E8chcZywc",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    const data = await response.json();
    console.log(data);
    if (!response.ok) {
      Alert.alert(
        "Something went wrong!",
        "Make sure your email and password is correct",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }]
      );
    } else {
        await SecureStore.setItemAsync("email", data.email);
        await SecureStore.setItemAsync("idToken", data.idToken);
        await SecureStore.setItemAsync("localId", data.localId);
        await SecureStore.setItemAsync("refreshToken", data.refreshToken);
        dispatch({
          type: LOGIN,
          payload: { idToken: data.idToken, localId: data.localId, email: data.email, displayName: data.displayName, createdAt: data.createdAt, refreshToken: data.refreshToken },
        });
      }
    };
  };

// Setup User script
export const setup_profile = (displayName: string, eduProgram: string, firstName: string, lastName: string) => {
  return async (dispatch: any, getState: any) => {
    const idToken = getState().user.idToken
    const localId = getState().user.localId
    const response = await fetch(
      "https://react-first-41bb5-default-rtdb.europe-west1.firebasedatabase.app/users.json?auth="
        + idToken, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          localId: localId,
          displayName: displayName,
          eduProgram: eduProgram,
          firstName: firstName,
          lastName: lastName,
        }),
      }
    );

    const data = await response.json();
    console.log(data);
    if (!response.ok) {
      Alert.alert(
        "Something went wrong!",
        "Check inputs or try again later",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }]
      );
    } else {
      dispatch({
        type: SETUP_PROFILE,
        payload: {  
          localId: localId, 
          displayName: displayName, 
          eduProgram: eduProgram,
          firstName: firstName,
          lastName: lastName, },
      });
    }
  };
};


// OLD GET USER SCRIPT

export const get_UserInfo = () => {
  return async (dispatch: any, getState: any) => {
    const idToken = getState().user.idToken
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDAqWRKUJZlh1-T8bUJVmaqW-E8chcZywc",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body:  JSON.stringify({
          idToken: idToken,
        }),
      }
    );

    const data = await response.json();
    console.log("YEP, den kører")
    console.log(data);
    if (!response.ok) {
      Alert.alert("Something went wrong!", "Contact an administrator", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    } else {
    let userInfoArray = [];
    for (let key in data.users[0]) {
      const userObject = data[key]
      const userInfo = new User(userObject.displayName, userObject.localId, userObject.email, userObject.emailVerified, userObject.lastLoginAt, userObject.createdAt)
      console.log("data key", data[key])
      userInfoArray.push(userInfo)
      console.log(userInfoArray)

    }
      
      dispatch({
        type: GET_USERINFO,
        payload: {
          displayName: data.user.displayName,
          localId: data.user.localId,
          email: data.user.email,
          emailVerified: data.user.emailVerified,
          lastLoginAt: data.user.lastLoginAt,
          createdAt: data.user.createdAt,
        },
      });
    }
  };
};

// Update Only name script
export const edit_name = ( displayName: string) => {
  return async (dispatch: any, getState: RootState) => {    
    const localId = await SecureStore.getItemAsync('localId');
    console.log(localId)
    const idToken = await SecureStore.getItemAsync('idToken')
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDAqWRKUJZlh1-T8bUJVmaqW-E8chcZywc`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          idToken: idToken,
          displayName: displayName,
        }),
      }
    );

    const data = await response.text();
    console.log(data);
    if (!response.ok) {
      Alert.alert(
        "Something went wrong!",
        "Check inputs or try again later",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }]
      );
    } else {
      console.log("Here is your new name:" + displayName)
      dispatch({
        type: EDIT_NAME,
        payload: {  
          displayName: displayName,
          idToken: idToken,
      }})
    }
  };
};
