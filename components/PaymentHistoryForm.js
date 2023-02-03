import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import PropTypes from 'prop-types';
import { createPayment, getBillPayment } from '../api/paymentData';
import { useAuth } from '../utils/context/authContext';

const initialState = {
  id: 0,
};

function PaymentHistoryForm({ id }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getBillPayment().then();
    if (id) setFormInput(id);
  }, [id, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      bill_id: parseInt(id, 10),
      label: formInput.label,
      date_paid: formInput.date_paid,
      amount_paid: parseInt(formInput.amount_paid, 10),
      payment_type: formInput.payment_type,
      id,
    };
    createPayment(payload).then(() => {
      router.push(`/payment/${id}`);
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{formInput.id ? 'Update' : 'Create'} a Payment</h2>

      <FloatingLabel controlId="floatingInput1" label="Name" className="mb-3">
        <Form.Control type="text" placeholder="Enter Name" name="label" value={formInput.label} onChange={handleChange} required />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput3" label="Amount Paid" className="mb-3">
        <Form.Control type="text" placeholder="Enter Amount Paid" name="amount_paid" value={formInput.amount_paid} onChange={handleChange} required />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput3" label="Date Paid" className="mb-3">
        <Form.Control type="text" placeholder="Enter Date Paid" name="date_paid" value={formInput.date_paid} onChange={handleChange} required />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput3" label="Payment Type" className="mb-3">
        <Form.Control type="text" placeholder="Enter Payment Type" name="payment_type" value={formInput.payment_type} onChange={handleChange} required />
      </FloatingLabel>

      <Button type="submit">{formInput.id ? 'Update' : 'Create'} a Payment</Button>
    </Form>
  );
}

PaymentHistoryForm.propTypes = {
  id: PropTypes.number,
};

PaymentHistoryForm.defaultProps = {
  id: initialState,
};

export default PaymentHistoryForm;
