import * as SecureStore from "expo-secure-store";
import { Alert } from "react-native";
import { Dispatch } from 'redux';

export const TOGGLE_ONLINE = "TOGGLE_ONLINE";
export const SIGNUP = "SIGNUP";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const DELETE_USER = "DELETE_USER";
export const RESTORE_USER = "RESTORE_USER";
export const EDIT_PROFILE = "EDIT_PROFILE";
export const GET_USERINFO = "GET_USERINFO";


// Intialstate for currentUser
const initialState: InitialUserState = {
  localId: '',
  displayName: 'John Doe State ',
  idToken: undefined,
  email: 'state@redux.com',
  emailVerified: false,
  createdAt: '',
  lastLoginAt: '',
  isOnline: false,
}

export interface InitialUserState {
  localId: string
  displayName: string | undefined
  idToken: undefined | undefined
  email: string | undefined
  emailVerified: boolean | false
  createdAt: string | undefined
  lastLoginAt: string | undefined
  isOnline: boolean | false
}

// Logout User script
export const logout = () => {
  SecureStore.deleteItemAsync("email");
  SecureStore.deleteItemAsync("idToken");
  return { type: LOGOUT };
};

// Restore User script
export const restoreUser = ( 
  idToken: undefined, 
  localId: string,
  email: string, 
  displayName: string, 
  emailVerified: string,
  lastLoginAt: string,
  createdAt: string,) => {
  return {
    type: RESTORE_USER,
    payload: {  idToken, localId, email, displayName, emailVerified, lastLoginAt, createdAt  },
  };
};

// Delete User script
export const delete_user = (idToken: undefined) => {
  return async (dispatch: any, getState: any) => {
    console.log("idTokenid:", idToken);
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:delete?key=AIzaSyDAqWRKUJZlh1-T8bUJVmaqW-E8chcZywc",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idToken: idToken,
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
        payload: { idToken: data.idToken },
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
      dispatch({
        type: SIGNUP,
        payload: { email: data.email, idToken: data.idToken },
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
      dispatch({
        type: LOGIN,
        payload: { email: data.email, idToken: data.idToken },
      });
    }
  };
};

// Update User script
export const edit_profile = (displayName: string) => {
  return async (dispatch: any, getState: any) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDAqWRKUJZlh1-T8bUJVmaqW-E8chcZywc",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          displayName: displayName,
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
      dispatch({
        type: EDIT_PROFILE,
        payload: { displayName: data.displayName, photoUrl: data.photoUrl },
      });
    }
  };
};

// DGetUserInfo script
export const get_UserInfo = (idToken: undefined) => {
  return async (dispatch: any, getState: any) => {
    console.log("idTokenid:", idToken);
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
    console.log(data);
    if (!response.ok) {
      Alert.alert("Something went wrong!", "Contact an administrator", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    } else {
      await SecureStore.setItemAsync(
        "displayName",
        JSON.stringify(data.users[0].displayName));
        await SecureStore.setItemAsync(
          "localId",
          JSON.stringify(data.users[0].localId));
      await SecureStore.setItemAsync("email",  
        JSON.stringify(data.users[0].email));
      await SecureStore.setItemAsync(
        "emailVerified",
        JSON.stringify(data.users[0].emailVerified));
      await SecureStore.setItemAsync(
        "lastLoginAt",
        JSON.stringify(data.users[0].lastLoginAt));
      await SecureStore.setItemAsync(
        "createdAt",
        JSON.stringify(data.users[0].createdAt));
      dispatch({
        type: GET_USERINFO,
        payload: {
          displayName: data.users[0].displayName,
          email: data.users[0].email,
          localId: data.users[0].localId,
          emailVerified: data.users[0].emailVerified,
          lastLoginAt: data.users[0].lastLoginAt,
          createdAt: data.users[0].createdAt,
        },
      });
    }
  };
};
