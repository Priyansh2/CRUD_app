import React, {useEffect,useState} from 'react';
import axios from 'axios';
import { Link} from 'react-router-dom';
import { Button, Tab, Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow,Input, Card, CardContent } from 'semantic-ui-react';
import './searchbar.css';
export default function SearchBar() {
  const [APIData, setAPIData] = useState([]);
  const [filteredResults,setFilteredResults]=useState([]);
  const [search,setSearch]=useState('');
  const setData =(data)=>{
    console.log(data);
        let { id, taskName, description, date, priority } = data;
        localStorage.setItem('ID', id);
        localStorage.setItem('Task Name', taskName);
        localStorage.setItem('Description', description);
        localStorage.setItem('Date', date);
        localStorage.setItem('Priority',priority)
  }
  const reload=()=>{
    axios.get(`https://62cfa587486b6ce826593458.mockapi.io/api/v1/tempdata`)
    .then((reload)=>{
      setAPIData(reload.data);
    })
  }

  const searchItems=(searchValue)=>{
    setSearch(searchValue)
    if (search!== '') {
        const filteredData =APIData.filter((item) => {
            return Object.values(item).join('').toLowerCase().includes(search.toLowerCase())

        })
        setFilteredResults(filteredData)
    }
    else{
            setFilteredResults(APIData)
    }
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
    <div style={{ padding: 20 }}>
    <Input icon='search'
        placeholder='Search...'
        onChange={(e) => searchItems(e.target.value)}
    />
    <Card.Group itemsPerRow={1} style={{ marginTop: 20 }}>
        {search.length > 1 ? (
            filteredResults.map((item) => {
                return (
                    <Card>
                        <Card.Content>
                            <Card.Header>Task Name:{item.taskName}</Card.Header>
                            <Card.Description>
                                Description:{item.description}
                            </Card.Description>
                            <Card.Description>
                                Date:{item.date}
                            </Card.Description>
                            <Card.Description>
                                Priority:{item.priority}
                            </Card.Description>
                            <Link to='../../edittask'>
                                <Button onClick={()=>setData(item)}>Edit</Button>
                            </Link>
                            <Button onClick={()=>onDelete(item.id)}>Delete</Button>
                        </Card.Content>
                    </Card>
                )
            })
        ) : (
            APIData.map((item) => {
                return (
                    <Card className='card1'>
                        <Card.Content>
                         <Card.Header>Task Name:{item.taskName}</Card.Header>
                            <Card.Description className='card2'>
                                Description:{item.description}
                            </Card.Description>
                            <Card.Description className='card2'>
                                Date:{item.date}
                            </Card.Description>
                            <Card.Description className='card2'>
                                Priority:{item.priority}
                            </Card.Description>
                            <Link to='../../edittask'>
                                <Button onClick={()=>setData(item)}>Edit</Button>
                            </Link>
                            <Button onClick={()=>onDelete(item.id)}>Delete</Button>
                        </Card.Content>
                    </Card>
                )
            })
        )}
    </Card.Group>
</div>
)
  
}