import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import PaymentHistoryCard from '../../components/PaymentHistory';
import { getBillPayment } from '../../api/paymentData';

function Payments() {
  const router = useRouter();
  const { id } = router.query;
  const [billPayments, setBillPayments] = useState();

  const getBillPaymentData = useCallback(() => {
    getBillPayment(id).then((res) => {
      if (res && res.length) {
        setBillPayments(res);
        console.log('get bill payment history ===', res);
      }
    });
  });

  useEffect(() => {
    getBillPaymentData(useCallback);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <Button variant="primary" onClick={() => router.push(`/payment/new/${id}`)}> Create new payment</Button>
      {billPayments && billPayments?.map((billPayment) => (
        <PaymentHistoryCard key={billPayment.id} paymentObj={billPayment} onUpdate={getBillPaymentData} />
      ))}
    </div>
  );
}

Payments.propTypes = {
  paymentObj: PropTypes.shape({
    billId: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
};

export default Payments;
