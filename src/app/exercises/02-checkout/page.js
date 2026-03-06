'use client';
import React, { useEffect } from 'react';

import DATA from './data';
import reducer from './reducer';
import StoreItem from './StoreItem';
import CheckoutFlow from './CheckoutFlow';
import './styles.css';

function CheckoutExercise() {
  const [items, dispatch] = React.useReducer(
    reducer,
    []
  );

  useEffect(() => {
    //grab stored items on render
    const savedTable = window.localStorage.getItem('checkout-items');
    if (savedTable) {
      JSON.parse(savedTable).forEach(item => {
        for (let i = 0; i < item.quantity; i++) {
          dispatch({
            type: 'add-item',
            item,
          });
        }
      });
    }
  }, []);

  useEffect(() => {
    //update cart items in local storage whenever items change
    if (typeof items === 'object') {
      window.localStorage.setItem('checkout-items', JSON.stringify(items));
    }
  }, [items]);

  return (
    <>
      <h1>Neighborhood Shop</h1>

      <main>
        <div className="items">
          {DATA.map((item) => (
            <StoreItem
              key={item.id}
              item={item}
              handleAddToCart={(item) => {
                dispatch({
                  type: 'add-item',
                  item,
                });
              }}
            />
          ))}
        </div>

        <CheckoutFlow
          items={items}
          taxRate={0.15}
          handleDeleteItem={(item) =>
            dispatch({
              type: 'delete-item',
              item,
            })
          }
        />
      </main>
    </>
  );
}

export default CheckoutExercise;
