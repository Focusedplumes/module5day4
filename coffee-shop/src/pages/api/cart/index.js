import { db } from "@/server/db";

export default function handler(req, res) {
    const menuItems = db.cart.get() //mock version of our database
    if (req.method === 'GET') {
        const cartItems = db.cart.get();
        res.status(200).json({ cart: cartItems }); // when someone hits this end point, then responding with an object that has a menu key and the menu key will have the array of objects menuItems
    } else if (req.method === 'POST') {
      db.cart.add(req.body);
      req.status(200).json({ message: "Item added to cart"});
        } else {
        res.status(404).json({ message: "We only support GET requests" });
    }
    
  } //for the function is just meaning "request handler"