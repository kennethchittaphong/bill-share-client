import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS, ArcElement, Legend, Tooltip,
} from 'chart.js';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { deleteBillPeoples } from '../api/mergedData';
import PeopleCard from './PeopleCard';
import { getBillPeoples } from '../api/billData';

ChartJS.register(ArcElement, Legend, Tooltip);

export function BillChart({ bill }) {
  const router = useRouter();
  const [billPeoples, setBillPeoples] = useState(null);
  // const firebaseKey = router.query?.firebaseKey || bill.user.id;
  // eslint-disable-next-line no-bitwise
  const colors = new Array(bill && bill.split_amount.length).fill().map(() => `#${((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0')}`);
  const data = {
    labels: [bill.total_amount],
    datasets: [
      {
        data: bill.split_amount,
        backgroundColor: colors,
      },
    ],
  };

  const deleteThisBill = () => {
    if (window.confirm(`Delete ${bill.name}?`)) {
      deleteBillPeoples(bill.id).then(() => router.reload(window.location.pathname));
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getBillPeoplesData = useCallback(() => {
    getBillPeoples(bill.id).then((res) => {
      setBillPeoples(res);
    });
  });

  useEffect(() => {
    getBillPeoplesData(useCallback);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bill]);

  return (
    <>
      <div>
        <h1>{bill.name}</h1>
        <h2>Bill Due Date: {bill.due_date}</h2>
        <div style={{ width: '500px' }}>
          <Doughnut data={data} />
        </div>

        <Link href={`/bill/edit/${bill.id}`} passHref>
          <Button variant="">EDIT</Button>
        </Link>
        <Button variant="" onClick={deleteThisBill} className="m-2">
          DELETE
        </Button>

        <Link href="/payment" passHref>
          <Button variant="">Payment History</Button>
        </Link>

        <Link href="/people/new" passHref>
          <Button variant="">Add a person</Button>
        </Link>

        <div className="text-center my-4">
          <div className="d-flex flex-wrap justify-content-center">
            {billPeoples && billPeoples.length && billPeoples?.map((billPeople) => (
              <PeopleCard key={billPeople.id} peopleObj={billPeople} onUpdate={getBillPeoplesData} />
            ))}
            {/* {billPeoples
              && <PeopleCard key={billPeoples.bill} peopleObj={billPeoples} onUpdate={getBillPeoplesData} />} */}
          </div>
        </div>
      </div>
    </>
  );
}

BillChart.propTypes = {
  bill: PropTypes.shape({
    name: PropTypes.string,
    total_amount: PropTypes.string,
    splitValues: PropTypes.arrayOf(PropTypes.number),
    due_date: PropTypes.string,
    split_amount: PropTypes.string,
    billId: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
};

export default BillChart;
