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
  const [billPeoples, setBillPeoples] = useState([]);
  const firebaseKey = router.query?.firebaseKey || bill.firebaseKey;
  // eslint-disable-next-line no-bitwise
  const colors = new Array(bill.splitValues.length).fill().map(() => `#${((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0')}`);
  const data = {
    labels: [bill.totalAmount],
    datasets: [
      {
        data: bill.splitValues,
        backgroundColor: colors,
      },
    ],
  };

  const deleteThisBill = () => {
    if (window.confirm(`Delete ${bill.billName}?`)) {
      deleteBillPeoples(bill.firebaseKey).then(() => router.reload(window.location.pathname));
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getBillPeoplesData = useCallback(() => {
    getBillPeoples(firebaseKey).then((res) => {
      setBillPeoples(res);
    });
  });

  useEffect(() => {
    getBillPeoplesData(useCallback);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firebaseKey]);

  return (
    <>
      <div>
        <h1>{bill.billName}</h1>
        <h2>Bill Due Date: {bill.dueDate}</h2>
        <div style={{ width: '500px' }}>
          <Doughnut data={data} />
        </div>

        <Link href={`/bill/edit/${bill.firebaseKey}`} passHref>
          <Button variant="">EDIT</Button>
        </Link>
        <Button variant="" onClick={deleteThisBill} className="m-2">
          DELETE
        </Button>

        <Link href="/people/new" passHref>
          <Button variant="">Add a person</Button>
        </Link>

        <div className="text-center my-4">
          <div className="d-flex flex-wrap justify-content-center">
            {billPeoples?.map((people) => (
              <PeopleCard key={people.firebaseKey} peopleObj={people} onUpdate={getBillPeoplesData} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

BillChart.propTypes = {
  bill: PropTypes.shape({
    billName: PropTypes.string,
    totalAmount: PropTypes.string,
    splitValues: PropTypes.arrayOf(PropTypes.number),
    dueDate: PropTypes.string,
    splitAmount: PropTypes.string,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
};

export default BillChart;
