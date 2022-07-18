import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { Button, Checkbox, Form } from "semantic-ui-react";
import "./edittask.css";

export default function EditTask() {
  const [t_name, setTaskName] = useState("");
  const [t_description, setDescription] = useState("");
  const [t_duedate, setDate] = useState("");
  const [t_priority, setPriority] = useState(false);
  const [t_status, setDone] = useState(false);
  const [message, setMessage] = useState("");
  const [id, setID] = useState(null);
  const [u_id, setUserid] = useState("");
  const postupdatedData = () => {
    axios
      .put(`http://localhost:5000/editTask?q1=${u_id}&q2=${id}`, {
        t_name,
        t_status,
        t_description,
        t_priority,
        t_duedate,
      })
      .then(function (response) {
        console.log(response);
        setMessage("Task Updated");
      })
      .catch((error) => {
        console.log(error);
        setMessage("Server not responding");
      });
  };

  useEffect(() => {
    setID(localStorage.getItem("ID"));
    setTaskName(localStorage.getItem("Task Name"));
    setDescription(localStorage.getItem("Description"));
    setDate(localStorage.getItem("Date"));
    setPriority(localStorage.getItem("Priority"));
    setDone(localStorage.getItem("Done"));
    setUserid(localStorage.getItem("user_id"));
    //console.log(id + " " + u_id + " " + t_name + " " + t_description);
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
        <Form.Field>
          <Checkbox
            label="Done"
            checked={t_status}
            onChange={(e) => setDone(!t_status)}
          />
        </Form.Field>
        <Button onClick={postupdatedData} type="submit">
          Update
        </Button>
        <div className="message">
          {message === "Task Updated" ? (
            <Navigate to="../../dashboard" />
          ) : (
            <p>{message}</p>
          )}
        </div>
      </Form>
    </div>
  );
}
