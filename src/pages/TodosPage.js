import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import TableComponent from "../components/TableComponent";

const TodosPage = () => {
  const [todos, setTodos] = useState([]);
  const [open, setOpen] = useState(false);
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
  };

  const columns = [
    { id: "title", label: "Title" },
    { id: "completed", label: "Completed", align: "right" },
  ];

  return (
    <div style={{ margin: "20px" }}>
      <TableComponent
        columns={columns}
        data={todos.map((todo) => ({
          ...todo,
          completed: todo.completed ? "Yes" : "No",
        }))}
        onRowClick={handleRowClick}
      />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Todo Details</DialogTitle>
        {selectedTodo && (
          <DialogContent>
            <DialogContentText>Title: {selectedTodo.title}</DialogContentText>
            <DialogContentText>
              Completed: {selectedTodo.completed ? "Yes" : "No"}
            </DialogContentText>
          </DialogContent>
        )}
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TodosPage;
