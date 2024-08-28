import React, { useContext, useEffect, useState } from 'react'
import coffee from '../assets/coffee.jpg'
import blogContext from '../context/blogs/BlogContext'

const Serviceitems = () => {
     const context= useContext(blogContext)
     const {state:{cart, products}, dispatch}= context
    console.log("this is my products:", products);
    
    
    return (
        <div className='container'>
            <h4 className='service-heading my-3'>Our Products</h4>
            <div className='row'>
                {products && products.map((e) => {
                    // console.log(e.title);
                    

                    return (  // You need to add a return statement here
                        <div className='col-md-3' key={e.id}>
                            <div className="card" >
                                <img src={coffee} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">{e.title}</h5>
                                    <p className="card-text">Rs. {e.price}</p>
                                    {cart && cart.some(p=>p.id===e.id)?( 
                                        <button 
                                    className='btn btn-danger'onClick={()=>{
                                        dispatch({
                                            type:"REMOVE_FROM_CART",
                                            payload: e
                                        })
                                    }}
                                    >Remove from cart</button>):
                                    (<button className='btn btn-primary' onClick={()=>{
                                        dispatch({
                                            type:"ADD_TO_CART",
                                            payload: e
                                        })  
                                    }}>Add to cart</button>)}
                                    
                                   
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default Serviceitems
