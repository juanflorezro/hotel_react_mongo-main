import { useContext } from "react";
import HotelContext from "../context/HotelProvider";

const useHotel = () => {
    return useContext(HotelContext)
}

export default useHotel;