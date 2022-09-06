import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleBill } from '../../../api/billData';
import BillForm from '../../../components/BillForm';

export default function EditBill() {
  const [editBills, setEditBills] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleBill(firebaseKey).then(setEditBills);
  }, [firebaseKey]);
  return (
    <BillForm obj={editBills} />
  );
}
