import axios from 'axios';
import { Avatar, Button, Card, Spinner } from 'flowbite-react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useHotel from '../hooks/useHotel';

export default function Comments(comentarios) {
    const { id } = useParams();
    const { user, getHotel } = useHotel();

    useEffect(() => {
        console.log(comentarios);
    }, [comentarios]);
    
    async function handleLike(comment_id){
        await axios.post(`https://bkhoteles.juanflow04flore.repl.co/publicaciones/${ id }/comentario/${ comment_id }/like`, {
            usuario: {
                usuario: user,
                like: 1,
                dislike: 0
            }
        }).then(function (response) {
            // manejar respuesta exitosa
            console.log(response);
            getHotel(id);
        })
        .catch(function (error) {
            // manejar error
            console.log(error);
        })
    }

    async function handleDislike(comment_id){
        await axios.post(`https://bkhoteles.juanflow04flore.repl.co/publicaciones/${ id }/comentario/${ comment_id }/like`, {
            usuario: {
                usuario: user,
                like: 0,
                dislike: 1
            }
        }).then(function (response) {
            // manejar respuesta exitosa
            console.log(response);
            getHotel(id);
        })
        .catch(function (error) {
            // manejar error
            console.log(error);
        })
    }

    // funcion que recibe dos parametros, el primero es el conjunto de likes por comentario y el segundo el tipo, valida con 1 si es like y 0 si es dislike
    function calcTotal(likes, type){
        let li = 0;
        likes.forEach(element => li += type ? element.like : element.dislike);
        return li;
    }

    return (
        <Card className="max-w-full mt-5 max-h-[500px] overflow-y-scroll">
            <div className="mb-4 flex justify-between">
                <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Últimos comentarios</h5>
            </div>
            <div className="flow-root">
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {
                    comentarios
                    ?
                        comentarios.data.map((comentario) => (
                            <li key={comentario['_id']} className="py-3 sm:py-4">
                                <div className="flex space-x-4">
                                    <div className="shrink-0">
                                        <Avatar placeholderInitials={ comentario.nombre[0].toUpperCase() } rounded />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="truncate text-sm font-medium text-gray-500">{ comentario.nombre }</p>
                                        <p className="text-gray-900 pt-1">
                                            { comentario.comentario }
                                        </p>
                                        <p className='text-sm mt-2'>{ comentario.fecha }</p>
                                    </div>
                                </div>
                                <div className="mt-3 ml-12 inline-flex text-base font-semibold text-gray-900 dark:text-white">
                                    <Button.Group>
                                        <Button color="gray" onClick={ () => handleLike(comentario['_id']) } className={ comentario.likes.map( l => l.usuario == user && l.like == 1 ? 'bg-gray-300' : '') }>
                                            <img src="https://www.svgrepo.com/show/521167/like-right.svg" className={ comentario.likes.map( l => l.usuario == user ? 'https://www.svgrepo.com/show/503044/like.svg' : 'https://www.svgrepo.com/show/521167/like-right.svg') + " w-5"} alt="" />
                                            { calcTotal(comentario.likes, 1) }
                                        </Button>
                                        <Button color="gray" onClick={ () => handleDislike(comentario['_id']) } className={ comentario.likes.map( l => l.usuario == user && l.dislike == 1 ? 'bg-gray-300' : '') }>
                                            <img src="https://www.svgrepo.com/show/521123/dislike-left.svg" className='w-5' alt="" />
                                            { calcTotal(comentario.likes, 0) }
                                        </Button>
                                    </Button.Group>
                                </div>
                            </li>
                        ))
                    :
                    <div className="w-full h-screen flex justify-center items-center break-word col-span-12 sm:col-span-12 md:col-span-12">
                        <Spinner color="success" aria-label="Success spinner example" size="xl"/>
                    </div>
                }
                </ul>
            </div>
        </Card>
    );
}
