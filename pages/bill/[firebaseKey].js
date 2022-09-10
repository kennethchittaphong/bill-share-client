/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PeopleCard from '../../components/PeopleCard';
import { viewBillDetails } from '../../api/mergedData';

export default function ViewBill() {
  const router = useRouter();
  const [billPeoples, setBillPeoples] = useState([]);
  const { firebaseKey } = router.query;

  // console.log('router.query ===', firebaseKey, router.query)

  useEffect(() => {
    viewBillDetails(firebaseKey).then(setBillPeoples);
  }, [firebaseKey]);

  return (
    <>
      <div className="text-center my-4 teamCardsDiv">
        <div className="d-flex flex-wrap cardContainer">
          {billPeoples?.peoples?.map((people) => (
            <PeopleCard key={people.firebaseKey} peopleObj={people} onUpdate={setBillPeoples} />
          ))}
          {/* <PeopleCard key={filteredPeoples.firebaseKey} billName={billName} peopleObj={filteredPeoples} onUpdate={getAllThePeoples} />  */}
        </div>
      </div>
    </>
  );
}
