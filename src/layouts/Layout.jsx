import { Outlet, Link } from "react-router-dom";
// import { HotelProvider } from "../context/HotelProvider";
import { Avatar, Dropdown, Footer, Navbar } from 'flowbite-react';
import ModalUser from "../components/ModalUser";
import useHotel from "../hooks/useHotel";
import { useEffect, useState } from "react";

export default function Layout() {
	const { user, setUser } = useHotel('');
	const [ name, setName ] = useState('');

    const deleteUser = () => {
        localStorage.removeItem('user');
		setUser('');
    }

	useEffect(() => {
		setName(user);
	}, [user]);

	return (
		<>
			<Navbar fluid rounded className="bg-green-600">
				<Link to="/">
					<Navbar.Brand>
							<img src="https://www.svgrepo.com/show/401945/hotel.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo"
							/>
							<span className="self-center whitespace-nowrap text-xl font-semibold text-white">
								HoteleríaLibre
							</span>
					</Navbar.Brand>
				</Link>
				<div className="flex md:order-2">
					{
						name
						?
							<>
								<Dropdown
									arrowIcon={false}
									inline
									label={
										<Avatar placeholderInitials={ name[0].toUpperCase() } rounded />
									}>
									<Dropdown.Header>
										<span className="block text-sm">
											{ name }
										</span>
										<span className="block truncate text-sm font-medium">
											<span className="lowercase">{ name.replace(' ', '') }</span>@ferreterialibre.com
										</span>
									</Dropdown.Header>
									<Dropdown.Item onClick={ deleteUser }>
										<img src="https://www.svgrepo.com/show/506561/sign-out.svg" className="w-5" alt="" />
										Cerrar sesión
									</Dropdown.Item>
								</Dropdown>
							</>
							:
							<Avatar alt="User settings" img="https://www.svgrepo.com/show/529293/user.svg" rounded className="bg-slate-300 rounded-full"/>
						}
					<Navbar.Toggle />
				</div>
				<Navbar.Collapse>
				</Navbar.Collapse>
			</Navbar>
			<main className="mx-auto p-10">
				<Outlet />
			</main>
			<Footer container>
				<Footer.Copyright href="#" by="Grupo HOTEL" year={2023} />
			</Footer>

			<ModalUser/>
		</>
	);
}
