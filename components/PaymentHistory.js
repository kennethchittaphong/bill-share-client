import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';

const PaymentHistoryCard = ({ paymentObj }) => (
  <div className="payment-render">
    <Row>
      <Col xs={6} md={3}>
        {paymentObj.label}
      </Col>
      <Col xs={6} md={3}>
        {paymentObj.date_paid}
      </Col>
      <Col xs={6} md={3}>
        {paymentObj.amount_paid}
      </Col>
      <Col xs={6} md={3}>
        {paymentObj.payment_type}
      </Col>
    </Row>
  </div>
);

PaymentHistoryCard.propTypes = {
  paymentObj: PropTypes.shape({
    id: PropTypes.number,
    label: PropTypes.string,
    payment_type: PropTypes.string,
    amount_paid: PropTypes.string,
    date_paid: PropTypes.string,
    bill_id: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
};

export default PaymentHistoryCard;
