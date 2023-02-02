import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSinglePeoples } from '../../../api/peopleData';
import PeopleForm from '../../../components/PeopleForm';

export default function EditPeople() {
  const router = useRouter();
  const [editPeoples, setEditPeoples] = useState(router.query.id);
  const { id } = router.query;
  // eslint-disable-next-line no-console
  console.log('edit people ===', id);

  useEffect(() => {
    getSinglePeoples(id).then(setEditPeoples);
  }, [id]);
  return (
    <PeopleForm obj={editPeoples} />
  );
}
