import { useState } from 'react';
import * as React from 'react';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { flexbox } from '@mui/system';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Tooltip from '@mui/material/Tooltip';



const BasicCard = (props) => {
  return (
    <div>
    
    <Card sx={{ width: 240 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        {props.day}  {props.time}
        </Typography>
       
        <Typography variant="h5" component="div">
         {props.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
        {props.address}
        </Typography>
        
      </CardContent>
      <CardActions>
        <Button size="small">Read More</Button>
      </CardActions>
    </Card>
    
    </div>
  );
}



const PlusButton = (props) =>{
  return(
    <div style= {{display: 'inline-block', marginLeft: 20}}>
   <Fab  color="primary" size= 'small' aria-label="add" paddingleft= '10px'>
        <AddIcon />
      </Fab>
    </div>
  )

}

const WeekHeader = (props)=>{
  return (
    <div style= {{display: 'inline-block',  width: 120, marginRight: 20,  }}>
    <h5  style= {{paddingleft: '10px'}}>{props.weekHeaderText}
        
       </h5>
     </div>
  )
}


function valuetext(value) {
  return `${value}`;
}



const minDistance = 1;

const MinimumDistanceSlider= (props)=> {
  
  const [value1, setValue1] = useState([props.start, props.end]);

 let tooltipText=  props.weekdays +' ' + props.start+ ':00-' + props.end+ ':00\n' + props.eventName +'\n' + props.eventAddress +'\n'
      
  const handleChange1 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
      
      
    } else {
      setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
      
      
    }
  };


  return (
    
    <Box sx={{marginLeft: 10, marginTop: 3, width: 600 }}>
      <div style= {{display: 'flex', flexDirection: 'row', alignItems: 'space-between'}}>
        
      <WeekHeader weekHeaderText={props.weekdays}></WeekHeader>

          
        
              <Tooltip title={tooltipText}  >  
               
      <Slider 
        
        step={1}
        getAriaLabel={() => 'Monday'}
        value={[props.start, props.end]}
        onChange={handleChange1}
        marks= {props.marks}
        valueLabelDisplay="auto"
        min = {6}
        max = {24}
        getAriaValueText={valuetext}
        disableSwap
      />
      </Tooltip>
      
      
      <PlusButton  text= '+'></PlusButton></div>
      
    </Box> 
    
  );
}



const AddEvent = (props)=>{
    
  return(
    <div>
      
      <FormControl style={{width:'30%', margin:20}}>
      <h3 >Add event</h3>
      
 
    <Autocomplete
  disablePortal
  id="day"
  options={props.weekdays}
  onChange={(event, value) => props.setSelected(value)}
  name = 'day'
  renderInput={(params) => <TextField {...params} name='day'  label="Day"  />}
/>
    <br></br>
    
  <TextField id="time" label="Time (format 6:00-12:00)" type="text" name='time' onChange={props.inputChanged}/>
  <br></br>
  <TextField id="name" label="Event name" type="text" onChange={props.inputChanged} name='name' />
  <br></br>
  <TextField id="address" label="Address" type="text" onChange={props.inputChanged} name='address'/>
  <br></br>
  <button type="submit" onClick={props.handleSaveActivities}>Add event</button>
  
</FormControl>
      
        
        </div>
        )
}

const ListEvents = (props)=>{
  console.log('Length of the array of activities from ListEvent', props.activities.length)
  let activities = props.activities
  
      
  let res = activities.map((activity, index) =>
  
     <div key={index} style={{display: 'inline block', marginLeft: 40, margin: 20 }} >
        <BasicCard key={activity.id} time= {activity.time} day= {activity.day}  name = {activity.name} address = {activity.address} />
      </div>
      
    );
 
            
return  (
<div>{res}</div>
);
    }
  

  
 

const App = () => {
  const [counter, setCounter]= useState(0);
  const [id, setId] = useState(0);
  const [selected, setSelected] = useState(' ');
  const [activities, setActivities] = useState([])
  const [activity, setActivity] = useState({id: '', day: '', time: '',name: '', address: ''})
  
  function predefinedActivities () {
    if (counter<=2){
    setActivity({...activity, id: '99', day: 'Wednesday', time: '8:00-11:00', name: 'Early birds run', address: 'Rautatientori, 15 Helsinki'});
    setActivities([activity]);
    setId(id+1)
    
    setCounter(counter+1)
  
  }
}
  predefinedActivities();
  console.log('activities length from the start', activities.length)
    
  const inputChanged = (event) => {
        
    setActivity({...activity, 'id': id, 'day': selected, [event.target.name]: event.target.value});
    setId(id+1) 
    
  }
  
  const handleSaveActivities= () => {
    setActivities([...activities, activity]);
}



  const weekdays= [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
  ]


  
  const marks = [
    {
      value: 6,
      label: '6',
    },
    {
      value: 7,
      label: '7',
    },
    {
      value: 8,
      label: '8',
    },
    {
      value: 9,
      label: '9',
    },
    {
      value: 10,
      label: '10',
    },
    {
      value: 11,
      label: '11',
    },
    {
      value: 12,
      label: '12',
    },
    {
      value: 13,
      label: '13',
    },
    {
      value: 14,
      label: '14',
    },
    {
      value: 15,
      label: '15',
    },
    {
      value: 16,
      label: '16',
    },
    {
      value: 17,
      label: '17',
    },
    {
      value: 18,
      label: '18',
    },
    {
      value: 11,
      label: '11',
    },
    {
      value: 19,
      label: '19',
    },
    {
      value: 20,
      label: '20',
    },{
      value: 21,
      label: '21',
    },
    {
      value: 22,
      label: '22',
    },
    {
      value: 23,
      label: '23',
    },
    {
      value: 24,
      label: '24',
    },
  ];

  let values = {}
  let eventValues= {}
  if (activities.length>0){
  let j=0
    let m = activities.length
  for (j=0; j<m; j=j+1 ) {
    let aday=activities[j].day
    let atime=activities[j].time
        
    values[aday]= atime
    eventValues[aday]= [activities[j].name, activities[j].address]
  }
}

    
  let rows= []
  let i=0
   
  let n= weekdays.length
 
  for (i=0; i<n; i=i+1 ) {
    let day = weekdays[i]
    let start = 22
    let end = 23
    let eventName = 'No planned events'
    let eventAddress= ''
    for (var key in values){
      
      
      if (weekdays[i]===key){
        
        let receivedTime= values[key]
        receivedTime = receivedTime.split('-')
        console.log('received start length', receivedTime[0].length)
        console.log('received end length', receivedTime[1].length)
        if (receivedTime[0].length===5){
          start = receivedTime[0].trim().slice(0, 2)
        }
        else{
        start = receivedTime[0].trim().slice(0, 1)
      }
      if (receivedTime[1].length===5){
        end = receivedTime[1].trim().slice(0, 2)
      }
        else{
        end = receivedTime[1].trim().slice(0, 1)

        }
        console.log ('START', start, 'END', end)
        eventName=  eventValues[key][0]
        eventAddress=  eventValues[key][1]
        

      }
    }
       
    console.log(day)
    rows.push(
      
        
  
      <MinimumDistanceSlider  weekdays= {day} marks= {marks} start = {start} end={end}  eventName= {eventName} eventAddress = {eventAddress}></MinimumDistanceSlider>
     
    )
  
}
 
    

  return (
    <div>
      <div style ={{display: 'flex', flexDirection: 'row', width: '90%'}}>
        <div style={{display: 'inline block'}} >
        {rows} 
        </div>
        
      

<div style ={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
   
      <ListEvents activities= {activities} ></ListEvents>
      </div>
      </div>
      
      
      
      
      
      <AddEvent weekdays= {weekdays} inputChanged={inputChanged} setSelected={setSelected} handleSaveActivities={handleSaveActivities}/>
      
      
    </div>
  )
}

export default App;
