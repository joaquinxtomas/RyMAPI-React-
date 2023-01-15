import React, { useState, useEffect, useRef } from 'react'
import axios, { all } from "axios";
import Spinner from 'react-bootstrap/Spinner';
import logo from '../assets/img/logo.png'
import CardBasic from './Card/CardBasic';
import { BsArrowRight } from "react-icons/bs";
import { BsArrowLeft } from "react-icons/bs";
import '../css/filter.css'
import Footer from './Footer/Footer';
import { RxCross2 } from "react-icons/rx";


const Home = () => {
    const [characters, setCharacters] = useState([])
    const [tablaUsuarios, setTablaUsuarios] = useState([])
    const [busqueda, setBusqueda] = useState("")
    const [pagina, setPagina] = useState(2)
    const [loading, setLoading] = useState(false)
    const [filtrado, setFiltrado] = useState(true)

    const input = useRef()

    const peticionGet = async () => {
        /* const input = document.querySelector("#inputValor") */
        await axios.get(`https://rickandmortyapi.com/api/character?name=${input.current.value}`)
            .then(response => {
                setCharacters(response.data.results);
                setTablaUsuarios(response.data.results);
            }).catch(error => {
                console.log(error);
            })
        setLoading(false)
    }

    const handleChange = e => {
        filtrar(e.target.value);
    }

    const main = useRef()
    const borrar = async () => {
        input.current.value = ""
        if (input.current.value == "") {
            const urlVacio = `https://rickandmortyapi.com/api/character/?`

            const respuesta = await fetch(urlVacio);
            const res = await respuesta.json()
            setCharacters(res.results)
        }
        noResults.current.innerText = ""
    }

    const noResults = useRef()

    const filtrar = async () => {
        const urlCharacter = `https://rickandmortyapi.com/api/character/?name=${input.current.value}`

        const respuesta = await fetch(urlCharacter);
        const res = await respuesta.json()

        if (res.results != undefined) {
            setCharacters(res.results)
        } else if (input.current.value == "") {
            return null
        } else {
            noResults.current.innerText = 'No hay resultados para tu búsqueda'
            return null
        }
        noResults.current.innerText = ""
    }

    useEffect(() => {
        setLoading(true)
        peticionGet();
        setLoading(false)

    }, [])

    const cargarMas = async () => {
        if (!pagina) {
            setPagina(2)
        } else {
            await setPagina(pagina + 1);
            fetch(`https://rickandmortyapi.com/api/character?page=${pagina}&name=${input.current.value}`)
                .then(response => response.json())
                .then(data => {
                    if (data.results) {
                        setCharacters(data.results)
                        setTablaUsuarios(data.results)
                    } else {
                        setPagina(pagina - 1)
                    }
                })
                .catch(error => console.error(error))
        }
    }


    const cargarMenos = async () => {
        console.log(pagina)
        if (pagina == 2) {
            setPagina(2)
        } else {
            await setPagina(pagina - 1);
            fetch(`https://rickandmortyapi.com/api/character?page=${pagina - 2}&name=${input.current.value}`)
                .then(response => response.json())
                .then(data => {
                    setCharacters(data.results)
                    setTablaUsuarios(data.results)
                })
                .catch(error => console.error(error))
        }

    }

    {
        if (loading) {
            return (
                <div className='spinner-container'>
                    <Spinner className='spinner-class' animation="grow" />
                </div>
            )
        }
    }
    return (
        <>
            <nav className=' text-light d-flex p-2 mb-4 align-items-center'>
                <img src={logo} className='logo' />
                <div className='container-input'>
                    <input className='input-filtro'
                        id='inputValor'
                        placeholder="Busca tu personaje"
                        onChange={handleChange}
                        ref={input}
                    />
                    <button className='borrar' onClick={borrar}><RxCross2 /></button>
                </div>
            </nav>
            <main ref={main}>
                <div className='container-buttons d-flex'>
                    <button className='button1' onClick={cargarMenos}><BsArrowLeft /></button>

                    <button className='button2' onClick={cargarMas}><BsArrowRight /></button>
                </div>

                <h2 ref={noResults} className='ms-3 m-5 w-100 mx-auto'></h2>

                <div className='card-container w-100 mx-auto'>
                    {characters &&
                        characters.map((usuario, index) => (
                            <CardBasic  {...usuario} key={index} />

                        ))}
                </div>

                <div className='container-buttons d-flex'>
                    <button className='button3' onClick={cargarMenos}><BsArrowLeft /></button>

                    <button className='button3' onClick={cargarMas}><BsArrowRight /></button>
                </div>
            </main>
            <Footer />
        </>
    )
}

export default Home