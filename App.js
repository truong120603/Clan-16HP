
import React, { useState, useEffect } from 'react';
import { Button, TextField, List, ListItem, Typography } from '@mui/material';
import { db } from './firebaseConfig';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';

const MemberList = () => {
  const [members, setMembers] = useState([]);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    const fetchMembers = async () => {
      const querySnapshot = await getDocs(collection(db, 'members'));
      const memberList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMembers(memberList);
    };
    fetchMembers();
  }, []);

  const addMember = async () => {
    if (name && role) {
      await addDoc(collection(db, 'members'), { name, role });
      setName('');
      setRole('');
    }
  };

  const deleteMember = async (id) => {
    await deleteDoc(doc(db, 'members', id));
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4">Manage Members</Typography>
      <TextField
        label="Member Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ marginBottom: '10px' }}
      />
      <TextField
        label="Role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        style={{ marginBottom: '10px' }}
      />
      <Button variant="contained" onClick={addMember} style={{ marginBottom: '20px' }}>Add Member</Button>
      <List>
        {members.map((member) => (
          <ListItem key={member.id} style={{ marginBottom: '10px' }}>
            <Typography>{member.name} - {member.role}</Typography>
            <Button onClick={() => deleteMember(member.id)} style={{ marginLeft: '10px' }}>Delete</Button>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default function App() {
  return <MemberList />;
}
