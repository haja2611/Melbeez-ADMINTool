import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { showErrorToast, showSuccessToast } from "../../../Utility/toastMsg";

const AddEditModal = ({
  show,
  onHide,
  formData,
  handleInputChange,
  handleSubmit,
  setFormData,
}) => {
  const [validated, setValidated] = useState(false);

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      try {
        await handleSubmit(e); // Call handleSubmit function passed from parent

        onHide(); // Close modal
      } catch (error) {
        // console.error("Error handling warranty:", error);
        showErrorToast("Error handling warranty.");
      }
    }

    setValidated(true);
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>Edit Warranty Product</Modal.Title>
      </Modal.Header>
      <Form noValidate validated={validated} onSubmit={handleSubmitForm}>
        <Modal.Body>
          {/* <div style={{ display: 'inline-block', width: '48%', marginRight: '8px' }}>
            <Form.Group controlId="warrantyId">
              <Form.Label>* Warranty ID</Form.Label>
              <Form.Control
                type="text"
                name="warrantyId"
                value={formData.warrantyId}
                onChange={handleInputChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a warranty ID.
              </Form.Control.Feedback>
            </Form.Group>
          </div> */}
          <div
            style={{
              display: "inline-block",
              width: "48%",
              marginRight: "8px",
            }}
          >
            <Form.Label>* Vendor Name</Form.Label>
            <Form.Control
              type="text"
              autoComplete="off"
              placeholder="Vendor Name"
              name="vendor"
              className="mb-3"
              required
              value={formData.vendor}
              onChange={handleInputChange}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a vendor name.
            </Form.Control.Feedback>
          </div>
          <div
            style={{
              display: "inline-block",
              width: "48%",
              marginRight: "8px",
            }}
          >
            <Form.Label>* Product Name</Form.Label>
            <Form.Control
              type="text"
              autoComplete="off"
              placeholder="Product Name"
              name="productName"
              className="mb-3"
              required
              value={formData.productName}
              onChange={handleInputChange}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a product name.
            </Form.Control.Feedback>
          </div>
          <div
            style={{
              display: "inline-block",
              width: "48%",
              marginRight: "8px",
            }}
          >
            <Form.Label>* Monthly Price</Form.Label>
            <Form.Control
              type="text"
              autoComplete="off"
              placeholder="Monthly Price"
              name="monthlyPrice"
              className="mb-3"
              required
              pattern="^\d*(\.\d{0,2})?$"
              value={formData.monthlyPrice}
              onChange={handleInputChange}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a monthly price.
            </Form.Control.Feedback>
          </div>
          <div
            style={{
              display: "inline-block",
              width: "48%",
              marginRight: "8px",
            }}
          >
            <Form.Label>* Annual Price</Form.Label>
            <Form.Control
              type="text"
              autoComplete="off"
              placeholder="Annual Price"
              name="annualPrice"
              className="mb-3"
              required
              pattern="^\d*(\.\d{0,2})?$"
              value={formData.annualPrice}
              onChange={handleInputChange}
            />
            <Form.Control.Feedback type="invalid">
              Please provide an annual price.
            </Form.Control.Feedback>
          </div>
          <div
            style={{
              display: "inline-block",
              width: "48%",
              marginRight: "8px",
            }}
          >
            <Form.Label>* Discount</Form.Label>
            <Form.Control
              type="text"
              autoComplete="off"
              placeholder="Discount"
              name="discount"
              className="mb-3"
              pattern="^\d*(\.\d{0,2})?$"
              required
              value={formData.discount}
              onChange={handleInputChange}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a discount.
            </Form.Control.Feedback>
          </div>
          <div
            style={{
              display: "inline-block",
              width: "48%",
              marginRight: "8px",
            }}
          >
             <Form.Group controlId="status">
              <Form.Label> * Status</Form.Label>
              <Form.Control
                as="select"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                required
              >
                <option value="">Select</option>
                <option value="Pending">Pending</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                Please select a status.
              </Form.Control.Feedback>
            </Form.Group>
          </div>
          <div>
            <Form.Label>* Terms and Conditions</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="terms_conditions"
              className="mb-3"
              required
              value={formData.terms_conditions}
              onChange={handleInputChange}
            />
            <Form.Control.Feedback type="invalid">
              Please provide terms and conditions.
            </Form.Control.Feedback>
          </div>
          {formData.id ? (
            <div
              style={{
                display: "inline-block",
                width: "48%",
                marginRight: "8px",
              }}
            >
              <Form.Label>* Updated By</Form.Label>
              <Form.Control
                type="text"
                autoComplete="off"
                placeholder="Updated By"
                name="updated_by"
                className="mb-3"
                required
                value={formData.updated_by}
                onChange={handleInputChange}
              />
              <Form.Control.Feedback type="invalid">
                Please provide the updated by information.
              </Form.Control.Feedback>
            </div>
          ) : (
            <div
              style={{
                display: "inline-block",
                width: "48%",
                marginRight: "8px",
              }}
            >
              <Form.Label>* Created By</Form.Label>
              <Form.Control
                type="text"
                autoComplete="off"
                placeholder="Created By"
                name="created_by"
                className="mb-3"
                required
                value={formData.created_by}
                onChange={handleInputChange}
              />
              <Form.Control.Feedback type="invalid">
                Please provide the created by information.
              </Form.Control.Feedback>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              onHide();
              setFormData({});
            }}
          >
            Close
          </Button>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddEditModal;
