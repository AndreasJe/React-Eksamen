import { Alert } from "react-native";
import { Event } from '../../entities/Event';


export const ADD_EVENT = 'ADD_EVENT';
export const FETCH_EVENTS = 'FETCH_EVENTS';


export const fetchEvents = () => {
    return async (dispatch: any, getState: any) => {
        const idToken = getState().user.idToken

        const response = await fetch(
            'https://react-first-41bb5-default-rtdb.europe-west1.firebasedatabase.app/events.json?auth='
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
              "App couldn't fetch events. Contact the administrator or try again later",
              [
                { text: "OK", onPress: () => console.log("OK Pressed") },
              ]
            );
        } else {

            let events = [];
            for (const key in data) {
                let event = new Event(data[key],'','','','','','', '','',key)
                events.push(event)
            }

            dispatch({ type: FETCH_EVENTS, payload: Event })
        }
        }
    };
    
export const addEvent = (Title: string, Description: string, ImgURL: string, Location: string,) => {
    return async (dispatch: any, getState: any) => {
         const idToken = getState().user.idToken

        const response = await fetch(
            'https://react-first-41bb5-default-rtdb.europe-west1.firebasedatabase.app/events.json?auth='
            + idToken, {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Title,
                Description,
                ImgURL,
                Location

            })
        });


        const data = await response.json(); // json to javascript
        console.log(data);
        if (!response.ok) {
            Alert.alert(
              "Something went wrong!",
              "Logout and back in. Make sure to input a name for your event",
              [
                { text: "OK", onPress: () => console.log("OK Pressed") },
              ]
            );
        } else {
            dispatch({ type: ADD_EVENT, payload: { Title, id: data.name, Description, ImgURL, } })
        }
    };
};
