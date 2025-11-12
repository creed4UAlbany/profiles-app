// Inside ProfileCard.jsx
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

// Make sure to accept the new props: id and onLike
export default function ProfileCard({ id, name, likes, onLike }) {
  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>
          Likes: {likes}
        </Card.Text>
        {/* Add the button and call onLike with the id */}
        <Button variant="primary" onClick={() => onLike(id)}>
          Like
        </Button>
      </Card.Body>
    </Card>
  );
}