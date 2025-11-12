import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import ProfileCard from './components/ProfileCard.jsx';
import { profiles } from './data/profiles.js';

export default function App() {
  // Store profiles in state
  const [people, setPeople] = useState(profiles);
  
  // State for the controlled form input
  const [name, setName] = useState('');
  // State for validation error message
  const [error, setError] = useState(null);

  // Handle the like click
  const handleLike = (id) => {
    // Increment the profile's likes immutably
    setPeople(ps => ps.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload

    const trimmed = name.trim();
    // Check for uniqueness (case-insensitive)
    const exists = people.some(p => p.name.toLowerCase() === trimmed.toLowerCase());

    // --- Validation Rules ---
    if (trimmed === '') {
      setError('Name is required');
      return;
    }
    if (exists) {
      setError('Name must be unique');
      return;
    }

    // --- All Valid ---
    setError(null); // Clear any previous error
    const newProfile = {
      id: crypto.randomUUID(), // Use crypto for a unique ID
      name: trimmed,
      likes: 0
    };
    setPeople([...people, newProfile]); // Add new profile to state (immutably)
    setName(''); // Reset the form input
  };

  // Handle input change
  const handleNameChange = (e) => {
    setName(e.target.value);
    // Clear error as soon as user starts typing
    if (error) {
      setError(null);
    }
  };

  return (
    <Container className="py-4">
      <h1 className="mb-4 text-center">Profiles</h1>

      {/* --- Add New Profile Form --- */}
      <Form noValidate onSubmit={handleSubmit} className="mb-4">
        <Row className="justify-content-center">
          <Col md={6}>
            <Form.Label htmlFor="newNameInput" className="visually-hidden">
              New Profile Name
            </Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                type="text"
                id="newNameInput"
                placeholder="Enter new profile name"
                value={name}
                onChange={handleNameChange}
                isInvalid={!!error} // Show red border if error exists
              />
              <Button variant="primary" type="submit">Add</Button>
              <Form.Control.Feedback type="invalid">
                {error}
              </Form.Control.Feedback>
            </InputGroup>
          </Col>
        </Row>
      </Form>
      {/* --- End Form --- */}

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