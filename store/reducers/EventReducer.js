import { Event } from "../../entities/Event";
import { ADD_EVENT, FETCH_EVENTS } from "../actions/ChatActions";

const initialState = {
  events: [],
  counter: 0,
  isOnline: false,
  name: "Andre",
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EVENTS:
      return { ...state, events: action.payload };

    case ADD_EVENT:
      console.log(action.payload); // Should print out the eventName

      const event = new Event(
        action.payload.eventName,
        [],
        "",
        action.payload.id
      );
      const newEventArray = [...state.events, event];
      return { ...state, events: newEventArray };

    default:
      return state; //does not do anything yet​
  }
};

export default chatReducer;
