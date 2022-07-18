import React, {useEffect,useState} from 'react';
import axios from 'axios';
import { Link} from 'react-router-dom';
import { Button, Tab, Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from 'semantic-ui-react';
export default function Dashboard() {
  const [APIData, setAPIData] = useState([]);
  const current = new Date();
  const todaydate = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
  const setData =(data)=>{
    console.log(data);
        let { id, taskName, description, date, priority,done } = data;
        localStorage.setItem('ID', id);
        localStorage.setItem('Task Name', taskName);
        localStorage.setItem('Description', description);
        localStorage.setItem('Date', date);
        localStorage.setItem('Priority',priority);
        localStorage.setItem('Done',done);
  }
  const reload=()=>{
    axios.get(`https://62cfa587486b6ce826593458.mockapi.io/api/v1/tempdata`)
    .then((reload)=>{
      setAPIData(reload.data);
    })
  }
  const onDelete =(id)=> {
    axios.delete(`https://62cfa587486b6ce826593458.mockapi.io/api/v1/tempdata/${id}`)
  .then(()=>{
    reload();
  })
  }
  useEffect(() => {
    axios.get(`https://62cfa587486b6ce826593458.mockapi.io/api/v1/tempdata`)
        .then((response) => {
            setAPIData(response.data);
        })
}, [])
  return(

    <>
    <div className="header">
      <nav class="bg-dark navbar-dark navbar">
        <div className="row col-12 d-flex justify-content-center text-white">
          <h1>Dashboard</h1>
        </div>
        <div className='add-buttons'>
          <Link to='../../addtask'>
            <Button>Add Task</Button>
          </Link>
          <Link to='../../searchbar'>
            <Button>Search</Button>
          </Link>
          <Link to='../../login'>
            <Button>Log Out</Button>
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
          {APIData.map((data)=>{
            return(
              <TableRow>
                <TableCell>{data.taskName}</TableCell>
                <TableCell>{data.description}</TableCell>
                <TableCell>{data.date}</TableCell>
                <TableCell>{data.priority ? 'Important' : 'Not Important'}</TableCell>
                <TableCell>{data.date > todaydate ? 'Time left' : 'Due date passed'}</TableCell>
                <TableCell>{data.done ? 'Completed' : 'Pending'}</TableCell>
                <Link to='../../edittask'>
                  <TableCell>
                    <Button onClick={()=>setData(data)}>Edit</Button>
                  </TableCell>
                </Link>
                  <TableCell>
                    <Button onClick={()=>onDelete(data.id)}>Delete</Button>
                  </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
      
    
    
    </>
  );
}
