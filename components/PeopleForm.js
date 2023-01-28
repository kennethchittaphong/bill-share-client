import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { updatePeoples, createPeoples } from '../api/peopleData';
import { getBills } from '../api/billData';

const initialState = {
  name: '',
  amount: '',
  due_date: '',
  status: '',
};

function PeopleForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const [bills, setBills] = useState([]);
  // const { user } = useAuth();

  useEffect(() => {
    getBills().then(setBills);
    if (obj.id) setFormInput(obj);
  }, [obj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formInput.id) {
      updatePeoples(formInput).then(() => router.push('/'));
    } else {
      const payload = {
        user: parseInt(formInput.billId, 10),
        name: formInput.name,
        due_date: formInput.due_date,
        amount: parseInt(formInput.amount, 10),
        status: formInput.status,
      };
      createPeoples(payload).then(() => {
        router.push('/');
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{formInput.id ? 'Update' : 'Create'} a Person</h2>

      <FloatingLabel controlId="floatingInput1" label="Name" className="mb-3">
        <Form.Control type="text" placeholder="Enter Name" name="name" value={formInput.name} onChange={handleChange} required />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput3" label="Amount" className="mb-3">
        <Form.Control type="text" placeholder="Enter Amount" name="amount" value={formInput.amount} onChange={handleChange} required />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput3" label="Due Date" className="mb-3">
        <Form.Control type="text" placeholder="Enter Due Date" name="due_date" value={formInput.due_date} onChange={handleChange} required />
      </FloatingLabel>

      <FloatingLabel controlId="floatingSelect" label="Bill">
        <Form.Select aria-label="Bill" name="billId" onChange={handleChange} className="mb-3" required>
          <option value="">Select a Bill</option>
          {bills.map((bill) => (
            <option key={bill.id} value={bill.id} selected={formInput.billId === bill.id}>
              {bill.name}
            </option>
          ))}
        </Form.Select>
        <Form.Check
          className="text-black mb-3"
          type="switch"
          id="status"
          name="status"
          label="Paid"
          checked={formInput.status}
          onChange={(e) => {
            setFormInput((prevState) => ({
              ...prevState,
              status: e.target.checked,
            }));
          }}
        />
      </FloatingLabel>

      <Button type="submit">{formInput.id ? 'Update' : 'Create'} a Person</Button>
    </Form>
  );
}

PeopleForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    amount: PropTypes.string,
    due_date: PropTypes.string,
    status: PropTypes.string,
    id: PropTypes.string,
    billId: PropTypes.string,
  }),
};

PeopleForm.defaultProps = {
  obj: initialState,
};

export default PeopleForm;
