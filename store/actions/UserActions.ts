import * as SecureStore from "expo-secure-store";
import { Alert } from "react-native";
import { Dispatch } from 'redux';

export const SIGNUP = "SIGNUP";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const DELETE_USER = "DELETE_USER";
export const RESTORE_USER = "RESTORE_USER";
export const EDIT_PROFILE = "EDIT_PROFILE";
export const GET_USERINFO = "GET_USERINFO";



// Logout User script
export const logout = () => {
  SecureStore.deleteItemAsync("email");
  SecureStore.deleteItemAsync("token");
  return { type: LOGOUT };
};

// Restore User script
export const restoreUser = (email: undefined, token: undefined, displayName: string) => {
  return {
    type: RESTORE_USER,
    payload: { email, idToken: token, displayName },
  };
};

// Delete User script
export const delete_user = (token: undefined) => {
  return async (dispatch: any, getState: any) => {
    console.log("tokenid:", token);
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:delete?key=AIzaSyDAqWRKUJZlh1-T8bUJVmaqW-E8chcZywc",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idToken: token,
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
      await SecureStore.setItemAsync("token", data.idToken);
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
      await SecureStore.setItemAsync("token", data.idToken);
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
      await SecureStore.setItemAsync("token", data.idToken);
      dispatch({
        type: LOGIN,
        payload: { email: data.email, idToken: data.idToken },
      });
    }
  };
};

// Update User script
export const edit_profile = (displayName: string, photoUrl: string) => {
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
          photoUrl: photoUrl,
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
export const get_UserInfo = (token: undefined) => {
  return async (dispatch: any, getState: any) => {
    console.log("tokenid:", token);
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDAqWRKUJZlh1-T8bUJVmaqW-E8chcZywc",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idToken: token,
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
        JSON.stringify(data.users.displayName)
      );
      await SecureStore.setItemAsync(
        "photoUrl",
        JSON.stringify(data.users.photoUrl)
      );
      await SecureStore.setItemAsync("email", JSON.stringify(data.users.email));
      await SecureStore.setItemAsync(
        "emailVerified",
        JSON.stringify(data.users.emailVerified)
      );
      await SecureStore.setItemAsync(
        "lastLoginAt",
        JSON.stringify(data.users.lastLoginAt)
      );
      await SecureStore.setItemAsync(
        "createdAt",
        JSON.stringify(data.users.createdAt)
      );
      dispatch({
        type: GET_USERINFO,
        payload: {
          displayName: data.users.displayName,
          photoUrl: data.users.photoUrl,
          email: data.users.email,
          emailVerified: data.users.emailVerified,
          lastLoginAt: data.users.lastLoginAt,
          createdAt: data.users.createdAt,
        },
      });
    }
  };
};
