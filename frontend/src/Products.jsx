import { useState, useEffect } from "react";
import Card from "./Card";

function Products({ searchquery = "" }) {
  const [products, setproducts] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState("");

  useEffect(() => {
    fetch("https://backend-v4ql.onrender.com/products", {
      headers: {
        authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkF5dXNoaSIsInJvbGUiOiJidXllciIsImlhdCI6MTc4MDg2MjcyMywiZXhwIjoxNzgzNDU0NzIzfQ.y4_gBMu-wRIsd4oJ-9eaInREJjCw6lnVU9H6sye2kKo",
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