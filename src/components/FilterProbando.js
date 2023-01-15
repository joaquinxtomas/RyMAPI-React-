import React, { useState, useEffect } from 'react'
import axios from "axios";


const FilterProbando = () => {
    const [characters, setCharacters] = useState([])
    const [tablaUsuarios, setTablaUsuarios] = useState([])
    const [loading, setLoading] = useState(false)
    const [pagina, setPagina] = useState(2)
    const peticionGet = async () => {
        await axios.get(`https://rickandmortyapi.com/api/character?`)
            .then(response => {
                setCharacters(response.data.results);
                setTablaUsuarios(response.data.results)
            }).catch(error => {
                console.log(error);
            })
        setLoading(false)
    }

        const handleChange = e => {
            filtrar(e.target.value);
        }

        const filtrar = async () => {
            const input = document.querySelector('#inputValor')
            const urlCharacter = `https://rickandmortyapi.com/api/character/?name=`
    
            const respuesta = await fetch(urlCharacter);
            const res = await respuesta.json()
            setCharacters(res.results)
            console.log(res.results)
        }

    const cargarMas = async () => {
        await setPagina(pagina + 1)
        await axios.get(`https://rickandmortyapi.com/api/character?page=${pagina}`)
            .then(response => {
                setCharacters(response.data.results);
                
            }).catch(error => {
                console.log(error);
            })
    }

    const cargarMenos = async () => {
        await setPagina(pagina - 1)
        await axios.get(`https://rickandmortyapi.com/api/character?page=${pagina - 1}`)
            .then(response => {
                setCharacters(response.data.results);
                /* console.log(response.data) */
                
            }).catch(error => {
                console.log(error);
            })
    }

    

    /* const cargarMenos = async () => {
        await setPagina(pagina - 1);
        fetch(`https://rickandmortyapi.com/api/character?page=${pagina}`)
            .then(response => response.json())
            .then(data => {
                setCharacters(data.results)
                setTablaUsuarios(data.results)
            })
            .catch(error => console.error(error))
    } */


    useEffect(() => {
        setLoading(true)
        peticionGet()
    }, [])


    return (
        <div>
            <input id='inputValor'
                placeholder="Búsqueda por Nombre o Empresa"
            /* onChange={handleChange} */
            />

            {<button onClick={cargarMenos}>Volver Pagina</button>}

            <button onClick={cargarMas}>Pasar Pagina</button>
            <div>
                {characters &&
                    characters.map((usuario) => (
                        <div key={usuario.id}>
                            <img src={usuario.image} />
                            <p>{usuario.name}</p>
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default FilterProbando