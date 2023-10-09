import "./Graduates.css";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";


const grads = [
  {
    id: 0,
    name: "Siver",
    username: "siveromar",
    repo:"23",
    language:"HTML,CSS,JS,React",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfu1mi6LAfuv1HSVFYUtOVgBsIB5f96Ui_Xw&usqp=CAU"
  },
  {
    id: 1,
    name: "Yesna",
    username: "Yesna-Omar",
    repo:"23",
    language:"HTML,CSS,JS,React",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfu1mi6LAfuv1HSVFYUtOVgBsIB5f96Ui_Xw&usqp=CAU"
  },
  {
    id: 2,
    name: "Rahma",
    username: "rahmaB1",
    repo:"23",
    language:"HTML,CSS,JS,React",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfu1mi6LAfuv1HSVFYUtOVgBsIB5f96Ui_Xw&usqp=CAU"
  },
  {
    id: 3,
    name: "Muath",
    username: "Muath-Alawadhi",
    repo:"23",
    language:"HTML,CSS,JS,React",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfu1mi6LAfuv1HSVFYUtOVgBsIB5f96Ui_Xw&usqp=CAU"
  },
  {
    id: 4,
    name: "Najah",
    username: "nfarah22",
    repo:"23",
    language:"HTML,CSS,JS,React",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfu1mi6LAfuv1HSVFYUtOVgBsIB5f96Ui_Xw&usqp=CAU"
  },
  {
    id: 5,
    name: "Siver1",
    username: "siveromar",
    repo:"23",
    language:"HTML,CSS,JS,React",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfu1mi6LAfuv1HSVFYUtOVgBsIB5f96Ui_Xw&usqp=CAU"
  },
  {
    id: 6,
    name: "Yesna1",
    username: "Yesna-Omar",
    repo:"23",
    language:"HTML,CSS,JS,React",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfu1mi6LAfuv1HSVFYUtOVgBsIB5f96Ui_Xw&usqp=CAU"
  },
  {
    id: 7,
    name: "Rahma1",
    username: "rahmaB1",
    repo:"23",
    language:"HTML,CSS,JS,React",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfu1mi6LAfuv1HSVFYUtOVgBsIB5f96Ui_Xw&usqp=CAU"
  },
  {
    id: 8,
    name: "Muath1",
    username: "Muath-Alawadhi",
    repo:"23",
    language:"HTML,CSS,JS,React",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfu1mi6LAfuv1HSVFYUtOVgBsIB5f96Ui_Xw&usqp=CAU"
  },
  {
    id: 9,
    name: "Najah1",
    username: "nfarah22",
    repo:"23",
    language:"HTML,CSS,JS,React",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfu1mi6LAfuv1HSVFYUtOVgBsIB5f96Ui_Xw&usqp=CAU"
  }
];

function Graduates() {
  // const [selectedProfile, setSelectedProfile] = useState(null);
  // const handleViewMoreClick = (profile) => {
  //   setSelectedProfile(profile);
  // };

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
          {/* <Card.Link href="./GraduatesProfile" onClick={() => handleViewMoreClick(grad)}>View More</Card.Link> */}
          <Link to="/Graduates/GraduatesProfile">View More</Link>
          </Card.Body>
          </Card>
          ))}
        </div>

      </div>
  );
}

export default Graduates;

