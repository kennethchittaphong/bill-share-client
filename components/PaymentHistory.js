import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';

const PaymentHistoryCard = ({ paymentObj, deletePayment }) => (
  <div className="payment-render">
    <Card className="text-center payment-card">
      <Card.Body>
        <Card.Text>{paymentObj.label}</Card.Text>
      </Card.Body>
    </Card>
    <Button variant="outline-danger" type="button" className="trash" onClick={() => deletePayment(paymentObj.id)} />
  </div>
);

PaymentHistoryCard.propTypes = {
  paymentObj: PropTypes.shape({
    id: PropTypes.number,
    label: PropTypes.string,
  }).isRequired,
  deletePayment: PropTypes.func.isRequired,
};

export default PaymentHistoryCard;
