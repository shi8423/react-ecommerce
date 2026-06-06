import { useState } from "react";

function Card(props) {
  const fallbackImage = `https://dummyjson.com/image/300x220/ece9ff/4f46e5?text=${encodeURIComponent(
    props.title
  )}`;

  const imageUrls = props.image
    ? [
        props.image,
        `https://images.weserv.nl/?url=${encodeURIComponent(
          props.image.replace("https://", "")
        )}`,
        `https://wsrv.nl/?url=${encodeURIComponent(props.image)}`,
        fallbackImage,
      ]
    : [fallbackImage];

  const [imageIndex, setImageIndex] = useState(0);

  const imageUrl = imageUrls[imageIndex];

  return (
    <div className="card">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={props.title}
          referrerPolicy="no-referrer"
          style={{
            width: "200px",
            height: "200px",
            objectFit: "contain",
          }}
          onError={() => {
            if (imageIndex < imageUrls.length - 1) {
              setImageIndex(imageIndex + 1);
            }
          }}
        />
      ) : (
        <div className="product-placeholder">{props.title}</div>
      )}

      <h2>title: {props.title}</h2>

      <h3>price: {props.price}</h3>
    </div>
  );
}

export default Card;