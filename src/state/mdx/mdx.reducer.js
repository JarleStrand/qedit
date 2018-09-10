
import { MDX_SETCONNECTED, MDX_SETDATA, MDX_CLEARDATA } from './mdx.actions'



const mdxstate = (state, action) => {

    switch (action.type) {
        case MDX_SETCONNECTED:
            return { connected: true };

        case MDX_SETDATA:
            return { connected: state.connected, data: action.data};

        case MDX_CLEARDATA:
            return { connected: state.connected, data: null};

        default:
            if (typeof (state) === 'undefined')
                return { connected: false }
            else
                return state;
    }

}


export default mdxstate;



