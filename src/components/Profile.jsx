import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { BiDownArrow } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {setActualUser} from '../redux/actions/index';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

export default function Profile() {
	const { loginWithRedirect, logout, user, isLoading,} = useAuth0();
	const [visibility, setVisibility] = useState(false);
	const wrapperRef = useRef(null);
	const actualUser = useSelector((store) => store.actualUser);
	const dispatch = useDispatch();
	const history = useHistory();
	useOutsideAlerter(wrapperRef);

	function useOutsideAlerter(ref) {
		useEffect(() => {
		  /**
		   * Esto detecta si clickeaste fuera del dropdown
		   */
		  function handleClickOutside(event) {
			if (ref.current && !ref.current.contains(event.target)) {
			  setVisibility(false);
			}
		  }
		  // Bind the event listener
		  document.addEventListener("mousedown", handleClickOutside);
		  return () => {
			// Unbind the event listener on clean up
			document.removeEventListener("mousedown", handleClickOutside);
		  };
		}, [ref]);
	}

	useEffect(() => {
		if(!isLoading && user && actualUser.username===undefined){//Si la pagina cargo con el usuario ya logeado y todavia no tengo su info en la redux store
			//Pido la info del usuario a mi db
			axios.get(`/users/${user.email}`)
			.then(info => {
				dispatch(setActualUser(info.data.name,info.data.ban,info.data.admin))//Hago un dispatch guardando la info que ahora App.js podra acceder
			})
			.catch(err => {
				axios
				.post('/users/post', {
					email: user.email,
					name: user.name,
					img: user.picture
				})
				.then((info) => {
					//En caso de exito redirige al home
					let userInfo = info.data[0];
					dispatch(setActualUser(userInfo.name, userInfo.ban, userInfo.admin));
					history.push(history.location.pathname);
				})
				.catch((error) => {
					console.error('Error al crear el usuario');
					history.push(history.location.pathname);
				});

			})
		}
		else if(!isLoading && !user && !actualUser.username){
			dispatch(setActualUser('dc','dc','dc'))//Hago un dispatch guardando la info que ahora App.js podra acceder
		}
	},[isLoading]);

	  

	return (
		<div className='bg-red'>
			{!isLoading && !user && (
				<button
					className="bg-gray-200 p-3 rounded-full text-gray-700 font-medium hover:scale-110 duration-300"
					onClick={() =>
						loginWithRedirect({//Si te logeas te redirige a /login
							redirectUri: 'https://henry-lareserva-front.vercel.app/login'
						})
					}
				>
					Conectarse
				</button>
			)}
			{!isLoading &&
				user && ( //PONER ACA LAS COSAS QUE SE TIENEN QUE VER SI ESTAS CONECTADO
					<div className='flex items-center relative' ref={wrapperRef}> 
						<Link to={actualUser.admin?"/admin":"/panel"} className='flex items-center'>
							<div className='h-[50px] w-[50px] rounded-full overflow-hidden'>
								<img src={user.picture} alt="" />
							</div>

							<p className='font-medium ml-3 hover:text-green-700 duration-300'>{user.nickname}</p>
						</Link>

						<BiDownArrow className='ml-3 cursor-pointer text-xl hover:text-green-700 duration-300' 
						onClick={() => setVisibility(!visibility)}/>
						
						<div className='bg-gray-300 flex flex-col items-start 
						absolute bottom-[-85px] right-0 duration-300 text-lg font-medium
						text-gray-700 p-2 z-50' 
						style={visibility?{opacity:'1'}:{opacity:'0'}}>
							{actualUser.admin===true?<Link to='/admin' className='mb-2 hover:text-green-700 duration-300'>Panel admin</Link>:
							<Link to='/panel' className='mb-2 hover:text-green-700 duration-300'>Panel de usuario</Link>}

							<button className='hover:text-green-700 duration-300'
							onClick={() => logout({returnTo: 'https://henry-lareserva-front.vercel.app/home'})}>Desconectarse</button>
						</div>
						
					</div>
					
				)}
		</div>
	);
}
