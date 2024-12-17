import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const SearchBox = styled.div`
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 10px;
  margin-right: 10px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 16px;
`;

const Card = styled.div`
  background-color: #f9f9f9;
  padding: 20px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 300px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const IconButton = styled.a`
  margin-right: 10px;
  color: green;
  font-size: 20px;
  text-decoration: none;
`;

function App() {
  const [searchText, setSearchText] = useState('');
  const [contacts, setContacts] = useState([]);

  const handleSearch = async () => {
    if (!searchText.trim()) {
      setContacts([]); return;
    }
    const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/search?searchText=${searchText}`);
    setContacts(response.data);
  };

  const handleKeyUp = (event) => {
    if (event.key === 'Enter') { handleSearch(); }
  };

  return (
    <Container>
      <h1>קשרי ברזל 967</h1>
      <SearchBox>
        <Input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyUp={handleKeyUp}
          placeholder="הכנס מקצוע"
        />
        <Button onClick={handleSearch}>חפש</Button>
      </SearchBox>
      {contacts.map((contact, index) => (
        <Card key={index}>
          <h2>{contact.name}</h2>
          <p><strong>מקצוע:</strong> {contact.profession}</p>
          <p><strong>טלפון:</strong> {contact.phone}</p>
          <p><strong>עיר:</strong> {contact.city}</p>
          <div>
            <IconButton href={`tel:${contact.phone}`} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faPhone} />
              </IconButton>
            <IconButton href={`https://wa.me/${contact.phone}`} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faWhatsapp} />
            </IconButton> </div>
          <p><strong>פלוגה:</strong> {contact.pluga}</p>
        </Card>
      ))}
    </Container>
  );
}

export default App;
