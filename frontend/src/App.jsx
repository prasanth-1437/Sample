import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios'
function App() {
  const [members, setMembers] = useState([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  useEffect(() => {
    console.log('VITE_API_URL:',);
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    console.log("kk")
    try {
      
      const response = await fetch("http://localhost:5000/api/members");
      const data = await response.json();
      setMembers(data);
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("KKK")
    try {
     
      const res=await axios.post("http://localhost:5000/api/members",{name,age : Number(age)})

      setName('');
      setAge('');
    fetchMembers();
    } catch (err) {
      console.error('Submit error:', err);
    }
  };

  return (
    <div className="App">
      <h1>Add Members</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
        <button type="submit">Add Member</button>
      </form>
      <h2>Members List</h2>
      <ul>
        {members.map(member => (
          <li key={member._id}>{member.name} - {member.age}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;