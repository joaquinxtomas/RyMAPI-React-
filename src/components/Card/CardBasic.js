import React, { useEffect, useRef } from 'react'
import { Button } from 'react-bootstrap'
import { Card } from 'react-bootstrap'
import { BsArrowDownCircle } from "react-icons/bs";
import { BsFillCircleFill } from "react-icons/bs";
import '../../css/filter.css'
import { Routes, Route, Link } from 'react-router-dom';
import { GoLocation } from "react-icons/go";
import { RiNumber1 } from "react-icons/ri";


const CardBasic = (props) => {
    /* const status = document.querySelectorAll('.status')
    const point = document.querySelectorAll('.status-container')

    const handleStatus = async () => {
        try {
            for (let index = 0; index < status.length; index++) {
                if (status[index].innerText === "Status: Alive") {
                    point[index].classList.add('status-alive')
                } else if (status[index].innerText === "Status: Dead") {
                    point[index].classList.add('status-dead')
                } else if (status[index].innerText === "Status: unknown") {
                    point[index].classList.add('status-unknown')
                } else {
                    point[index].classList.add('status-else')
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    handleStatus() */

    return (
        <Card className='card-basic' key={props.id}>
            <Card.Img className='card-img' variant="top" src={props.image} />
            <Card.Body>
                <div className='title-container'>
                    <Card.Title className='d-flex justify-content-center'>{props.name}</Card.Title>
                    <p className='location'><GoLocation className='location-icon' />{props.location.name} - {props.species}</p>
                </div>
                <div className='info-container'>
                    <div className='status-container'>
                        <div className='texts-container'>
                            <p className='text-status'>Status: </p>
                            <p className='status'>{props.status}</p>
                        </div>
                    </div>
                    <div>
                        <a href={props.episode[0]} className='first-appear' target="_blank">First appear</a>
                    </div>
                </div>
            </Card.Body>
        </Card>


    )
}

export default CardBasic