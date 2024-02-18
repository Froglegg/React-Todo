import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
} from "@mui/material";
import TableComponent from "../components/TableComponent";

const TodosPage = () => {
  const [todos, setTodos] = useState([]);
  const [open, setOpen] = useState(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [selectedTodo, setSelectedTodo] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const response = await axios.get("http://localhost:8080/todos");
    setTodos(response.data);
  };

  const handleRowClick = (todo) => {
    setSelectedTodo(todo);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCreateDialogOpen(false);
  };

  const handleCreateTodo = async () => {
    if (newTodoTitle) {
      await axios.post(
        "http://localhost:8080/todos",
        { title: newTodoTitle },
        { withCredentials: true } // Ensure withCredentials is set for cross-origin requests
      );
      setNewTodoTitle("");
      fetchTodos();
      handleClose();
    }
  };

  const handleMarkTodoComplete = async (todoId) => {
    await axios.post(
      `http://localhost:8080/todos/${todoId}/complete`,
      {},
      {
        withCredentials: true, // Ensure withCredentials is set for cross-origin requests
      }
    );
    fetchTodos();
    handleClose();
  };

  const columns = [
    { id: "title", label: "Title" },
    { id: "status", label: "Status", align: "right" },
  ];

  return (
    <div style={{ margin: "20px" }}>
      <Button variant="contained" onClick={() => setCreateDialogOpen(true)}>
        Create Todo
      </Button>
      <TableComponent
        columns={columns}
        data={todos.map((todo) => ({
          ...todo,
          status: todo.status,
        }))}
        onRowClick={handleRowClick}
      />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Todo Details</DialogTitle>
        {selectedTodo && (
          <DialogContent>
            <DialogContentText>Title: {selectedTodo.title}</DialogContentText>
            <DialogContentText>Status: {selectedTodo.status}</DialogContentText>
          </DialogContent>
        )}
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={createDialogOpen} onClose={handleClose}>
        <DialogTitle>Create a new Todo</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Todo Title"
            type="text"
            fullWidth
            variant="standard"
            value={newTodoTitle}
            onChange={(e) => setNewTodoTitle(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleCreateTodo}>Create</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Todo Details</DialogTitle>
        {selectedTodo && (
          <DialogContent>
            <DialogContentText>Title: {selectedTodo.title}</DialogContentText>
            <DialogContentText>Status: {selectedTodo.status}</DialogContentText>
            <DialogActions>
              <Button onClick={() => handleMarkTodoComplete(selectedTodo.id)}>
                Mark as Complete
              </Button>
              <Button onClick={handleClose}>Close</Button>
            </DialogActions>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default TodosPage;
