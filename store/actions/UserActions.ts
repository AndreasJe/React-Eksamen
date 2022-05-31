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

export const restoreUser = (email: any, idToken:any) => {
  return { type: RESTORE_USER, payload: { email, idToken: idToken } };
};

// Delete User script
export const delete_user = (idToken: undefined) => {
  return async (dispatch: any, getState: any) => {
    const idToken = getState().user.idToken
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
      await SecureStore.setItemAsync("localId", data.localId);
      await SecureStore.setItemAsync("refreshToken", data.refreshToken);
      dispatch({
        type: SIGNUP,
        payload: { email: data.email, idToken: data.idToken, localId: data.localId, refreshToken: data.refreshToken },
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
        await SecureStore.setItemAsync("displayName", data.displayName);
        await SecureStore.setItemAsync("localId", data.localId);
        await SecureStore.setItemAsync("refreshToken", data.refreshToken);
        dispatch({
          type: LOGIN,
          payload: { email: data.email, idToken: data.idToken, displayName: data.displayName, refreshToken: data.refreshToken },
        });
      }
    };
  };

// Update User script
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
          displayName: data.users[0].displayName,
          localId: data.users[0].localId,
          email: data.users[0].email,
          emailVerified: data.users[0].emailVerified,
          lastLoginAt: data.users[0].lastLoginAt,
          createdAt: data.users[0].createdAt,
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
      `https://react-first-41bb5-default-rtdb.europe-west1.firebasedatabase.app/userData/${localId}.json?auth=${idToken}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          idToken: idToken,
          displayName: displayName,
          localId: localId,
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
      console.log("Here is your new name:" + displayName)
      dispatch({
        type: EDIT_NAME,
        payload: {  
          displayName: displayName,
          idToken: idToken,
          localId: localId,
      }})
    }
  };
};
