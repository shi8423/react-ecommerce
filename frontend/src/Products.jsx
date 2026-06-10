import { useState, useEffect } from "react";
import Card from "./Card";

function Products({ searchquery = "" }) {
  const [products, setproducts] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState("");

  useEffect(() => {

const token = localStorage.getItem("token");

if (!token) {
  seterror("Please Login First");
  setloading(false);
  return;
}
  
  fetch("https://backend-v4ql.onrender.com/products", {
    headers: {
      authorization: `Bearer ${token}`,
      location: "Bhubaneswar",
  },
})
      .then((res) => res.json())
      .then((data) => {
        console.log("API DATA:", data);

        if (data.allproducts) {
          setproducts(data.allproducts);
        } else {
          seterror(data.msg || "Unable to load products");
          setproducts([]);
        }
      })
      .catch((err) => {
        console.log(err);
        seterror("Server Error");
      })
      .finally(() => {
        setloading(false);
      });
  }, []);

  let filteredproducts = products.filter((p) =>
    p.title.toLowerCase().includes(searchquery.toLowerCase())
  );

return (
  <div>
   <div className="products">
  {loading && <h2>Loading products...</h2>}

  {error && <h2>{error}</h2>}

  {filteredproducts.map((e) => (
    <Card
      key={e._id}
      image={e.image}
      title={e.title}
      price={e.price}
    />
  ))}

  {!loading && filteredproducts.length === 0 && !error && (
    <h2>No products found</h2>
  )}
</div>
</div>
);
}

export default Products;