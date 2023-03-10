import React from 'react';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { deleteSinglePeoples } from '../api/peopleData';

function PeopleCard({ peopleObj, onUpdate }) {
  // eslint-disable-next-line no-console
  console.log('people card ===', peopleObj);
  const deleteThisPerson = () => {
    if (window.confirm(`Delete ${peopleObj.name}?`)) {
      deleteSinglePeoples(peopleObj.id).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '25rem', margin: '15px' }}>
      <Card.Body>
        <Card.Title>{peopleObj.name}</Card.Title>
        <Card.Text>Amount owed: ${peopleObj.amount}</Card.Text>
        <Card.Text>Due date: {peopleObj.due_date}</Card.Text>
        <Card.Text>{peopleObj.status ? 'Paid' : ''}</Card.Text>

        {/* <Link href={`peoples/edit/${peopleObj.id}`} passHref> */}
        <Link href={{ pathname: `people/edit/${peopleObj.id}`, query: { id: peopleObj.id } }} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisPerson} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

PeopleCard.propTypes = {
  peopleObj: PropTypes.shape({
    name: PropTypes.string,
    amount: PropTypes.string,
    due_date: PropTypes.string,
    status: PropTypes.string,
    id: PropTypes.string,
    uid: PropTypes.string,
    bill_id: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default PeopleCard;
