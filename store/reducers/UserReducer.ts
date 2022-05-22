import { LOGOUT, LOGIN, RESTORE_USER, SIGNUP, DELETE_USER, EDIT_PROFILE } from "../actions/UserActions";


export interface UserState {
    localId: string
    displayName: string | undefined
    idToken: string | undefined;
    email: string | undefined
    emailVerified: boolean | false
    password: string | undefined
}

const initialState: UserState = {
    localId: '',
    displayName: 'Default Username from the state',
    idToken: undefined,
    email: 'state@redux.com',
    emailVerified: false,
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
            return { ...state, idToken: action.payload.idToken, displayName: action.payload.string, photoUrl: action.payload.string }

        default:
            return state; //does not do anything yet​   
    }
};

export default userReducer;