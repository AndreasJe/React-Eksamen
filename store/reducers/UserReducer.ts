import { LOGOUT, LOGIN, RESTORE_USER, SIGNUP, DELETE_USER, EDIT_PROFILE } from "../actions/UserActions";


export interface UserState {
    localId: string
    displayName: string | undefined
    idToken: undefined | undefined
    email: string | undefined
    emailVerified: boolean | false
    createdAt: string | undefined
    lastLoginAt: string | undefined
    isOnline: boolean | false
}

const initialState: UserState = {
    localId: '',
    displayName: 'John Doe State ',
    idToken: undefined,
    email: 'state@redux.com',
    emailVerified: false,
    createdAt: '',
    lastLoginAt: '',
    isOnline: false,
};


export interface Action {
    type: string;
    payload: any;
}

const userReducer = (state: UserState = initialState, action: Action) => {
    switch (action.type) {
        case SIGNUP:
            return { ...state, idToken: action.payload.idToken, email: action.payload.email, displayName: action.payload.string  }
        case RESTORE_USER:
            return { ...state, idToken: action.payload.idToken, localId: action.payload.localId, email: action.payload.email, displayName: action.payload.displayName,  }
        case LOGOUT:
            return { ...state, idToken: undefined, email: undefined }
        case LOGIN:
            return { ...state, idToken: action.payload.idToken, email: action.payload.email, displayName: action.payload.string }
        case DELETE_USER:
            return { ...state, idToken: undefined }
        case EDIT_PROFILE:
            return { ...state, idToken: action.payload.idToken, displayName: action.payload.string, }

        default:
            return state; //does not do anything yet​   
    }
};

export default userReducer;