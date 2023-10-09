import React from "react";
import "./Graduates.css";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import SearchBar from "./SearchBar";



const grads = [
  {
    name: "Siver",
    username: "siveromar",
    repo:"23",
    language:"HTML,CSS,JS,React",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfu1mi6LAfuv1HSVFYUtOVgBsIB5f96Ui_Xw&usqp=CAU"
  },
  {
    name: "Yesna",
    username: "Yesna-Omar",
    repo:"23",
    language:"HTML,CSS,JS,React",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfu1mi6LAfuv1HSVFYUtOVgBsIB5f96Ui_Xw&usqp=CAU"
  },
  {
    name: "Rahma",
    username: "rahmaB1",
    repo:"23",
    language:"HTML,CSS,JS,React",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfu1mi6LAfuv1HSVFYUtOVgBsIB5f96Ui_Xw&usqp=CAU"
  },
  {
    name: "Muath",
    username: "Muath-Alawadhi",
    repo:"23",
    language:"HTML,CSS,JS,React",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfu1mi6LAfuv1HSVFYUtOVgBsIB5f96Ui_Xw&usqp=CAU"
  },
  {
    name: "Najah",
    username: "nfarah22",
    repo:"23",
    language:"HTML,CSS,JS,React",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfu1mi6LAfuv1HSVFYUtOVgBsIB5f96Ui_Xw&usqp=CAU"
  },
  {
    name: "Siver1",
    username: "siveromar",
    repo:"23",
    language:"HTML,CSS,JS,React",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfu1mi6LAfuv1HSVFYUtOVgBsIB5f96Ui_Xw&usqp=CAU"
  },
  {
    name: "Yesna1",
    username: "Yesna-Omar",
    repo:"23",
    language:"HTML,CSS,JS,React",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfu1mi6LAfuv1HSVFYUtOVgBsIB5f96Ui_Xw&usqp=CAU"
  },
  {
    name: "Rahma1",
    username: "rahmaB1",
    repo:"23",
    language:"HTML,CSS,JS,React",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfu1mi6LAfuv1HSVFYUtOVgBsIB5f96Ui_Xw&usqp=CAU"
  },
  {
    name: "Muath1",
    username: "Muath-Alawadhi",
    repo:"23",
    language:"HTML,CSS,JS,React",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfu1mi6LAfuv1HSVFYUtOVgBsIB5f96Ui_Xw&usqp=CAU"
  },
  {
    name: "Najah1",
    username: "nfarah22",
    repo:"23",
    language:"HTML,CSS,JS,React",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfu1mi6LAfuv1HSVFYUtOVgBsIB5f96Ui_Xw&usqp=CAU"
  }
];



function Graduates() {
  return (
    <div>
      <SearchBar />
  <div className="CardsContainerBlock">
    {grads.map((grad, index) => (
  <Card style={{ width: '17rem' }}  key={index}>
<Card.Img variant="top" src={grad.image} alt={grad.name} className="cards-img" />
<Card.Body>
  <Card.Title>{grad.name}</Card.Title>
</Card.Body>
<ListGroup className="list-group-flush">
  <ListGroup.Item>Username: {grad.username}</ListGroup.Item>
  <ListGroup.Item>Repo: {grad.repo}</ListGroup.Item>
  <ListGroup.Item>Languages: {grad.language} </ListGroup.Item>
</ListGroup>
<Card.Body>
  <Card.Link href="#">View More</Card.Link>
</Card.Body>
</Card>
))}
</div>
</div>
  );
}

export default Graduates;

