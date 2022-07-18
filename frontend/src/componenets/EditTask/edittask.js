import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Navigate} from 'react-router-dom';
import {Button, Checkbox,Form } from 'semantic-ui-react';
import './edittask.css'





export default function EditTask() {

    const [taskName, setTaskName] = useState('');
    const [description,setDescription] = useState('');
    const [date,setDate] = useState('');
    const [priority,setPriority] = useState(false);
    const [done,setDone] = useState(false);
    const [message,setMessage] = useState('');
    const [id, setID] = useState(null);

    const postupdatedData=()=>{
        axios.put(`https://62cfa587486b6ce826593458.mockapi.io/api/v1/tempdata/${id}`,{
            taskName,
            description,
            date,
            priority,
            done    
        })
        .then(function(response){
            console.log(response);
            setMessage("Task Updated");
        })
        .catch((error)=>{
            console.log(error);
            setMessage("Server not responding");
        });

     }

    useEffect(() => {
            setID(localStorage.getItem('ID'))
            setTaskName(localStorage.getItem('Task Name'));
            setDescription(localStorage.getItem('Description'));
            setDate(localStorage.getItem('Date'));
            setPriority(localStorage.getItem('Priority'));
            setDone(localStorage.getItem('Done'))

    }, []);



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
                <Form.Field>
                <Checkbox label='Done' checked={done} onChange={(e)=>setDone(!done)}/>   
                </Form.Field>
                <Button onClick={postupdatedData} type='submit'>Update</Button>
                <div className="message">{message === "Task Updated"? <Navigate to='../../dashboard'/> : <p>{message}</p>}</div>
            </Form>
        </div>

     )
}