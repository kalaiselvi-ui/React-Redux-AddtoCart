import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useDispatch } from "react-redux";
import { ADD } from "../redux/actions/action";
import cardsdata from "./CardData";
import "./style.css";

const Cards = () => {
  const [data, setData] = useState(cardsdata);
  // console.log(data);

  const dispatch = useDispatch();

  const addtocartclick = (e) => {
    // console.log(e);
    dispatch(ADD(e));
  };

  return (
    <div className="container mt-3 mb-5">
      <h2 className="text-center" style={{ color: "blue" }}>
        Add to Cart Projects
      </h2>

      <div className="row d-flex justify-content-center align-items-center">
        {data.map((item, id) => {
          return (
            <>
              <Card
                key={id}
                style={{ width: "22rem", border: "none" }}
                className="mx-2 mt-4 card_style"
              >
                <Card.Img
                  variant="top"
                  src={item.imgdata}
                  style={{ height: "16rem" }}
                  className="mt-3"
                />
                <Card.Body>
                  <Card.Title>{item.rname}</Card.Title>
                  <Card.Text>Price: ₹{item.price}</Card.Text>
                  <div className="button_div">
                    <Button
                      style={{
                        background: "yellow",
                        color: "black",
                        border: "none",
                      }}
                      onClick={() => addtocartclick(item)}
                      className="col-lg-12"
                      size="lg"
                    >
                      Add to Cart
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Cards;
