import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { DELETE } from "../redux/actions/action";
import cartImg from "./cart.gif";
import logo from "./logo.png";

const Header = () => {
  const [price, setPrice] = useState(0);
  console.log(price);
  const getdata = useSelector((state) => state.cartreducer.carts);

  console.log(getdata);
  const dispatch = useDispatch();

  const [cartMenu, setCartMenu] = useState(null);
  const open = Boolean(cartMenu);
  const handleClick = (event) => {
    setCartMenu(event.currentTarget);
  };
  const handleClose = () => {
    setCartMenu(null);
  };

  const deleteItem = (id) => {
    console.log("Deleting item with id:", id);
    dispatch(DELETE(id));
  };

  useEffect(() => {
    const totalPrice = () => {
      let price = 0;
      getdata.map((item) => (price += item.price));
      setPrice(price);
    };
    totalPrice();
  }, [getdata]);
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark" style={{ height: "70px" }}>
        <Container>
          <NavLink to="/" className="text-decoration-none text-light mx-3">
            <img
              src={logo}
              alt=""
              style={{ width: "40px", height: "40px", borderRadius: "50px" }}
            />
          </NavLink>
          <Nav className="me-auto">
            <NavLink to="/home" className="text-decoration-none text-light">
              Home
            </NavLink>
          </Nav>
          <Badge
            badgeContent={getdata.length}
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            sx={{
              "& .MuiBadge-badge": {
                backgroundColor: "yellow", // Custom background color
                color: "#000", // Text color
              },
            }}
          >
            <i
              class="fa-solid fa-cart-shopping text-light"
              style={{ fontSize: 25, cursor: "pointer" }}
            ></i>
          </Badge>
        </Container>
        <Menu
          id="basic-menu"
          cartMenu={cartMenu}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
          anchorOrigin={{
            vertical: "top", // The menu will appear at the top of the badge
            horizontal: "right", // The menu will be aligned to the right of the badge
          }}
          transformOrigin={{
            vertical: "top", // Aligns the top of the menu with the top of the badge
            horizontal: "right", // Aligns the right side of the menu with the right side of the badge
          }}
          sx={{
            transform: "translateY(25px)", // Moves the menu 8px down from the top position
          }}
        >
          {getdata.length ? (
            <div
              className="card_details"
              style={{ width: "24rem", padding: "20px" }}
            >
              <Table style={{ tableLayout: "fixed", width: "100%" }}>
                <thead>
                  <tr>
                    <th style={{ width: "40%" }}>Photos</th>
                    <th style={{ width: "50%" }}>Restaurent Name</th>
                  </tr>
                </thead>
                <tbody>
                  {getdata.map((cartItems, index) => {
                    return (
                      <>
                        <tr key={index}>
                          <td>
                            <NavLink
                              to={`/cart/${cartItems.id}`}
                              onClick={handleClose}
                            >
                              <img
                                src={cartItems.imgdata}
                                style={{ width: "5rem", height: "5rem" }}
                                alt=""
                              />
                            </NavLink>
                          </td>
                          <td className="mx-3">
                            <p>{cartItems.rname}</p>
                            <p>price: ₹{cartItems.price}</p>
                            <p>Quantity: {cartItems.qnty}</p>
                            <p
                              style={{
                                color: "red",
                                fontSize: 20,
                                cursor: "pointer",
                              }}
                              onClick={() => deleteItem(cartItems.id)}
                            >
                              <i className="fas fa-trash smalltrash"></i>
                            </p>
                          </td>
                          <td
                            className="mt-5"
                            style={{
                              color: "red",
                              fontSize: 20,
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              console.log(
                                "Deleting item   with id:",
                                cartItems.id
                              );
                              deleteItem(cartItems.id);
                            }}
                          >
                            <i className="fas fa-trash largetrash"></i>
                          </td>
                        </tr>
                      </>
                    );
                  })}
                  <p className="text-center">Total :₹ {price}</p>
                </tbody>
              </Table>
            </div>
          ) : (
            <div
              className="card_details d-flex justify-content-center align-items-center"
              style={{ width: "20rem", padding: 10, position: "relative" }}
            >
              <i
                onClick={handleClose}
                className="fas fa-close smallclose"
                style={{
                  position: "absolute",
                  top: 2,
                  right: 20,
                  fontSize: 23,
                  cursor: "pointer",
                }}
              ></i>
              <p style={{ fontSize: "22px" }}>Your Cart is Empty</p>
              <img
                style={{ width: "5rem", padding: 10 }}
                className="emptycart_img"
                src={cartImg}
                alt=""
              />
            </div>
          )}
        </Menu>
      </Navbar>
    </>
  );
};

export default Header;
