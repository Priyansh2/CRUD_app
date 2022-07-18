import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { Button, Checkbox, Form } from "semantic-ui-react";
import "./addtask.css";

export default function AddTask() {
  const [t_name, setTaskName] = useState("");
  const [t_description, setDescription] = useState("");
  const [t_duedate, setDate] = useState("");
  const [t_priority, setPriority] = useState(false);
  const [t_status, setDone] = useState(false);
  const [message, setMessage] = useState("");
  const [u_id, setUserid] = useState("");
  //console.log(u_id);
  const postData = () => {
    console.log(u_id);
    axios
      .post("http://localhost:5000/createTask", {
        t_name,
        t_description,
        t_status,
        t_priority,
        t_duedate,
        u_id,
      })
      .then(function (response) {
        console.log(response);
        setTaskName("");
        setDescription("");
        setDate("");
        setPriority(false);
        setMessage("Task Added");
      })
      .catch((error) => {
        console.log(error);
        setMessage("Server not responding");
      });
  };

  useEffect(() => {
    setUserid(localStorage.getItem("user_id"));
    //console.log(u_id);
  }, [u_id]);
  return (
    <div className="form-label">
      <Form className="add-form">
        <Form.Field className="label3">
          <label className="label1">Task Name</label>
          <input
            className="label2"
            placeholder="Task Name"
            value={t_name}
            onChange={(e) => setTaskName(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label className="label1">Description</label>
          <input
            className="label2"
            placeholder="Description"
            value={t_description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label className="label1">Date</label>
          <input
            className="label2"
            placeholder="Date"
            value={t_duedate}
            onChange={(e) => setDate(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <Checkbox
            label="Priority"
            checked={t_priority}
            onChange={(e) => setPriority(!t_priority)}
          />
        </Form.Field>
        <Button onClick={postData} type="submit">
          Add Task
        </Button>
        <div className="message">
          {message === "Task Added" ? (
            <Navigate to="../../dashboard" />
          ) : (
            <p>{message}</p>
          )}
        </div>
      </Form>
    </div>
  );
}
