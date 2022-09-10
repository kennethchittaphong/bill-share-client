import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS, ArcElement, Legend, Tooltip,
} from 'chart.js';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { deleteBillPeoples, viewBillDetails } from '../api/mergedData';
import PeopleCard from './PeopleCard';

ChartJS.register(ArcElement, Legend, Tooltip);

function DoughnutChart({ billObj, onUpdate }) {
  const router = useRouter();
  const [billPeoples, setBillPeoples] = useState([]);
  const { firebaseKey } = router.query;
  // eslint-disable-next-line no-bitwise
  const colors = new Array(billObj.splitValues.length).fill().map(() => `#${(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0')}`);
  // const arr = billObj.splitValues || [];
  const data = {
    labels: [billObj.totalAmount],
    datasets: [
      {
        data: billObj.splitValues,
        backgroundColor: colors,
      },
    ],
  };

  const deleteThisBill = () => {
    if (window.confirm(`Delete ${billObj.billName}?`)) {
      deleteBillPeoples(billObj.firebaseKey).then(() => onUpdate());
    }
  };

  useEffect(() => {
    viewBillDetails(firebaseKey).then(setBillPeoples);
  }, [firebaseKey]);

  return (
    <>
      <div>
        <h1>{billObj.billName}</h1>
        <h2>Bill Due Date: {billObj.dueDate}</h2>
        <div style={{ width: '500px' }}>
          <Doughnut data={data} />
        </div>
        <Link href={`/bill/edit/${billObj.firebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisBill} className="m-2">
          DELETE
        </Button>

        <Link href="/people/new" passHref>
          <Button variant="info">Add a person</Button>
        </Link>

        <Link href={`/bill/${billObj.firebaseKey}`} passHref>
          <Button variant="info">people</Button>
        </Link>

        <div className="text-center my-4">
          <div className="d-flex flex-wrap justify-content-center">
            {billPeoples?.peoples?.map((people) => (
              <PeopleCard key={people.firebaseKey} peopleObj={people} onUpdate={setBillPeoples} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

DoughnutChart.propTypes = {
  billObj: PropTypes.shape({
    billName: PropTypes.string,
    totalAmount: PropTypes.string,
    splitValues: PropTypes.string,
    dueDate: PropTypes.string,
    splitAmount: PropTypes.string,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default DoughnutChart;
