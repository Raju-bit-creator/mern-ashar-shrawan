import React, { useContext } from 'react'
import blogContext from '../context/blogs/BlogContext';
import coffee from '../assets/coffee.jpg'
import { MdDelete } from "react-icons/md";

const CartItems = () => {
    const context= useContext(blogContext)
    const {state:{cart}, dispatch}= context
    console.log("this is my cart items", cart);
    const Total= cart.reduce((acc, curr)=> acc + curr.price * curr.qty, 0)
    
  return (
    <div className=' container home'>
        <div className='productContainer-cart'>
            <ul className='list-group'>
             {cart.map((prod)=>(
                <li className='list-group-item' key={prod.id}>
                    <div className='row'>
                        <div className='col-md-2'>
                            <img src={coffee} alt={prod.name} className='img-fluid rounded'></img>
                        </div>
                        <div className='col-md-2'>
                          <h4>Name:{prod.title}</h4>  
                        </div>
                        <div className='col-md-2'>
                          <h4>price: {prod.price}</h4>  
                        </div>
                        <div className='col-md-2'>
                         <select value={prod.qty}
                         onChange={(e)=>
                            dispatch({
                                type: "CHANGE_CART_QTY",
                                payload: {
                                    id: prod.id,
                                    qty:e.target.value
                                }
                            })
                         }
                         className=' form-control'>
                            {[...Array(prod.instock).keys()].map((x)=>(
                                <option key={x+1} value={x+1}>{x+1}</option>
                            ))}

                            </select> 
                        </div>
                        <div className='col-md-2' >
                            <button type='button' className='btn btn-light ' onClick={()=>
                                dispatch({
                                    type: "REMOVE_FROM_CART",
                                    payload: prod
                                })
                            }>
                        <MdDelete />
                        </button>
                        </div>
                    </div>
                </li>
             ))}
            </ul>
        </div>
        <div className='filter summary'>
            <div className='title'>Total items: ({cart.length})</div>
            <h4>Total: {Total}</h4>

        </div>
      
    </div>
  )
}

export default CartItems
