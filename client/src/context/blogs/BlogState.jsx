
import { useReducer, useState } from "react";
import blogContext from "./BlogContext";
import { cartReducer } from "../Reducers";

const ProductState = (props) => {

    const [product, setProduct] = useState([])
    const [state, dispatch] = useReducer(cartReducer,
        {
            products: product,
            cart: []
        }
    )



    console.log("this is our product from backend", product);

    const allProduct = async () => {
        const response = await fetch("http://localhost:5000/api/product/getallproduct", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            }
        })
        let parseData = await response.json()
        console.log(parseData);
        setProduct(parseData)
    }
    const editProduct = async (selectedProduct, updateData) => {
        console.log("edditing product with selected product", selectedProduct);
        const { title, description, price, instock } = updateData
        try {
            const response = await fetch(`http://localhost:5000/api/product/updateproduct/${selectedProduct}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
                body: JSON.stringify({ title, description, instock, price })
            })
            if (!response.ok) {
                throw new Error('fail to update product')
            }
            const json = await response.json();
            console.log("product updated successfully" ,json);
            allProduct();

        } catch (error) {
            throw new Error('fail to update product')
        }
    }
    const deleteProduct = async(id)=>{
        try {
            const response= await fetch(`http://localhost:5000/api/product/deleteproduct/${id}`,{
                method: 'DELETE',
                headers: {
                    "Content-Type":"application/json",
                    "auth-token": localStorage.getItem('token')
                }
            })
            if(response.ok){
                console.log("product deleted successfully");
                allProduct()
                
            }
            else{
                console.error("failed to delete the product item")
            }
        } catch (error) {
            console.error("internal server error")
        }
    }
   


    return (
        <blogContext.Provider value={{ state, dispatch, allProduct, product, setProduct, editProduct , deleteProduct }}>
            {props.children}
        </blogContext.Provider>
    )
}
export default ProductState


// const deleteProduct = async (id) => {
//     try {
//         const response = await fetch(`http://localhost:5000/api/product/deleteproduct/${id}`, {
//             method: 'DELETE',

//             headers: {
//                 "Content-Type": "application/json",
//                 "auth-token": localStorage.getItem('token')
//             },
//         });

//         if (response.ok) {
//             console.log("Work item deleted successfully.");
//             // Update the state to remove the deleted item from the UI
//             allProduct(); // Fetch the updated list of products
//         } else {
//             console.error("Failed to delete the work item.");
//         }
//     } catch (error) {
//         console.error("An error occurred while deleting the work item:", error);
//     }
// };