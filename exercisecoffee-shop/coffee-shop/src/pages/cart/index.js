import { useEffect, useState } from "react";

export default function Cart() {
  const [cartItems, setCartItems] = useState({ cart: [] });
  const [cartLoading, setCartLoading] = useState(false) //for loading data from the cart
  const [cartItemLoading, setCartItemLoading] = useState(false);

  async function loadData() {
    setCartLoading(true) //loading the cart
    const res = await fetch("/api/cart");
    const data = await res.json();
    setCartItems(data);
    setCartLoading(false) //when done loading
  }

  useEffect(() => {
    loadData(); 
  }, []);

  async function removeFromCart(id) {
    const res = await fetch(`/api/cart/${id}`, { method: "DELETE" });
    await loadData(); //solution calling loadData again to reload it.
    alert(`Item with id ${id} removed from cart`);
    // TODO #2 - we need to update the UI to reflect the changes in the cart. The simplest way to do this is to simply call loadData again. We also want to show the user an alert that we successfully removed the item
  }

  async function updateCartItem(id, quantity) {
    setCartItemLoading(true);
    const res = await fetch(`/api/cart/${id}`, {
      method: "PUT",
      body: JSON.stringify({ quantity }),
      headers: { "Content-Type": "application/json" },
    });
    setCartItemLoading(false);
    await loadData();
  }


  return (
    <>
      <h1>Cart</h1>
      <h4>Here is our cart:</h4>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          padding: "10px",
        }}
      >
        {cartLoading ? ( 
          <h1>Loading...</h1>
        ) : (
          cartItems.cart.map((item) => {
            return (
            <div
              key={item.id}
              style={{
                width: "300px",
                border: "1px solid black",
                borderRadius: "10px",
                margin: "10px",
                padding: "10px",
              }}
            >
              <h3>{item.id}</h3>
              <p>{item.quantity}</p>
              {/* TODO #3 add increment and decrement buttons here */}
              <button
                  disabled={cartItemLoading}
                  onClick={() => updateCartItem(item.id, item.quantity + 1)}
                >
                  Increment
                </button>
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          );
        })
      )}
    </div>
      {/* TODO #4 add form here for submitting the order */}
    </>
  );
}