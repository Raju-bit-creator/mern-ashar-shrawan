import { useReducer, useState } from "react";
import blogContext from "./BlogContext";
import { cartReducer } from "../Reducers";

const BlogState = (props) => {

    const products =[
        {
            "id":"111as",
            "title": "coffee",
            "description": "himalayan coffee from nepal",
            "price": 150,
            "instock": 5
            
        },
        {
            "id":"112as",
            "title": "tea",
            "description": "himalayan tea from nepal",
            "price": 200,
            "instock": 4
        }

    ]
    const [state, dispatch] =useReducer(cartReducer, 
        {
            products: products,
            cart:[]
        }
    )
  
  const [product, setProduct] = useState(["mango","orange"])

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
        <blogContext.Provider  value={{state , dispatch,  allProduct}}>
            {props.children}
        </blogContext.Provider>
    )
}
export default BlogState
