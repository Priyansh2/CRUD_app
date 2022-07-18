import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "semantic-ui-react";
export default function Dashboard() {
  const [u_id, setUserid] = useState("");
  const [APIData, setAPIData] = useState([]);
  const current = new Date();
  const todaydate = `${current.getDate()}-${
    current.getMonth() + 1
  }-${current.getFullYear()}`;
  const setData = (data) => {
    console.log(data);
    let {
      _id,
      task_name,
      task_description,
      task_duedate,
      task_priority,
      task_status,
    } = data;
    localStorage.setItem("ID", _id);
    localStorage.setItem("Task Name", task_name);
    localStorage.setItem("Description", task_description);
    localStorage.setItem("Date", task_duedate);
    localStorage.setItem("Priority", task_priority);
    localStorage.setItem("Done", task_status);
  };
  const reload = () => {
    console.log(u_id);
    axios
      .get(`http://localhost:5000/get_all_tasks?q=${u_id}`)
      .then((reload) => {
        setAPIData(reload.data.tasks);
      });
  };
  const onDelete = (id) => {
    axios
      .delete(`http://localhost:5000/deleteTask?q1=${u_id}&q2=${id}`)
      .then(() => {
        reload();
      });
  };
  const sortIt = () => {
    axios.get(`http://localhost:5000/sortTask?q=${u_id}`).then((response) => {
      console.log(response.data.tasks);
      setAPIData(response.data.tasks);
    });
  };
  const revertIt = () => {
    axios
      .get(`http://localhost:5000/get_all_tasks?q=${u_id}`)
      .then((response) => {
        console.log(response.data.tasks);
        setAPIData(response.data.tasks);
      });
  };
  useEffect(() => {
    setUserid(localStorage.getItem("user_id"));
    console.log(u_id);
    if (u_id !== "") {
      axios
        .get(`http://localhost:5000/get_all_tasks?q=${u_id}`)
        .then((response) => {
          console.log(response.data.tasks);
          setAPIData(response.data.tasks);
        });
    }
  }, [u_id]);

  return (
    <>
      <div className="header">
        <nav class="bg-dark navbar-dark navbar">
          <div className="row col-12 d-flex justify-content-center text-white">
            <h1>Dashboard</h1>
          </div>
          <div className="add-buttons">
            <Link to="../../addtask">
              <Button>Add Task</Button>
            </Link>
            <Link to="../../searchbar">
              <Button>Search</Button>
            </Link>
            <Link to="../../login">
              <Button>Log Out</Button>
            </Link>
            <Link to="../../dashboard">
              <Button onClick={() => sortIt()}> Sort Tasks</Button>
            </Link>
            <Link to="../../dashboard">
              <Button onClick={() => revertIt()}> Revert</Button>
            </Link>
          </div>
        </nav>
      </div>
      <div class="table">
        <Table singleLine>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Task Name</TableHeaderCell>
              <TableHeaderCell>Description</TableHeaderCell>
              <TableHeaderCell>Date</TableHeaderCell>
              <TableHeaderCell>Priority</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Done</TableHeaderCell>
              <TableHeaderCell>Edit</TableHeaderCell>
              <TableHeaderCell>Delete</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {APIData.map((data) => {
              return (
                <TableRow>
                  <TableCell>{data.task_name}</TableCell>
                  <TableCell>{data.task_description}</TableCell>
                  <TableCell>{data.task_duedate}</TableCell>
                  <TableCell>{data.task_priority}</TableCell>
                  <TableCell>
                    {data.task_duedate > todaydate
                      ? "Time left"
                      : "Due date passed"}
                  </TableCell>
                  <TableCell>{data.task_status}</TableCell>
                  <Link to="../../edittask">
                    <TableCell>
                      <Button onClick={() => setData(data)}>Edit</Button>
                    </TableCell>
                  </Link>
                  <TableCell>
                    <Button onClick={() => onDelete(data._id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
