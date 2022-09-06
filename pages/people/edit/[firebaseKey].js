import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSinglePeoples } from '../../../api/peopleData';
import PeopleForm from '../../../components/PeopleForm';

export default function EditPeople() {
  const [editPeoples, setEditPeoples] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSinglePeoples(firebaseKey).then(setEditPeoples);
  }, [firebaseKey]);
  return (
    <PeopleForm obj={editPeoples} />
  );
}
