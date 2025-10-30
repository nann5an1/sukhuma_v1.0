//create context using createContext to use commly from every component
import { createContext, useState } from "react";

// SkinDataProvider = the component that wraps your app
// SkinDataContext = the context object that holds the data
export const SkinDataContext = createContext(); //create the context
export default function SkinDataProvider({children}){ //set up provider for the context
    //set the default value types which are to be accessed from the children components
    const [skinData, setSkinData] = useState({
        type: "",
        sensitivity: "",
        skincare_exp: "",
        age: "",
        acnetype: "",
        skinConcerns: [],
        allergies:[],
        preferences: [],
        diet:[],
        lifestyle:[],
        budget: "",
    });

    return(
        <SkinDataContext.Provider value={{skinData, setSkinData}}>
            {children}
        </SkinDataContext.Provider>
    );
}