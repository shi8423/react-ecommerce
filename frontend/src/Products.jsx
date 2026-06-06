import { useState, useEffect } from "react";
import Card from "./Card";

function Products({ searchquery = "" }) {
  const [products, setproducts] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/products", {
      headers: {
        authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImF5dSIsInJvbGUiOiJidXllciIsImlhdCI6MTc4MDczNDE2NSwiZXhwIjoxNzgwNzM3NzY1fQ.hAAsmu4A9toon1nOKqxtWZQYopct4nE0IzSv9t6clKI",
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
    <div className="products">
      <h1>Total Products: {products.length}</h1>
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
  );
}

export default Products;