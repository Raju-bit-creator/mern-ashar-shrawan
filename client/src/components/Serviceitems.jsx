
import React, { useContext, useEffect } from 'react';
import coffee from '../assets/coffee.jpg';
import blogContext from '../context/blogs/BlogContext';

const Serviceitems = () => {
  const context = useContext(blogContext);
  const { state: { cart, products }, dispatch, allProduct ,product } = context;

  // Fetch products when the component mounts
  useEffect(() => {
    allProduct();  // Fetch products from backend
   
  }, []);  // Empty dependency array to run once after initial render



  

  return (
    <div className='container'>
     
      <h4 className='service-heading my-3'>Our Products</h4>
      <div className='row'>
        {product && product.map((e) => {
          return (
            <div className='col-md-3'>
              <div className="card" key={e._id}>
                <img src={`http://localhost:5000/uploads/${e.images[0]}`} className="card-img-top" alt={e.title} />
                <div className="card-body">
                  <h5 className="card-title">{e.title}</h5>
                  <p className="card-text">Rs. {e.price}</p>
                  {/* Check if the product is in the cart */}
                  {cart && cart.some(p => p._id === e._id) ? (
                    <button
                      className='btn btn-danger'
                      onClick={() => {
                        dispatch({
                          type: "REMOVE_FROM_CART",
                          payload: e
                        });
                      }}
                    >
                      Remove from cart
                    </button>
                  ) : (
                    <button
                      className='btn btn-primary'
                      onClick={() => {
                        dispatch({
                          type: "ADD_TO_CART",
                          payload: e
                        });
                      }}
                    >
                      Add to cart
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Serviceitems;