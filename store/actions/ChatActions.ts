import { Alert } from "react-native";
import { Chatroom } from "../../entities/Chatroom";

export const ADD_CHATROOM = 'ADD_CHATROOM';
export const TOGGLE_ONLINE = 'TOGGLE_ONLINE';
export const DELETE_CHATROOM = 'DELETE_CHATROOM';
export const FETCH_CHATROOMS = 'FETCH_CHATROOMS';


export const toggleOnline = () => {
    console.log(isOnline)
    return { type: TOGGLE_ONLINE };
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
        if (!response.ok) {
            Alert.alert(
              "Something went wrong!",
              "Couldn't fetch chatrooms. Try to logout and in again.",
              [{ text: "OK", onPress: () => console.log("OK Pressed") }]
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
        const idToken: undefined = getState().user.idToken

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
        if (!response.ok) {
            Alert.alert(
              "Something went wrong!",
              "Chatroom could not be added. Contact the administrator",
              [{ text: "OK", onPress: () => console.log("OK Pressed") }]
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
              "Chatroom was not deleted. Try again later",
              [{ text: "OK", onPress: () => console.log("OK Pressed") }]
            );
        } else {
            dispatch({ type: DELETE_CHATROOM, payload: id })
        }
    };
}

function isOnline(isOnline: any) {
    throw new Error("Function not implemented.");
}

