import "./GPCardsContainer.css";
import React from "react";

const grads = [
  {
    name: "Siver",
    username: "siveromar",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfu1mi6LAfuv1HSVFYUtOVgBsIB5f96Ui_Xw&usqp=CAU"
  },
  {
    name: "Yesna",
    username: "Yesna-Omar",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfu1mi6LAfuv1HSVFYUtOVgBsIB5f96Ui_Xw&usqp=CAU"
  },
  {
    name: "Rahma",
    username: "rahmaB1",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfu1mi6LAfuv1HSVFYUtOVgBsIB5f96Ui_Xw&usqp=CAU"
  },
  {
    name: "Muath",
    username: "Muath-Alawadhi",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfu1mi6LAfuv1HSVFYUtOVgBsIB5f96Ui_Xw&usqp=CAU"
  },
  {
    name: "Najah",
    username: "nfarah22",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfu1mi6LAfuv1HSVFYUtOVgBsIB5f96Ui_Xw&usqp=CAU"
  },
  {
    name: "Siver1",
    username: "siveromar",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfu1mi6LAfuv1HSVFYUtOVgBsIB5f96Ui_Xw&usqp=CAU"
  },
  {
    name: "Yesna1",
    username: "Yesna-Omar",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfu1mi6LAfuv1HSVFYUtOVgBsIB5f96Ui_Xw&usqp=CAU"
  },
  {
    name: "Rahma1",
    username: "rahmaB1",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfu1mi6LAfuv1HSVFYUtOVgBsIB5f96Ui_Xw&usqp=CAU"
  },
  {
    name: "Muath1",
    username: "Muath-Alawadhi",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfu1mi6LAfuv1HSVFYUtOVgBsIB5f96Ui_Xw&usqp=CAU"
  },
  {
    name: "Najah1",
    username: "nfarah22",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfu1mi6LAfuv1HSVFYUtOVgBsIB5f96Ui_Xw&usqp=CAU"
  }
];

function GPCardsContainer() {
  return (
    <div className="GPCardsContainerBlock"> 
      {grads.map((grad, index) => (
        <div className="cardsBlock" key={index}>
          <img src={grad.image} alt={grad.name} className="cards-img" />
          <p className="grad-name">{grad.name}</p>
          <p>Username: {grad.username}</p>
        </div>
      ))}
    </div>
  );
}

export default GPCardsContainer;