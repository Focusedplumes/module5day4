import { db } from "@/server/db";

export default function handler(req, res) {
  if (req.method === "GET") {
    const cartItems = db.cart.get();
    res.status(200).json({ cart: cartItems });
  } else if (req.method === "POST") {
    const menuId = req.body.id;
    const itemInCartAlready = db.cart.getById(menuId);
    if (itemInCartAlready) {
      db.cart.updateById(menuId, itemInCartAlready.quantity + 1);
    }
// TODO #1 use the db.cart.getById method to see if we already have the item in the cart
    // IF we do have the item in the cart already, then update the quantity, otherwise add the item
      //Solution is to fix on back end as seen above
      else {
        db.cart.add(req.body);
      }
      res.status(200).json({ message: "Item added to cart" });
    } else {
      res.status(404).json({ message: "We only support GET requests" });
    }
  }