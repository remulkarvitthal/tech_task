import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Client from './Client';

function Faviorte() {
    const [properties, setProperties] = useState([])


    useEffect(() => {
        fetchProperties()
    }, [])


    const fetchProperties = () => {
        fetch("http://localhost:8989/v1/property/manageProperty")
            .then(response => {
                return response.json()
            })
            .then(data => {
                console.log(data);
                setProperties(data);
            })
    }


    return (
        <div>
            <Client></Client>
            <div style={{ width: '100%', height: '100vh', margin: 40 }}>
                <Grid container spacing={2}>
                    {[...properties].map((x, i) =>
                        <Grid xs={3} key={i}>
                            <Card sx={{ maxWidth: 345 }} key={i}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={x['imageLink']}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {x['name']}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                        <i>{x['squareFeet']} Sq. Ft.</i>
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                                    Price: ₹{x['price']}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    )}
                </Grid>
            </div>
        </div>
    );
}

export default Faviorte;
