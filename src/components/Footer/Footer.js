import React from 'react'
import { BsLinkedin } from "react-icons/bs";

const Footer = () => {
    return (
        <footer>
            <div className='container-footer d-flex w-100'>
                <h4 className='name'>Joaquin Palacios</h4>
                <div className='linkedin'>
                    <BsLinkedin className='icon-linkedin' />
                    <a href='https://www.linkedin.com/in/joaquinpalacios/' target="_blank">Linkedin</a>
                </div>
            </div>
        </footer>
    )
}

export default Footer