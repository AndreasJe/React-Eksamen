import { Chatroom } from "../../entities/Chatroom";
import {
  ADD_CHATROOM,
  DELETE_CHATROOM,
  FETCH_CHATROOMS,
  TOGGLE_ONLINE,
} from "../actions/ChatActions";

const initialState = {
  chatrooms: [],
  isOnline: false,
  chatroomName: '',
  id: undefined,
};

export interface Action {
  isOnline: boolean | false;
  chatroomName: string | undefined;
  type: any | undefined;
  payload: any | undefined;
  id: string | undefined;
}
const chatReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case FETCH_CHATROOMS:
      return { ...state, chatrooms: action.payload };

    case TOGGLE_ONLINE:
      return { ...state, isOnline: !state.isOnline };

    case ADD_CHATROOM:
      console.log(action.payload.chatroomName); 

      const chatroom = new Chatroom(
        action.payload.chatroomName,
        [],
        "",
        action.payload.id
      );

      const newChatroomArray = [...state.chatrooms, chatroom];
      return { ...state, chatrooms: newChatroomArray };

    case DELETE_CHATROOM:
      return {
        ...state,
        chatrooms: state.chatrooms.filter(
          (chatroom) => chatroom.id !== action.payload
        ),
      };

    default:
      return state; 
  }
};

export default chatReducer;
