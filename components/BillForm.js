import React, { useEffect, useState, Fragment } from 'react';
import { useRouter } from 'next/router';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { createBill, updateBill } from '../api/billData';

const initialState = {
  name: '',
  total_amount: '',
  due_date: '',
  billId: '',
};

function BillForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();
  const [inputFields, setInputFields] = useState([
    '',
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleInputChange = (index, event) => {
    const values = [...inputFields];
    if (event.target.name === 'splitValues') {
      values[index] = event.target.value;
    }
    // console.log('split values ===', values);
    setInputFields(values);
  };

  const handleAddFields = () => {
    const values = [...inputFields];
    values.push('');
    setInputFields(values);
  };
  const handleRemoveFields = (index) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };

  useEffect(() => {
    if (obj?.firebaseKey) {
      setFormInput(obj);
      setInputFields(obj.splitValues);
    }
  }, [obj, user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const splitValues = [];
    for (let index = 0; index < inputFields.length; index++) {
      const element = inputFields[index];
      splitValues.push(parseInt(element, 10));
    }
    const payload = {
      ...formInput, uid: user.uid, userDisplayName: user.displayName, splitValues,
    };
    if (obj.firebaseKey) {
      updateBill(payload)
        .then(() => router.push('/'));
    } else {
      // const totalAmount = formInput.totalAmount && formInput.totalAmount.split(',');
      createBill(payload).then(() => {
        router.push('/');
      });
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <h1 className="title mt-5">{obj?.firebaseKey ? 'Update' : 'Add'} a Bill</h1>

        <FloatingLabel controlId="floatingInput1" label="Bill Name" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Enter Name"
            name="billName"
            value={formInput.billName}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        <FloatingLabel controlId="floatingInput3" label="Due Date" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Enter Due Date"
            name="dueDate"
            value={formInput.dueDate}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        <FloatingLabel controlId="floatingInput1" label="Total Amount" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Enter Total Amount"
            name="totalAmount"
            value={formInput.totalAmount}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        <Form onSubmit={handleSubmit}>
          <div className="form-row">
            {inputFields.map((inputField, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <Fragment key={`${inputField}~${index}`}>
                <div className="form-group col-sm-6">
                  <label htmlFor="splitValues">Split Amount</label>
                  <input
                    // eslint-disable-next-line jsx-a11y/no-autofocus
                    autoFocus="autoFocus"
                    type="text"
                    className="form-control"
                    id="splitValues"
                    name="splitValues"
                    defaultValue={inputField}
                    value={inputField.splitValues}
                    onChange={(event) => handleInputChange(index, event)}
                  />
                </div>

                <div className="form-group col-sm-2">
                  <button
                    className="btn btn-link"
                    type="button"
                    onClick={() => handleRemoveFields(index)}
                  >
                    -
                  </button>
                  <button
                    className="btn btn-link"
                    type="button"
                    onClick={() => handleAddFields()}
                  >
                    +
                  </button>
                </div>
              </Fragment>
            ))}
          </div>
        </Form>

        <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} a Bill</Button>
      </Form>

    </div>
  );
}

BillForm.propTypes = {
  obj: PropTypes.shape({
    billName: PropTypes.string,
    totalAmount: PropTypes.string,
    splitValues: PropTypes.string,
    dueDate: PropTypes.string,
    splitAmount: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

BillForm.defaultProps = {
  obj: initialState,
};

export default BillForm;
