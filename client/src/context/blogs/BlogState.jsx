
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

const editProduct = async (selectedProduct, updateData) => {
    console.log(`Editing product with id: ${selectedProduct}`);

    const { title, description, price, instock } = updateData;

    try {
        const response = await fetch(`http://localhost:5000/api/product/updateproduct/${selectedProduct}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token') 
            },
            body: JSON.stringify({ title, description, price, instock }) 
        });
        if (!response.ok) {
            throw new Error(`Failed to update product. Status code: ${response.status}`);
        }
        const json = await response.json();
        console.log('Product updated successfully:', json);

    } catch (error) {
        console.error('Error updating product:', error.message || error);
    }
};
      
    return (
        <blogContext.Provider  value={{state , dispatch,  allProduct ,product, setProduct , editProduct}}>
            {props.children}
        </blogContext.Provider>
    )
}
export default ProductState


