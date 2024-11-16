import { useEffect, useState } from 'react';
import Person from './Person';

const PersonController = () => {
  const [person, setPerson] = useState(null);

  const getPerson = async () => {
    try {
      const response = await fetch('https://www.randomuser.me/api?results=1');
      const data = await response.json();
      const user = data.results[0];
      
     
      setPerson({
        first_name: user.name.first,
        last_name: user.name.last,
        email: user.email
      });
    } catch (error) {
      console.error('Error fetching person:', error);
    }
  };

  useEffect(() => {
    getPerson();
  }, []); 

  return <Person person={person} />;
};

export default PersonController