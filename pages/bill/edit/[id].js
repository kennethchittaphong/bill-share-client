import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleBill } from '../../../api/billData';
import BillForm from '../../../components/BillForm';

export default function EditBill() {
  const [editBills, setEditBills] = useState({});
  const router = useRouter();
  const { id } = router.query;
  // eslint-disable-next-line no-console
  console.log('edit bill ===', id);

  useEffect(() => {
    getSingleBill(id).then((res) => {
      // eslint-disable-next-line no-console
      console.log('get single bill ===', res);
      setEditBills(res);
    });
  }, [id]);
  return (
    <BillForm obj={editBills} />
  );
}
