import React, { useState } from 'react'
import axios from 'axios'

const Addproduct = () => {

    const [product, setProduct] = useState({
        title: "",
        description: "",
        price: "",
        instock: "",
        image: ""
    })
    const imageUpload = (e) => {
        setProduct({
            ...product, image: e.target.files[0]
        })
    }

    const handleSubmit =async () => {
        // console.log("this is adding product");
        const formData = new formData();
        formData.append('title', product.title)
        formData.append('description', product.description)
        formData.append('price', product.price)
        formData.append('instock', product.instock)
        if(product.image){
            formData.append('myfile', product.image)
        }
        try {
            const response= await axios.post('http://localhost:5000/api/product/addproduct', formData,{
                "auth-token ": localStorage.getItem('token')
            })
            const data = await response
            console.log("this our products", data);
            

        } catch (error) {
            
        }

    }

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value })
    }
    return (
        <div className='container'>
            <h4>Add your product here</h4>

            <form onSubmit={handleSubmit}>
                <div class="mb-3">
                    <label htmlFor="exampleInputEmail1" class="form-label">Title</label>
                    <input type="text" class="form-control" id="exampleInputEmail1" name='title' value={product.title} onChange={handleChange} aria-describedby="emailHelp" />

                </div>
                <div class="mb-3">
                    <label htmlFor="exampleInputEmail1" class="form-label">Description</label>
                    <input type="text" class="form-control" name='description' value={product.description} onChange={handleChange} id="exampleInputEmail1" aria-describedby="emailHelp" />

                </div>
                <div class="mb-3">
                    <label htmlFor="exampleInputPassword1" class="form-label">Price</label>
                    <input type="number" name='price' value={product.price} onChange={handleChange} class="form-control" id="price" />
                </div>
                <div class="mb-3">
                    <label htmlFor="exampleInputPassword1" class="form-label">Instock</label>
                    <input type="number" name='instock' value={product.instock} onChange={handleChange} class="form-control" id="instock" />
                </div>
                <div class="mb-3">
                    <label htmlFor="exampleInputPassword1" class="form-label">choose images</label>
                    <input type="file" multiple name='image' onChange={imageUpload} class="form-control" id="instock" />
                </div>

                <button type="submit" class="btn btn-primary">Submit</button>
            </form>


        </div>
    )
}

export default Addproduct
