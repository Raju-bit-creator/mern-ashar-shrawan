import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaShoppingCart } from "react-icons/fa";
import blogContext from '../context/blogs/BlogContext';
import SearchItems from './SearchItems';

const Navbar = (props) => {
    const context = useContext(blogContext)
    const { state: { cart } ,product} = context
    console.log("this is our search products", product);
    

    const[title, setTitle]= useState('')
    const[results, setResults]= useState([])
    const[modalVisible, setModalVisible]= useState(false)

    useEffect(()=>{
        const filteredProducts= product?.filter(prod =>
            title? prod.title.toLowerCase() === title.toLowerCase(): true
        );
        setResults(filteredProducts)
        console.log( "filtered products", filteredProducts);
        

    },[title, product])
    
     const handleTitleChange =(e)=>{
     setTitle(e.target.value)
     }

     const openModal=(e)=>{
        e.preventDefault()
        setModalVisible(true)
     }
     const closeModal=()=>{
        setModalVisible(false)
     }

    return (
        <nav className={`navbar navbar-expand-lg navbar-${props.mode} bg-${props.mode}`}>
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Navbar</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/blogs">Blogs</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/about">About Us</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                       


                        <Link to="./cartitems"><button type="button" className="btn btn-primary position-relative">
                            <FaShoppingCart />
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                {cart.length}
                                <span className="visually-hidden">unread messages</span>
                            </span>
                        </button>
                        </Link>


                    </ul>

                    <form className="d-flex" onSubmit={openModal}>
                        <input className="form-control me-2" name='title' value={title} onChange={handleTitleChange} type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success" onClick={openModal} type="submit">Search</button>
                    </form>
                    { modalVisible && (<SearchItems results ={results} onClose= {closeModal}/>)}
                    <button className='btn btn-primary' onClick={props.toggleMode}>{props.text}</button>
                </div>
            </div>
        </nav>  
        
    )
}

export default Navbar
