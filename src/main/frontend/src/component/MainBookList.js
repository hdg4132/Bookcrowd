import React from "react";
import book1 from "../assets/book1.jpg";
import Main1 from "../assets/Main1.png";
import Main2 from "../assets/Main2.png";

export default function MainBookList() {
  const images = [book1, Main1, Main2, Main2, Main1, Main2, book1, Main1];

  return (
    <li>
      <a href="#">
        <div className="book_list_box_item">
          {images.map((image, index) => (
            <img key={index} src={image} alt={`image ${index +1}`}/>
          ))}
        </div>
      </a>
    </li>
  );
}
