import * as SecureStore from "expo-secure-store";
import { Alert } from "react-native";

export const SIGNUP = "SIGNUP";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const DELETE_USER = "DELETE_USER";
export const RESTORE_USER = "RESTORE_USER";
export const EDIT_PROFILE = "EDIT_PROFILE";

// Logout User script
export const logout = () => {
  SecureStore.deleteItemAsync("email");
  SecureStore.deleteItemAsync("token");
  return { type: LOGOUT };
};

// Restore User script
export const restoreUser = (email, token, displayName) => {
  return {
    type: RESTORE_USER,
    payload: { email, idToken: token, displayName },
  };
};

// Delete User script
export const delete_user = (token) => {
  return async (dispatch) => {
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
        type: DELETE,
        payload: { idToken: data.idToken },
      });
    }
  };
};

// Signup User script
export const signup = (email, password, displayName) => {
  return async (dispatch) => {
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
export const edit_profile = (displayName, photoUrl) => {
  return async (dispatch) => {
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
