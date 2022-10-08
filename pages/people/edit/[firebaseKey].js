import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSinglePeoples } from '../../../api/peopleData';
import PeopleForm from '../../../components/PeopleForm';

export default function EditPeople() {
  const router = useRouter();
  const [editPeoples, setEditPeoples] = useState(JSON.parse(router.query.obj));
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSinglePeoples(firebaseKey).then(setEditPeoples);
  }, [firebaseKey]);
  return (
    <PeopleForm obj={editPeoples} />
  );
}
