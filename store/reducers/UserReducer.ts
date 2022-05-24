import { LOGOUT, LOGIN, RESTORE_USER, SIGNUP, DELETE_USER, EDIT_PROFILE } from "../actions/UserActions";


export interface UserState {
    isOnline: boolean | false
    localId: string
    displayName: string | undefined
    idToken: undefined | undefined
    email: string | undefined
    emailVerified: boolean | false
    password: string | undefined
    tokenFromSecureStore: string | undefined 
}

const initialState: UserState = {
    isOnline: false,
    localId: '',
    displayName: 'Default Username from the state',
    idToken: undefined,
    email: 'state@redux.com',
    emailVerified: false,
    tokenFromSecureStore: '',
    password: '',
};


export interface Action {
    type: string;
    payload: any;
}

const userReducer = (state: UserState = initialState, action: Action) => {
    switch (action.type) {
        case SIGNUP:
            return { ...state, idToken: action.payload.idToken, email: action.payload.email }
        case RESTORE_USER:
            return { ...state, idToken: action.payload.idToken, email: action.payload.email }
        case LOGOUT:
            return { ...state, idToken: undefined, email: undefined }
        case LOGIN:
            return { ...state, idToken: action.payload.idToken, email: action.payload.email }
        case DELETE_USER:
            return { ...state, idToken: action.payload.idToken }
        case EDIT_PROFILE:
            return { ...state, idToken: action.payload.idToken, displayName: action.payload.string, email: action.payload.string }

        default:
            return state; //does not do anything yet​   
    }
};

export default userReducer;