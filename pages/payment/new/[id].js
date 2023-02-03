import React from 'react';
import { useRouter } from 'next/router';
import PaymentHistoryForm from '../../../components/PaymentHistoryForm';

export default function NewPaymentEntry() {
  const router = useRouter();
  const { id } = router.query;

  return <PaymentHistoryForm id={id} />;
}
