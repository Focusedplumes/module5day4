import { useEffect, useState } from "react";

export default function Home() {
  const [menu, setMenu] = useState([]);
  const [cartCount, setCartCount] = useState(0); //need use state for counter to add items to cart

  useEffect(() => {
    async function loadData() {
      try{
      const res = await fetch("/api/menu");
      const data = await res.json();
      setMenu(data.menu);
    } catch (error) {
      console.error("Error loading menu:", error);
    }
  }
    loadData();
  }, []);

  async function addToCart(id) {
   try {
      const res = await fetch(`/api/cart`, {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify({ id: id, quantity: 1 }),
   });
   if (res.ok) {
    setCartCount(cartCount + 1); // Update cart count
  }else {
    console.error("Error adding to cart");
  }
} catch (error) {
  console.error("Error adding to cart:", error);
}
}

  if (menu.length === 0) {
    return <h1>Loading...</h1>;
  }

  return (
    <><nav className="navbar">  {/* simple navigation showing items in shopping cart  */}
        <a href="#" className="brand">Bean Bag</a>
        <div className="cart">
          <span className="cart-icon">🛒</span>
          <span className="cart-count">{cartCount}</span>
        </div>
        </nav>
      <h1>Welcome to Coffee Shop</h1>
      <h4>Here is our menu:</h4>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          padding: "10px",
        }}
      >
        {menu.map((item) => {
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
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <p>{item.price}</p>
              <button onClick={() => addToCart(item.id)}>Add to cart</button>
            </div>
          );
        })}
      </div>
    </>
  );
}