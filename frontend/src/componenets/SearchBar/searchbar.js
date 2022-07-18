import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Button,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
  Input,
  Card,
  CardContent,
} from "semantic-ui-react";
import "./searchbar.css";
export default function SearchBar() {
  const [APIData, setAPIData] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [search, setSearch] = useState("");
  const [u_id, setUserid] = useState("");
  const setData = (data) => {
    console.log(data);
    let { _id, task_name, task_description, task_duedate, task_priority } =
      data;
    localStorage.setItem("ID", _id);
    localStorage.setItem("Task Name", task_name);
    localStorage.setItem("Description", task_description);
    localStorage.setItem("Date", task_duedate);
    localStorage.setItem("Priority", task_priority);
  };
  const reload = () => {
    axios
      .get(`http://localhost:5000/get_all_tasks?q=${u_id}`)
      .then((reload) => {
        setAPIData(reload.data);
      });
  };

  const searchItems = (searchValue) => {
    setSearch(searchValue);
    if (search !== "") {
      const filteredData = APIData.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(search.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(APIData);
    }
  };
  const onDelete = (id) => {
    axios
      .delete(`http://localhost:5000/deleteTask?q1=${u_id}&q2=${id}`)
      .then(() => {
        reload();
      });
  };
  useEffect(() => {
    setUserid(localStorage.getItem("user_id"));
    console.log(u_id);
    if (u_id !== "")
      axios
        .get(`http://localhost:5000/get_all_tasks?q=${u_id}`)
        .then((response) => {
          setAPIData(response.data.tasks);
        });
  }, [u_id]);
  return (
    <div style={{ padding: 20 }}>
      <Input
        icon="search"
        placeholder="Search..."
        onChange={(e) => searchItems(e.target.value)}
      />
      <Card.Group itemsPerRow={1} style={{ marginTop: 20 }}>
        {search.length > 1
          ? filteredResults.map((item) => {
              return (
                <Card>
                  <Card.Content>
                    <Card.Header>Task Name:{item.task_name}</Card.Header>
                    <Card.Description>
                      Description:{item.task_description}
                    </Card.Description>
                    <Card.Description>
                      Date:{item.task_duedate}
                    </Card.Description>
                    <Card.Description>
                      Priority:{item.task_priority}
                    </Card.Description>
                    <Link to="../../edittask">
                      <Button onClick={() => setData(item)}>Edit</Button>
                    </Link>
                    <Button onClick={() => onDelete(item._id)}>Delete</Button>
                  </Card.Content>
                </Card>
              );
            })
          : APIData.map((item) => {
              return (
                <Card className="card1">
                  <Card.Content>
                    <Card.Header>Task Name:{item.task_name}</Card.Header>
                    <Card.Description className="card2">
                      Description:{item.task_description}
                    </Card.Description>
                    <Card.Description className="card2">
                      Date:{item.task_duedate}
                    </Card.Description>
                    <Card.Description className="card2">
                      Priority:{item.task_priority}
                    </Card.Description>
                    <Link to="../../edittask">
                      <Button onClick={() => setData(item)}>Edit</Button>
                    </Link>
                    <Button onClick={() => onDelete(item._id)}>Delete</Button>
                  </Card.Content>
                </Card>
              );
            })}
      </Card.Group>
    </div>
  );
}
