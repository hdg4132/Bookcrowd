import React from "react";
import book1 from "../assets/book1.jpg"

export default function MainBookList() {
 


  return (
    <li>
      <a href="#">
        <div className="book_list_box_item">
          <img src={book1} alt=" "/>
        </div>
      </a>
    </li>
  );
}
