import React from 'react';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { deleteSinglePeoples } from '../api/peopleData';

function PeopleCard({ peopleObj, onUpdate }) {
  const deleteThisPerson = () => {
    if (window.confirm(`Delete ${peopleObj.name}?`)) {
      deleteSinglePeoples(peopleObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '25rem', margin: '15px' }}>
      <Card.Body>
        <Card.Title>{peopleObj.name}</Card.Title>
        <Card.Text>Amount owed: ${peopleObj.amount}</Card.Text>
        <Card.Text>Due date: {peopleObj.dueDate}</Card.Text>

        <Link href={`/people/edit/${peopleObj.firebaseKey}`} passHref>
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
    dueDate: PropTypes.string,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
    billId: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default PeopleCard;
