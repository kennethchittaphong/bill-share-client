import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { updatePeoples, createPeoples } from '../api/peopleData';
import { getBills } from '../api/billData';

const initialState = {
  name: '',
  amount: '',
  dueDate: '',
};

function PeopleForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const [bills, setBills] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    getBills(user.uid).then(setBills);
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formInput.firebaseKey) {
      updatePeoples(formInput).then(() => router.push('/'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createPeoples(payload).then(() => {
        router.push('/');
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{formInput.firebaseKey ? 'Update' : 'Create'} a Person</h2>

      <FloatingLabel controlId="floatingInput1" label="Name" className="mb-3">
        <Form.Control type="text" placeholder="Enter Name" name="name" value={formInput.name} onChange={handleChange} required />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput3" label="Amount" className="mb-3">
        <Form.Control type="text" placeholder="Enter Amount" name="amount" value={formInput.amount} onChange={handleChange} required />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput3" label="Due Date" className="mb-3">
        <Form.Control type="text" placeholder="Enter Due Date" name="dueDate" value={formInput.dueDate} onChange={handleChange} required />
      </FloatingLabel>

      <FloatingLabel controlId="floatingSelect" label="Bill">
        <Form.Select aria-label="Bill" name="billId" onChange={handleChange} className="mb-3" required>
          <option value="">Select a Bill</option>
          {bills.map((bill) => (
            <option key={bill.firebaseKey} value={bill.firebaseKey} selected={formInput.billId === bill.firebaseKey}>
              {bill.billName}
            </option>
          ))}
        </Form.Select>
        <Form.Check
          className="text-black mb-3"
          type="switch"
          id="paid"
          name="paid"
          label="Paid"
          checked={formInput.paid}
          onChange={(e) => {
            setFormInput((prevState) => ({
              ...prevState,
              paid: e.target.checked,
            }));
          }}
        />
      </FloatingLabel>

      <Button type="submit">{formInput.firebaseKey ? 'Update' : 'Create'} a Person</Button>
    </Form>
  );
}

PeopleForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    amount: PropTypes.string,
    dueDate: PropTypes.string,
    paid: PropTypes.string,
    firebaseKey: PropTypes.string,
    billId: PropTypes.string,
  }),
};

PeopleForm.defaultProps = {
  obj: initialState,
};

export default PeopleForm;
