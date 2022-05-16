import { CHATROOMS } from "../../dummy.data";
import { Chatroom } from "../../entities/Chatroom";
import {
  SUBTRACT,
  TOGGLE_ONLINE,
  ADD,
  ADD_CHATROOM,
  DELETE_CHATROOM,
  FETCH_CHATROOMS,
} from "../actions/ChatActions";

const initialState = {
  chatrooms: [],
  counter: 0,
  isOnline: false,
  name: "Andre",
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD:
      return { ...state, counter: state.counter + 1 };
    case SUBTRACT:
      return { ...state, counter: state.counter - 1 };
    case TOGGLE_ONLINE:
      return { ...state, isOnline: !state.isOnline };
    case FETCH_CHATROOMS:
      return { ...state, chatrooms: action.payload };

    case ADD_CHATROOM:
      console.log(action.payload); // Should print out the chatroomName

      const chatroom = new Chatroom(
        action.payload.chatroomName,
        [],
        "",
        action.payload.id
      );
      const newChatroomArray = [...state.chatrooms, chatroom];
      return { ...state, chatrooms: newChatroomArray };

    case DELETE_CHATROOM:
      console.log(action.payload);
      return {
        ...state,
        chatrooms: state.chatrooms.filter(
          (chatroom) => chatroom.id !== action.payload
        ),
      };

    default:
      return state; //does not do anything yet​
  }
};

export default chatReducer;
