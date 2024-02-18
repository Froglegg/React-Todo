import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import TableComponent from "../components/TableComponent";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await axios.get("http://localhost:8080/users", {
      withCredentials: true,
    });
    setUsers(response.data);
  };

  const addUser = async () => {
    await axios.post(
      "http://localhost:8080/users",
      {
        name,
        age: parseInt(age, 10),
      },
      {
        withCredentials: true,
      }
    );
    fetchUsers();
    setName("");
    setAge("");
  };

  const handleRowClick = (user) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const columns = [
    { id: "name", label: "Name" },
    { id: "age", label: "Age", align: "right" },
  ];

  return (
    <div style={{ margin: "20px" }}>
      <TextField
        label="Name"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        label="Age"
        type="number"
        variant="outlined"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        style={{ marginLeft: "10px" }}
      />
      <Button
        variant="contained"
        onClick={addUser}
        style={{ marginLeft: "10px" }}
      >
        Add User
      </Button>
      <TableComponent
        columns={columns}
        data={users}
        onRowClick={handleRowClick}
      />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>User Details</DialogTitle>
        {selectedUser && (
          <DialogContent>
            <DialogContentText>Name: {selectedUser.name}</DialogContentText>
            <DialogContentText>Age: {selectedUser.age}</DialogContentText>
          </DialogContent>
        )}
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UsersPage;
