import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import PaymentHistoryCard from '../../components/PaymentHistory';
import { deleteThisPayment, getAllPayments } from '../../api/paymentData';

function Payments() {
  const [payments, setPayments] = useState([]);
  const router = useRouter();

  const getTheContent = () => {
    getAllPayments().then(setPayments);
  };

  const deletePayment = (id) => {
    if (window.confirm('Delete this payment?')) {
      deleteThisPayment(id).then(() => getTheContent());
    }
  };

  useEffect(() => {
    getTheContent();
  }, [router]);

  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <Button variant="primary" onClick={() => router.push('/payment/new')}> Create new payment</Button>
      {
        payments.map((payment) => <PaymentHistoryCard paymentObj={payment} deletePayment={deletePayment} key={payment.id}>{payment.label}</PaymentHistoryCard>)
      }
    </div>
  );
}

export default Payments;
