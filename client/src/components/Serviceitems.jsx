
import React, { useContext, useEffect, useState } from 'react';
import blogContext from '../context/blogs/BlogContext';
import { BsThreeDots } from "react-icons/bs";
import EditProductModal from './EditProductModal';

const Serviceitems = () => {
  const context = useContext(blogContext);
  const { state: { cart }, dispatch, allProduct, product, editProduct, deleteProduct } = context;
  const [menuVisible, setMenuVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const toggleMenu = (id) => {
    setMenuVisible(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };

  const openEditModal = (product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const closeEditModal = () => {
    setModalVisible(false);
    setSelectedProduct(null);
  };

  const saveEdit = (updateData) => {
    editProduct(selectedProduct._id, updateData);
    closeEditModal();
  };

  const handleDelete = async (id) => {
    await deleteProduct(id);
    allProduct(); // Refresh the product list after deletion
  };

  useEffect(() => {
    allProduct();
  }, []);

  return (
    <div className='container'>
      <h4 className='service-heading my-3'>Our Products</h4>
      <div className='row'>
        {product && product.map((e) => (
          <div className='col-md-3' key={e._id}>
            <div className="card">
              <img src={`http://localhost:5000/uploads/${e.images[0]}`} className="card-img-top" alt={e.title} />
              <div className="card-body">
                <div className='three-dots'>
                  <h5 className="card-title">{e.title}</h5>
                  <BsThreeDots onClick={() => toggleMenu(e._id)} />
                  {menuVisible[e._id] && (
                    <div className='menu-options'>
                      <button onClick={() => openEditModal(e)}>Edit</button>
                      <button onClick={() => handleDelete(e._id)}>Delete</button>
                    </div>
                  )}
                </div>
                <p className="card-text">Rs. {e.price}</p>
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
            {modalVisible && selectedProduct && selectedProduct._id === e._id && (
              <EditProductModal
                product={selectedProduct}
                onClose={closeEditModal}
                onSave={saveEdit}
               
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Serviceitems;
