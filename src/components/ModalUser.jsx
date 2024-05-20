import { Button, Label, Modal, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import useHotel from '../hooks/useHotel';

export default function ModalUser() {
    const [openModal, setOpenModal] = useState(false);
    const [ name, setName ] = useState('');
    const { user, setUser } = useHotel();

    useEffect(() => {
		user ? setOpenModal(false) : setOpenModal(true);
    }, [user])

    function onCloseModal() {
      setOpenModal(false);
    }

    const saveUser = (event) => {
        event.preventDefault();
        localStorage.setItem("user", name);
        setUser(name);
        setName('')
        setOpenModal(false);
    }

    return (
        <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        {/* <Modal.Header /> */}
        <Modal.Body>
          <form onSubmit={ saveUser } className="space-y-6 pt-5" autoComplete='off'>
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Bienvenido a nuestra plataforma</h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Ingresa tu nombre" />
              </div>
              <TextInput
                id="email"
                placeholder="ej: Pablo"
                autoComplete='=5gfd23s'
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
                autoFocus
              />
            </div>
            <div className="w-full">
              <Button type='submit' color='success'>Iniciar</Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>    
    )
}