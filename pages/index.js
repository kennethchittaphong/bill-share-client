import React, { useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import Chart from '../components/DoughnutChart';
import { getBills } from '../api/billData';

function Home() {
  const [bills, setBills] = useState([]);
  const [billData, setBillData] = useState(null);
  const [showBill, setShowBill] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    setShowBill();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const callGetAllBills = () => {
    getBills(user.uid).then(setBills);
    setShowBill(false);
    setBillData(null);
  };

  useEffect(() => {
    callGetAllBills();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Dropdown>
        <Dropdown.Toggle id="dropdown-custom-components" variant="">
          View Bills
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {bills.map((bill, idx) => (
            <Dropdown.Item
              eventKey={idx}
              onClick={() => {
                setBillData(bill);
                setShowBill(true);
              }}
            >
              {bill.billName}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>

      <div className="doughnutChart">
        {showBill && <Chart key={billData.firebaseKey} billObj={billData} onUpdate={callGetAllBills} />}
      </div>

    </>
  );
}

export default Home;
