import { Event } from "../../entities/Event";
import { ADD_EVENT, FETCH_EVENTS } from "../actions/ChatActions";

const initialState = {
  events: [],
  isOnline: false,
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EVENTS:
      return { ...state, events: action.payload };

    case ADD_EVENT:
      console.log(action.payload);

      const event = new Event(
        action.payload.eventName,
        [],
        "",
        action.payload.id
      );
      const newEventArray = [...state.events, event];
      return { ...state, events: newEventArray };

    default:
      return state;
  }
};

export default chatReducer;
