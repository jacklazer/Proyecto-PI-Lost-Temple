import { Children, createContext, useContext, useState } from "react";

export const avatarContext = createContext();

export const useAvatar = () => {
    const context = useContext(avatarContext)

    if(!context){
        console.error('Error Error Error');
        return;
    }

    return context;
}

export function AvatarProvider({ children }) {
    const [avatar, setAvatar] = useState({
        // ref: null,
        // body: null,
        animation: 'Idle',
        avatarRef: null,
        avatarBodyRef: null,
    })

    return(
        <avatarContext.Provider value={{avatar, setAvatar}}>
            {children}
        </avatarContext.Provider>
    )
}

export var colectedCoins = 0;

export function colectCoin() {
    colectedCoins += 1;
}

export function getColectedCoins() {
    return colectedCoins;
}