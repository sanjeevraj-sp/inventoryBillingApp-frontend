import React, { useState } from "react";
import { Offcanvas, Button, Form, InputGroup } from "react-bootstrap";

import { validateAddBrandForm } from "../../utils/formValidation";
import "../../stylesheets/addBrandForm.css";
import { useSelector } from "react-redux";
import { formToJSON } from "axios";

const AddBrand = (props) => {
  const { show, handleClose, handleSubmit } = props;
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const userStore = useSelector((state) => state.user);
  const theme = userStore.theme;

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "file") {
      // Handle file input separately
      const file = e.target.files[0];
      setFormData((prevData) => ({
        ...prevData,
        [name]: file,
      }));
    } else {
      // Handle regular form fields
      setFormData((prevData) => ({
        ...prevData,
        [name]: value || "",
      }));
    }
  };

  const handleFormSubmit = () => {
    const validationErrors = validateAddBrandForm(formData);
    if (validationErrors) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setFormData({});
    handleSubmit(formData);
  };

  return (
    <>
      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="end"
        style={{ width: "32rem" }}
      >
        <Offcanvas.Header closeButton className="offcanvasheader">
          <Offcanvas.Title>Add Brand</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className={`addBrandForm-${theme}`}>
          <Form>
            <Form.Group className="mb-3" controlId="formBrandName">
              <Form.Label>Brand Name</Form.Label>
              <Form.Control
                type="text"
                name="brandName"
                value={formData.brandName || ""}
                onChange={handleChange}
                onFocus={(e) => e.target.classList.add("focused")}
                onBlur={(e) => e.target.classList.remove("focused")}
                className="custom-input"
              />
              {errors.brandName && (
                <Form.Text className="text-danger">
                  {errors.brandName}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group controlId="formBrandImage" className="mb-3">
              <Form.Label>Brand Image</Form.Label>
              <Form.Control
                type="file"
                name="brandImage"
                onChange={(e) =>
                  setFormData({ ...formData, brandImage: e.target.files[0] })
                }
                onFocus={(e) => e.target.classList.add("focused")}
                onBlur={(e) => e.target.classList.remove("focused")}
                className="custom-input"
              />
              {errors.brandImage && (
                <Form.Text className="text-danger">
                  {errors.brandImage}
                </Form.Text>
              )}
            </Form.Group>

            <div className="offcanvasFooter">
              <Button
                variant="primary"
                className="bg-custom-color"
                onClick={() => handleFormSubmit()}
              >
                Save
              </Button>
            </div>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default AddBrand;
