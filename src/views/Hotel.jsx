import { Carousel, ListGroup, Spinner, Textarea } from "flowbite-react";
import Comments from "../components/Comments";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import useHotel from "../hooks/useHotel";

export default function Hotel() {
    const { id } = useParams();
    const [comment, setComment] = useState('')
    const [gallery, setGallery] = useState([])
    const { hotel, getHotel } = useHotel();
    const imags = [
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aG90ZWxzfGVufDB8fDB8fHww',
        'https://cdn.pixabay.com/photo/2021/01/21/06/41/hotel-5936417_960_720.jpg',
        'https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D',
        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/207202934.jpg?k=5e67d182969c7bab58bd760c5e88bf5ecbf22d8869717706aafc934f3a768277&o=&hp=1',
        'https://reviewproblog.shijigroup.com/wp-content/uploads/2018/10/HD_Hotel.jpg',
        'https://cdn.studios.skies.asia/www.hdpalace.com.tw/large/O9KlG6fDja_1663770568.jpg',
        'https://c4.wallpaperflare.com/wallpaper/624/380/1000/life-resort-hotel-resort-hotel-wallpaper-preview.jpg',
        'https://images.unsplash.com/photo-1561501900-3701fa6a0864?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWwlMjBsdWpvc298ZW58MHx8MHx8fDA%3D&w=1000&q=80',
        'https://wallpapercave.com/wp/wp1846070.jpg',
        'https://w0.peakpx.com/wallpaper/720/875/HD-wallpaper-luxury-hotel-glamorous-hotel-five-star-hotel-hotel.jpg',
        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/159964531.jpg?k=98c31e4eb1d030ea9fadac5eb6c94c5ebe416d8295dd4d2a0ca2a0b3593306b0&o=&hp=1',
        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/311045174.jpg?k=8110ae1ca2d932c01f38c65ae66c06ed4da5f8af1c06a688732c80d24c6e981c&o=&hp=1',
        'https://static.hosteltur.com/app/public/uploads/img/articles/2022/09/05/L_112557_h10-croma-malaga-habitacion.jpg',
        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/470823830.jpg?k=cbb359d4cb015c3c3574747ef593c3d00e4a91ba5cb752dff225e064dfc83b05&o=&hp=1',
        'https://ak-d.tripcdn.com/images/0220s1200095hhz33FB3C_R_960_660_R5_D.jpg',
        'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_627,q_auto,w_1200/hotelier-images/05/a6/7b04e8fc0e52c175b5f776ddf19f76079abc8cc3f8d5f2d4e1af18199013.jpeg',
        'https://s1.abcstatics.com/abc/www/multimedia/viajar/2023/06/30/puerta-alcala-RvfMYdY0BZ6hmEEsQUto2TL-1200x840@abc.jpg'
    ]

    useEffect(() => {
        getHotel(id);
    }, [comment]);
    
    useEffect(() => {
        getHotelImages();
    }, []);

    // async function getHotel() {
    //     await axios.get(`https://b23b48dc-fd4c-4332-8e69-5acdc3fda9f1-00-2abgkar42u9y2.sisko.replit.dev/publicaciones/${ id }`)
    //     .then(function (response) {
    //         // manejar respuesta exitosa
    //         response.data.comentarios = response.data.comentarios.reverse();
    //         console.log( 'as' ,response.data);
    //         setHotel(response.data)
    //     })
    //     .catch(function (error) {
    //         // manejar error
    //         console.log(error);
    //     })
    // }  

    const getHotelImages = async () => {
        let images = [];
        console.log(gallery);
        while(images.length < 3){
            // await axios.get(`https://api.unsplash.com/photos/random?client_id=ymGymGVCLkLFE03hjGAkloKxB7gVXfInHlLedEjwaCk&query=hotel`).then(function (response) {
            //     // manejar respuesta exitosa
            //     images.push(response.data.urls.regular);
            // })
            // .catch(function (error) {
            //     // manejar error
            //     console.log(error);
            // })
            images.push(imags[Math.floor(Math.random() * 16)]);
        }
        setGallery(images);
    }

    const saveComment = async (e) => {
        e.preventDefault();

        await axios.post(`https://b23b48dc-fd4c-4332-8e69-5acdc3fda9f1-00-2abgkar42u9y2.sisko.replit.dev/publicaciones/${ id }/comentarios`, {
            nombre: localStorage.getItem('user'),
            comentario: comment
        }).then(function (response) {
            // manejar respuesta exitosa
            console.log(response);
            setComment('');
        })
        .catch(function (error) {
            // manejar error
            console.log(error);
        })
    }

    return (
        <>
            {
                hotel
                ?
                <div className="mx-auto">
                    <div className="grid grid-cols-12 gap-5 justify-center">
                        <div className="col-span-12 sm:col-span-6 md:col-span-8">
                            <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
                                { 
                                    gallery.length > 0
                                    ?
                                        <Carousel >
                                            {
                                                gallery.map((gal, index) => (
                                                    <div key={ index } className="flex items-center h-full justify-center bg-gray-400 dark:bg-gray-700 dark:text-white">
                                                        <img className="w-full h-full object-cover" src={ gal } alt="" />
                                                    </div>
                                                ))
                                            }
                                        </Carousel>
                                    :
                                    <div className="flex items-center h-full justify-center bg-gray-400 dark:bg-gray-700 dark:text-white rounded-md">
                                        <Spinner color="gray" aria-label="Success spinner example" size="xl"/>
                                    </div>
                                }
                            </div>
                            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white py-5">
                                { hotel.hotel.nombre }
                            </h1>
                            <div className="info flex gap-5">
                                <div className="views flex">
                                    <img src="https://www.svgrepo.com/show/532540/location-pin-alt-1.svg" className="w-5" alt="" />
                                    <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">{ hotel.hotel.ubicacion }</p>
                                </div>
                                <div className="views flex">
                                    <img src="https://www.svgrepo.com/show/521139/eye-show.svg" className="w-5" alt="" />
                                    <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">{ hotel.vistas } visualizaciones</p>
                                </div>
                            </div>
                            <p className="my-5">
                                { hotel.hotel.resena }
                            </p>
                            <div className="flex justify-center">
                                <ListGroup className="w-full">
                                    <ListGroup.Item className="flex gap-5">
                                        <img src="https://www.svgrepo.com/show/509748/bed.svg" className="w-8" alt="" /> &nbsp; - &nbsp; 
                                        { hotel.hotel.habitaciones } &nbsp;
                                        <span>Habitaciones</span>
                                    </ListGroup.Item>
                                    <ListGroup.Item className="flex justify-between" >
                                        <img src="https://www.svgrepo.com/show/428917/available-calendar-date.svg" className="w-8" alt="" /> &nbsp; - &nbsp; 
                                        { hotel.hotel.disponibles } &nbsp;
                                        <span>Disponibles</span>
                                    </ListGroup.Item>
                                    <ListGroup.Item className="flex justify-between" >
                                        <img src="https://www.svgrepo.com/show/254763/room-key-hotel.svg" className="w-8" alt="" /> &nbsp; - &nbsp; 
                                        { hotel.hotel.reservas } &nbsp;
                                        <span>Reservados</span>
                                    </ListGroup.Item>
                                </ListGroup>
                            </div>
                        </div>
                        <div className="col-span-12 sm:col-span-6 md:col-span-4">
                            <div className="max-w-full">
                                <div className="mb-2 block">
                                    <h3 className="text-xl font-bold tracking-tight text-gray-900 pb-5">Comentarios</h3>
                                </div>
                                <form onSubmit={ saveComment }>
                                    <Textarea id="comment" placeholder="Deja un comentario..." required rows={4} className="w-full" value={ comment } onChange={ 
                                        (e) => setComment(e.target.value)
                                    }/>
                                    <button type="submit" className="bg-green-600 p-3 font-medium text-white text-center rounded-lg my-4">Comentar</button>
                                </form>
                            </div>
                            <div id="comments">
                                <Comments data={ hotel.comentarios }/>
                            </div>
                        </div>
                    </div>
                </div> 
                :
                <div className="w-full h-screen flex justify-center items-center break-word col-span-12 sm:col-span-12 md:col-span-12">
                    <Spinner color="success" aria-label="Success spinner example" size="xl"/>
                </div>
            }
        </>    
    );
}
