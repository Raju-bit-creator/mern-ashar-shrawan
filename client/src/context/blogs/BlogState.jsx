
import { useReducer, useState } from "react";
import blogContext from "./BlogContext";
import { cartReducer } from "../Reducers";

const ProductState = (props) => {

    const [product, setProduct] = useState([])
    const [state, dispatch] =useReducer(cartReducer, 
        {
            products: product,
            cart:[]
        }
    )
  
  

     console.log("this is our product from backend",product);

  const allProduct = async()=>{
    const  response= await  fetch("http://localhost:5000/api/product/getallproduct",{
        method : "GET",
        headers:{
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
        }
    })
    let parseData= await response.json()
    console.log(parseData);
    setProduct(parseData)
  }
      
    return (
        <blogContext.Provider  value={{state , dispatch,  allProduct ,product, setProduct}}>
            {props.children}
        </blogContext.Provider>
    )
}
export default ProductState


