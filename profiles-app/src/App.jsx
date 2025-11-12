import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProfileCard from './components/ProfileCard.jsx';
import { profiles } from './data/profiles.js';

export default function App() {
  // Store profiles in state
  const [people, setPeople] = useState(profiles);

  // Handle the like click
  const handleLike = (id) => {
    // Increment the profile's likes immutably
    setPeople(ps => ps.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p));
  };

  return (
    <Container className="py-4">
      <h1 className="mb-4 text-center">Profiles</h1>
      <Row xs={1} md={2} lg={3}>
        {/* Map over the 'people' state variable */}
        {people.map(p => (
          <Col key={p.id}>
            {/* Pass the id and onLike handler down to the card */}
            <ProfileCard
              id={p.id}
              name={p.name}
              likes={p.likes}
              onLike={handleLike}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}