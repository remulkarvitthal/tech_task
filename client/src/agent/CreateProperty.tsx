
import { Button, FormControl, MenuItem, TextField } from '@mui/material';
import React, { useState } from 'react';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';




function CreateProperty() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [bedrooms, setBedrooms] = useState('');
    const [bathrooms, setBathrooms] = useState('');
    const [location, setLocation] = useState('');
    const [imageLink, setImageLink] = useState('');


    const handleNameChange = (event: any) => {
        setName(event.target.value);
    };

    const handleDescChange = (event: any) => {
        setDescription(event.target.value);
    };

    const handleTypeChange = (event: any) => {
        setType(event.target.value);
    }

    const handleBedroomsChange = (event: any) => {
        setBedrooms(event.target.value);
    }

    const handleBathroomsChange = (event: any) => {
        setBathrooms(event.target.value);
    }

    const handleLocationChange = (event: any) => {
        setLocation(event.target.value);
    }

    const handleImageLinkChange = (event: any) => {
        setImageLink(event.target.value);
    }


    function submitProperty() {
        // Write code to submit property to backend
        // Use fetch() to make a POST request to the backend

        const payload = { name, description, type, bedrooms, bathrooms, location, imageLink, isAvailable: true, price:  Math.floor(Math.random() * 10000000), agentId: '650ae6a5f0549858f40aeedc', squareFeet: 100};
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        };
        fetch("http://localhost:8989/v1/property/manageProperty", requestOptions).then(response => response.json()).then(data => console.log(data));
    }
    return (
        <FormControl sx={{ m: 1, width: '25ch' }}>
            <Typography>Create Property</Typography>
            <TextField id="name" label="Name" variant="outlined" style={{ width: 500, margin: 5 }} onChange={handleNameChange} />
            <TextField id="desc" label="Description" variant="outlined" style={{ width: 500, margin: 5 }} onChange={handleDescChange} />
            <Select style={{ margin: 5 }} onChange={handleTypeChange}>
                <MenuItem value={'Apartment'}>Apartment</MenuItem>
                <MenuItem value={'House'}>House</MenuItem>
                <MenuItem value={'Condo'}>Condo</MenuItem>
                <MenuItem value={'Commercial'}>Commercial</MenuItem>
            </Select>
            <TextField id="bedrooms" label="Bedrooms" variant="outlined" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} style={{ width: 250, margin: 5 }} onChange={handleBedroomsChange} />
            <TextField id="bathrooms" label="Bathrooms" variant="outlined" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} style={{ width: 250, margin: 5 }} onChange={handleBathroomsChange} />
            <TextField id="location" label="Location" variant="outlined" style={{ width: 500, margin: 5 }} onChange={handleLocationChange} />
            <TextField id="imageLink" label="ImageLink" variant="outlined" style={{ width: 500, margin: 5 }} onChange={handleImageLinkChange} />
            <Button variant="contained" onClick={submitProperty}>Submit Property</Button>
        </FormControl>
    );
}
export default CreateProperty;