import { Alert } from "react-native";
import { Chatroom } from "../../entities/Chatroom";


export const TOGGLE_HAPPY = 'TOGGLE_HAPPY';
export const ADD = 'ADD';
export const SUBTRACT = 'SUBTRACT';
export const ADD_CHATROOM = 'ADD_CHATROOM';
export const DELETE_CHATROOM = 'DELETE_CHATROOM';
export const FETCH_CHATROOMS = 'FETCH_CHATROOMS';

export const toggleHappy = () => {
    return { type: TOGGLE_HAPPY };
};

export const add = () => {
    return { type: ADD };
};

export const subtract = () => {
    return { type: SUBTRACT };
};

export const fetchChatrooms = () => {
    return async (dispatch: any, getState: any) => {
        const idToken = getState().user.idToken

        const response = await fetch(
            'https://react-first-41bb5-default-rtdb.europe-west1.firebasedatabase.app/chatrooms.json?auth='
            + idToken, {

            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });


        const data = await response.json(); // json to javascript
        console.log(data);
        if (!response.ok) {
            Alert.alert(
              "Something went wrong!",
              "App couldn't fetch chatrooms. Contact the administrator or try again later",
              [
                { text: "OK", onPress: () => console.log("OK Pressed") },
              ]
            );
        } else {

            let chatrooms = [];
            for (const key in data) {
                let chatroom = new Chatroom(data[key].chatroomName, [], '', key)
                chatrooms.push(chatroom)
            }

            dispatch({ type: FETCH_CHATROOMS, payload: chatrooms })
        }
    };
}

export const addChatroom = (chatroomName: string) => {
    return async (dispatch: any, getState: any) => {
        // const msg: Chatmessage = new Chatmessage('Hello', new Date()); //example of using typescript
        const idToken = getState().user.idToken

        const response = await fetch(
            'https://react-first-41bb5-default-rtdb.europe-west1.firebasedatabase.app/chatrooms.json?auth='
            + idToken, {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ //javascript to json
                //key value pairs of data you want to send to server
                // ...
                chatroomName
            })
        });


        const data = await response.json(); // json to javascript
        console.log(data);
        if (!response.ok) {
            Alert.alert(
              "Something went wrong!",
              "Logout and back in. Make sure to input a name for your chatroom",
              [
                { text: "OK", onPress: () => console.log("OK Pressed") },
              ]
            );
        } else {
            dispatch({ type: ADD_CHATROOM, payload: { chatroomName, id: data.name } })
        }
    };
};

export const deleteChatroom = (id: string) => {
    return async (dispatch: any, getState: any) => {
        let idToken: string = getState().user.idToken

        const response = await fetch(
            'https://react-first-41bb5-default-rtdb.europe-west1.firebasedatabase.app/chatrooms/' + id + '.json/?auth='
            + idToken, {

            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        });


        const data = await response.json(); // json to javascript
        console.log(data);
        if (!response.ok) {
            Alert.alert(
              "Something went wrong!",
              "There was a problem deleting the classroom",
              [
                { text: "OK", onPress: () => console.log("OK Pressed") },
              ]
            );
        } else {
            dispatch({ type: DELETE_CHATROOM, payload: id })
        }
    };
}

