import { START_REQUEST, END_REQUEST} from './reqpending.actions'



const reqpending  = (state, action) => {
    switch (action.type){
        case START_REQUEST:
            return { count: state.count + 1 }
        case END_REQUEST:
            return { count: state.count - 1 }
        default:
            if(typeof(state)==='undefined')
                return { count : 0 }
            else
                return state;
    }
}


export default reqpending;




