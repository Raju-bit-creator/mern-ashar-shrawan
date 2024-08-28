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
  
//   const [article, setArticle] = useState([])
//      console.log(article);
//     const fetchData =async () => {
//         let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${props.apiKey}`
//         let data = await fetch(url)
//         let parseData= await data.json()
//         console.log(parseData);
//         setArticle(parseData.articles)

        
//        }
      
    return (
        <blogContext.Provider  value={{state , dispatch}}>
            {props.children}
        </blogContext.Provider>
    )
}
export default BlogState
