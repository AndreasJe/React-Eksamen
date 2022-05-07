import * as SecureStore from "expo-secure-store";
import { Alert } from "react-native";

export const SIGNUP = "SIGNUP";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const RESTORE_USER = "RESTORE_USER";

export const logout = () => {
  SecureStore.deleteItemAsync("email");
  SecureStore.deleteItemAsync("token");
  return { type: LOGOUT };
};

export const restoreUser = (email, token) => {
  return { type: RESTORE_USER, payload: { email, idToken: token } };
};

export const signup = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDAqWRKUJZlh1-T8bUJVmaqW-E8chcZywc",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          //javascript to json
          //key value pairs of data you want to send to server
          // ...
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    // console.log(await response.json());

    const data = await response.json(); // json to javascript
    console.log(data);
    if (!response.ok) {
      Alert.alert(
        "Something went wrong!",
        "Make sure your email is valid, and your password is longer that 8 characters",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]
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

export const login = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDAqWRKUJZlh1-T8bUJVmaqW-E8chcZywc",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          //javascript to json
          //key value pairs of data you want to send to server
          // ...
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    // console.log(await response.json());

    const data = await response.json(); // json to javascript
    console.log(data);
    if (!response.ok) {
      Alert.alert(
        "Something went wrong!",
        "Make sure your email and password is correct",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]
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
