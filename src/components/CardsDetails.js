import React from "react";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ADD, DELETE, REMOVE } from "../redux/actions/action";

const CardsDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const getdata = useSelector((state) => state.cartreducer.carts);
  const dispatch = useDispatch();

  // Find the specific item in the cart
  const item = getdata.find((e) => e.id == id);

  const addtocartclick = (item) => {
    dispatch(ADD(item));
  };

  const deleteItem = (id) => {
    dispatch(DELETE(id));
    navigate("/");
  };

  const decrementCart = (item) => {
    dispatch(REMOVE(item));
  };
  if (!item) {
    return (
      <div className="container mt-2">
        <h2 className="text-center">Item not found</h2>
      </div>
    );
  }

  return (
    <div className="container mt-2">
      <h2 className="text-center">Items Details Page</h2>

      <section className="container mt-3">
        <div className="Itemsdetails py-4">
          <div className="items_img">
            <img src={item.imgdata} alt="" />
          </div>
          <div className="details">
            <Table>
              <tr>
                <td>
                  <p>
                    <strong>Restaurant</strong>: {item.rname}
                  </p>
                  <p>
                    <strong>Price</strong>: ₹{item.price}
                  </p>
                  <p>
                    <strong>Dishes</strong>: {item.address}
                  </p>
                  <p>
                    <strong>Total</strong>: ₹{item.qnty * item.price}
                  </p>
                  <div
                    className="mt-5 d-flex justify-content-between align-items-center"
                    style={{
                      width: 100,
                      cursor: "pointer",
                      background: "#ddd",
                      color: "#111",
                    }}
                  >
                    <span
                      style={{ fontSize: 24 }}
                      onClick={() => decrementCart(item)}
                    >
                      -
                    </span>
                    <span style={{ fontSize: 22 }}>{item.qnty}</span>
                    <span
                      style={{ fontSize: 24 }}
                      onClick={() => addtocartclick(item)}
                    >
                      +
                    </span>
                  </div>
                </td>
                <td>
                  <p>
                    <strong>Rating:</strong>{" "}
                    <span
                      style={{
                        background: "green",
                        color: "#fff",
                        padding: "2px 5px",
                        borderRadius: "5px",
                      }}
                    >
                      {item.rating} ★
                    </span>
                  </p>
                  <p>
                    <strong>Order Review:</strong> <span>{item.somedata}</span>
                  </p>
                  <p onClick={() => deleteItem(item.id)}>
                    <strong>Remove:</strong>{" "}
                    <span>
                      <i
                        className="fas fa-trash"
                        style={{
                          color: "red",
                          fontSize: 20,
                          cursor: "pointer",
                        }}
                      ></i>
                    </span>
                  </p>
                </td>
              </tr>
            </Table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CardsDetails;
