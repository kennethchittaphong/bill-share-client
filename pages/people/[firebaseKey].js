import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getPeoples } from '../../api/peopleData';

export default function ViewPlayer() {
  const [peopleDetails, setPeopleDetails] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    getPeoples(firebaseKey).then(setPeopleDetails);
  }, [firebaseKey]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column" />
      <div className="text-white ms-5 details">
        <h5>
          {peopleDetails.name}
        </h5>
      </div>
    </div>
  );
}
