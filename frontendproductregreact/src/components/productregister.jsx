import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import AXIOS from "axios";
import "./productregister.css";

function ProductRegister() {
  const [image, setImage] = useState({ preview: "", data: "" });
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [status, setStatus] = useState("");

  const handlerSubmit = async () => {
    let formdata = new FormData();
    formdata.append("file", image.data);
    formdata.append("name",name);
    formdata.append("price",price);
    formdata.append("quantity",selectedValue);
    
    await AXIOS.post("http://localhost:9005/imageup", formdata, {
      "context-type": "multipart/form-data",
    }).then((res) => {
      console.log(res.data.statusText);
      setStatus(res.data.statusText);
    });
  };
  return (
    <>
      <div className="formproduct">
        <div className="formproductsub">
          <div className="regHead">
            <h1>Product Registration</h1>
          </div>
          <div className="productimage">
            <h5>Upload Product Image</h5>
            <div className="imagediv">
            {image.preview && (
            <img src={image.preview} width="100" height="100"  alt="image"/>
          )}
          </div>
          </div>

          <Form
            onSubmit={handlerSubmit}
            encType="multipart/form-data"
            className="productimageform"
          >
           
              <input
                type="file"
                name="file"
                className="imagefile"
                onChange={(e) => {
                  const img = {
                    preview: URL.createObjectURL(e.target.files[0]),
                    data: e.target.files[0],
                  };
                  setImage(img);
                }}
              />
              <h3>{status}</h3>
             

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="text"
                placeholder="Enter product name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                type="text"
                placeholder="Enter price"
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicquantity">
              <Form.Select
                aria-label="Default select example"
                value={selectedValue}
                onChange={(e) => {
                  setSelectedValue(e.target.value);
                }}
              >
                <option>Select Quantity</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
              </Form.Select>
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
          </div>
        </div>
    </>
  );
}

export default ProductRegister;
