import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

interface Item {
  id: string;
  name: string;
  quantity: number;
  type: string;
}

export default function ReadItems() {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      const itemsList = querySnapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as Item)
      );
      setItems(itemsList);
    };
    fetchItems();
  }, []);

  return (
    <div>
      <div className="flex flex-col items-center md:flex-row md:justify-evenly gap-4">
        {items.map((item) => (
          <div key={item.id} className="bg-white shadow-md rounded-lg p-4 w-48">
            <h3 className="text-xl font-semibold">
              {/* name and Name bc it was typed wrong in firebase xD */}
              {item.name ? item.name : item.Name}
            </h3>
            <p className="text-gray-600">{item.type ? item.type : item.Type}</p>
            <p className="text-gray-600">
              {item.quantity ? item.quantity : item.Quantity}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
