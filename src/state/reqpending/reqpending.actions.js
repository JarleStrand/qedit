
export const START_REQUEST = 'REQPENDING_START'
export const END_REQUEST = 'REQPENDING_END'


export function startRequests(){
    return { type:  START_REQUEST }
}


export function endRequests(){
    return { type:  END_REQUEST }
}


