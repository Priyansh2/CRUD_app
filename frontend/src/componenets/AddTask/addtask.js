import React, {useState} from 'react';
import axios from 'axios';
import {Navigate} from 'react-router-dom';
import {Button, Checkbox,Form } from 'semantic-ui-react';
import './addtask.css'


export default function AddTask() {
     const [taskName, setTaskName] = useState('');
     const [description,setDescription] = useState('');
     const [date,setDate] = useState('');
     const [priority,setPriority] = useState(false);
     const [message,setMessage] = useState('');
     const postData=()=>{
        axios.post('https://62cfa587486b6ce826593458.mockapi.io/api/v1/tempdata',{
            taskName,
            description,
            date,
            priority    
        })
        .then(function(response){
            console.log(response);
            setTaskName("");
            setDescription("");
            setDate("");
            setPriority(false);
            setMessage("Task Added");
        })
        .catch((error)=>{
            console.log(error);
            setMessage("Server not responding");
        });

     }
     return(
        <div className="form-label">
            <Form className="add-form">
                <Form.Field className='label3'>
                    <label className='label1'>Task Name</label>
                    <input className='label2' placeholder='Task Name' value={taskName} onChange={(e)=>setTaskName(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label className='label1'>Description</label>
                    <input className='label2' placeholder='Description' value={description} onChange={(e)=>setDescription(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label className='label1'>Date</label>
                    <input className='label2' placeholder='Date' value={date} onChange={(e)=>setDate(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <Checkbox label='Priority' checked={priority} onChange={(e)=>setPriority(!priority)}/>
                </Form.Field>
                <Button onClick={postData} type='submit'>Add Task</Button>
                <div className="message">{message=="Task Added" ? <Navigate to='../../dashboard'/> : <p>{message}</p>}</div>
            </Form>
        </div>

     )
}