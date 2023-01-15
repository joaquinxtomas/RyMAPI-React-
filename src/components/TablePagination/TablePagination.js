import React, { useEffect, useState } from 'react'
import Pagination from 'react-bootstrap/Pagination';
import Filter from '../Filter';

const TablePagination = () => {
    const [characters, setCharacters] = useState([])
    const [infoPage, setInfoPage] = useState({})
    const [itemPagination, setItemPagination] = useState([])
    const [characters2, setCharacters2] = useState([])
    const [pagina, setPagina] = useState(1)
    const [busqueda, setBusqueda] = useState("")




    const getList = () => {
        fetch(`https://rickandmortyapi.com/api/character`)
            .then((response) => response.json())
            .then((data) => {
                setCharacters(data.results)
            })
            .catch(error => console.error(error))
    };

    useEffect(() => {
        getList(0,null)
    }, [])

    const handleChange = e => {
        setBusqueda(e.target.value);
        filtrar(e.target.value);
    }

    const filtrar = (terminoBusqueda) => {
        var resultadosBusqueda = characters2.filter((elemento) => {
            if (elemento.name.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
            ) {
                return elemento;
            }
        });
        setCharacters2(resultadosBusqueda);
    }

    useEffect(() => {
        filtrar()
    }, [])

    /* const cargarMas = async () => {
        await setPagina(pagina + 1);
        fetch(`https://rickandmortyapi.com/api/character?page=${pagina}`)
            .then(response => response.json())
            .then(data => {
                setCharacters(data.results)
            })
            .catch(error => console.error(error))
    }

    const cargarMenos = async () => {
        if (pagina == 0) {
            return setPagina
        } else {
            await setPagina(pagina - 1);
            fetch(`https://rickandmortyapi.com/api/character?page=${pagina}`)
                .then(response => response.json())
                .then(data => {
                    setCharacters(data.results)
                })
                .catch(error => console.error(error))
        }
    } */


        useEffect(() => {
            let items = [];
            for (let index = 1; index < infoPage.pages; index++) {
                items.push(
                    <Pagination.Item
                        key={index}
                        onClick={(e) => { getList(parseInt(e.target.text), null) }}>{index}</Pagination.Item>)
            }
            setItemPagination(items)
        }, [infoPage])


    return (
        <>

            {/* <Filter/> */}

            <input
                value={busqueda}
                placeholder="Búsqueda"
            /* onChange={handleChange} */
            />

            {/* <button onClick={cargarMenos}>Volver Pagina</button>

            <button onClick={cargarMas}>Pasar Pagina</button> */}

            {
                characters.map((character) => <div key={character.id}>

                    <h3>{character.name}</h3>
                </div>)
            }

            <div>
                <Pagination>
                    <Pagination.Prev onClick={() => {
                        if (infoPage.prev === null) {
                            getList(0)
                        } else {
                            (getList(null, infoPage.prev))
                        }
                    }} />
                    {
                        itemPagination.map((item) => {
                            return item
                        })
                    }
                    <Pagination.Next onClick={() => {
                        if (infoPage.next === null) {
                            getList(0)
                        } else {
                            (getList(null, infoPage.next))
                        }
                    }} />
                </Pagination>
            </div>
        </>
    )
}

export default TablePagination