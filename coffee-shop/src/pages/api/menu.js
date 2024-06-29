// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { db } from "@/server/db";

export default function handler(req, res) {
    const menuItems = db.menu.get() //mock version of our database
    if (req.method === 'GET') {
        res.status(200).json({ menu: menuItems }); // when someone hits this end point, then responding with an object that has a menu key and the menu key will have the array of objects menuItems
    } else {
        res.status(404).json({ message: "We only support GET requests" });
    }
    
  } //for the function is just meaning "request handler"
  