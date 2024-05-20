import axios from "axios";
import { createContext, useEffect, useState } from "react";

const HotelContext = createContext()

// eslint-disable-next-line react/prop-types
const HotelProvider = ({children}) => {
    const [user, setUser] = useState('')
    const [hotel, setHotel] = useState(0)

    useEffect(() => {
        getLocalUser()
    });

    function getLocalUser(){
        if (localStorage.getItem('user')) {
            setUser(localStorage.getItem('user'));
            console.log(user);
        } 
    }

    const getHotel = async (id) => {
        await axios.get(`https://bkhoteles.juanflow04flore.repl.co/publicaciones/${ id }`)
        .then(function (response) {
            // manejar respuesta exitosa
            response.data.comentarios = response.data.comentarios.reverse();
            console.log(response.data);
            setHotel(response.data)
        })
        .catch(function (error) {
            // manejar error
            console.log(error);
        })
    }  

    return (
        <HotelContext.Provider value={{ 
                user, 
                setUser,
                hotel,
                setHotel,
                getHotel
            }}>
            { children }
        </HotelContext.Provider>
    );
}

export{
    HotelProvider
}


export default HotelContext;