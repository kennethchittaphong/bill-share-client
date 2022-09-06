import React, { useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS, ArcElement, Legend, Tooltip,
} from 'chart.js';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import { deleteBill } from '../api/billData';
import { getPeoples } from '../api/peopleData';
import { useAuth } from '../utils/context/authContext';
import PeopleCard from './PeopleCard';

ChartJS.register(ArcElement, Legend, Tooltip);

function DoughnutChart({ billObj, onUpdate }) {
  const [peoples, setPeoples] = useState([]);
  const { user } = useAuth();
  const getAllThePeoples = () => {
    getPeoples(user.uid).then(setPeoples);
  };
  // eslint-disable-next-line no-bitwise
  const colors = new Array(billObj.totalAmount.length).fill().map(() => `#${(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0')}`);
  const data = {
    labels: [billObj.totalAmount],
    datasets: [
      {
        data: billObj.totalAmount,
        // backgroundColor: [
        //   // eslint-disable-next-line no-bitwise
        //   `#${(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0')}`,
        // ],
        backgroundColor: colors,
      },
    ],
  };

  const deleteThisBill = () => {
    if (window.confirm(`Delete ${billObj.billName}?`)) {
      deleteBill(billObj.firebaseKey).then(() => onUpdate());
    }
  };
  return (
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

      {peoples.map((people) => (
        <PeopleCard key={people.firebaseKey} peopleObj={people} onUpdate={getAllThePeoples} />
      ))}
    </div>

  );
}

DoughnutChart.propTypes = {
  billObj: PropTypes.shape({
    billName: PropTypes.string,
    totalAmount: PropTypes.string,
    dueDate: PropTypes.string,
    splitAmount: PropTypes.string,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default DoughnutChart;
