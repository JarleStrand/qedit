import { DO_LOGIN, DO_LOGOUT } from '../actions'



const auth = (state = DO_LOGOUT, action) => {
    switch (action.type) {
        case DO_LOGIN:
            return { name: action.name, token: action.token };
        case DO_LOGOUT:
            return { name: "", token: "" };
        default:
            if (typeof (state) === 'undefined')
                return { name: "", token: "" }
            else
                return state;
    }

}


export default auth;

