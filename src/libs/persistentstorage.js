

const TOKEN_ID = "token"
const NAME_ID = "name"


export class persistentStorage{


    static setToken(token)
    {
        localStorage.setItem(TOKEN_ID, token)
    }

    static getToken()
    {
        return localStorage.getItem(TOKEN_ID)
    }


    static setName(name)
    {
        localStorage.setItem( NAME_ID, name)
    }

    static getName()
    {
        return localStorage.getItem(NAME_ID)
    }


}


export default persistentStorage;

