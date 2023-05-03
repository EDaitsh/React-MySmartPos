import { createContext, useState } from "react";

export const LoyaltyContext = createContext({
    loyaltyNumber: '',
    setLoyaltyNumber : () => {}
});

export const LoyaltyProvider = ({children}) => {
    const [loyaltyNumber, setLoyaltyNumber] = useState('');

    const value = {
        loyaltyNumber,
        setLoyaltyNumber
    }

    return <LoyaltyContext.Provider value={value}>{children}</LoyaltyContext.Provider>
}
