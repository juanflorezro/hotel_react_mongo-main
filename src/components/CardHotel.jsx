import { Card, Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function CardHotel(){
    const [hotels, setHotels] = useState(0);

    useEffect(() => {
        getHotels();
    }, []);

    function getHotels(){
        fetch('https://b23b48dc-fd4c-4332-8e69-5acdc3fda9f1-00-2abgkar42u9y2.sisko.replit.dev/publicaciones')
            .then(response => response.json())
            .then(data => setHotels(data));
    }

    return (
        <>
            {
                hotels
                ?
                    hotels.map(hotel => (
                        <div key={ hotel['_id'] } className="hotel w-full break-word col-span-12 sm:col-span-6 md:col-span-3">
                            <Card className="w-full card-h" imgAlt="Meaningful alt text for an image that is not purely decorative" imgSrc={ hotel.imagen }>
                                <div className="w-full h-full flex flex-col justify-between items-baseline">
                                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                        { hotel.hotel.nombre }
                                    </h5>
                                    <p className="font-normal text-gray-700 dark:text-gray-400">
                                        { hotel.descripcion }
                                    </p>
                                    <NavLink className="bg-green-600 p-3 font-medium text-white text-center rounded-full w-full" to={ hotel['_id'] }>Ver hotel</NavLink>
                                </div>
                            </Card>
                        </div>
                    ))
                :
                <div className="w-full h-screen flex justify-center items-center break-word col-span-12 sm:col-span-12 md:col-span-12">
                    <Spinner color="success" aria-label="Success spinner example" size="xl"/>
                </div>
            }
        </>    
    );
}