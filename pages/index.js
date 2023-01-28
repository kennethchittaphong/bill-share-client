import React, { useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import Chart from '../components/DoughnutChart';
import { getBills } from '../api/billData';

function Home() {
  const [bills, setBills] = useState([]);
  const [selectedBill, setSelectedBill] = useState();
  const { user } = useAuth();

  const fetchBills = async () => {
    const newBills = await getBills(user.uid);
    setBills(newBills);
    if (bills && !bills.length && newBills && newBills.length) {
      setSelectedBill(newBills[0]);
    }
  };

  useEffect(() => {
    fetchBills();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Dropdown>
        <Dropdown.Toggle id="dropdown-custom-components" variant="">
          View Bills
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {bills && bills.map((bill, idx) => (
            <Dropdown.Item
              eventKey={idx}
              onClick={() => {
                setSelectedBill(bill);
              }}
            >
              {bill.name}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      {selectedBill ? <Chart key={selectedBill} bill={selectedBill} onUpdate={fetchBills} /> : null}
    </>
  );
}

export default Home;
