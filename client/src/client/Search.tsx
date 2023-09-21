import React, { useState, useEffect } from 'react';
import './Search.scss';
import Slider from '@mui/material/Slider';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Theme, useTheme } from '@mui/material/styles';
import Client from './Client';
import FavoriteBorderSharpIcon from '@mui/icons-material/FavoriteBorderSharp';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from "react-router-dom";



function Search() {
    const [value, setValue] = React.useState<number[]>([1000, 10000000000]);
    const [properties, setProperties] = useState([])
    const [filteredProperties, setFilteredProperties] = useState([])
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        fetchProperties()
    }, [])

    const handleChange = (event: Event, newValue: number | number[]) => {
        const updatePrices = newValue as number[]
        setValue(updatePrices);
        console.log(filteredProperties);
        setFilteredProperties([...properties].filter((x: any) => {
            if (x.price >= updatePrices[0] && x.price <= updatePrices[1]) {
                return x;
            }
        }));
        console.log(updatePrices[0], updatePrices[1]);
    };

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const fetchProperties = () => {
        fetch("http://localhost:8989/v1/property/manageProperty")
            .then(response => {
                return response.json()
            })
            .then(data => {
                console.log(data);
                setProperties(data);
                setFilteredProperties(data);
            })
    }

    // Searh based on the properties
    const [personName, setPersonName] = React.useState<string[]>([]);
    const handleCityChange = (event: SelectChangeEvent<typeof personName>) => {
        const {
            target: { value },
        } = event;
        let cityNames: string[] = typeof value === 'string' ? value.split(',') : value;
        console.log("City name", cityNames);
        setPersonName(cityNames);
        cityNames = cityNames.map((x: any) => x.toLowerCase());
        setFilteredProperties([...properties].filter((x: any) => {
            if (cityNames.length === 0) return x;
            return cityNames.includes(x.location.toLowerCase());
        }));
    };
    function getStyles(name: string, personName: string[], theme: Theme) {
        return {
            fontWeight:
                personName.indexOf(name) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
        };
    }
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };
    const names = [
        'Bangalore',
        'Mumbai',
        'Hyderbad',
        'Pune'
    ];
    const theme = useTheme();

    return (
        <div>
            <Client></Client>
            <div style={{ margin: 10 }}></div>
            <div style={{ margin: 10, width: '100%', height: '100vh' }}>
                <Typography variant="h5" component="h5">Property Filters</Typography>
                <div className="row">
                    <div className="left" style={{ margin: 20 }}>
                        <Typography id="input-slider" gutterBottom>
                            Price
                        </Typography>
                        <Slider
                            getAriaLabel={() => 'Price'}
                            value={value}
                            min={1000000}
                            max={100000000}
                            onChange={handleChange}
                            valueLabelDisplay="auto"
                            disableSwap
                        />
                        <FormControl sx={{ m: 1, width: 300 }}>
                            <Typography id="input-slider" gutterBottom>
                                City
                            </Typography>
                            <Select
                                labelId="demo-multiple-name-label"
                                id="demo-multiple-name"
                                multiple
                                value={personName}
                                onChange={handleCityChange}
                                input={<OutlinedInput label="Name" />}
                                MenuProps={MenuProps}
                            >
                                {names.map((name) => (
                                    <MenuItem
                                        key={name}
                                        value={name}
                                        style={getStyles(name, personName, theme)}
                                    >
                                        {name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                    <div className='right'>
                        <Grid container spacing={2}>
                            {[...filteredProperties].map((x, i) =>
                                <Grid xs={3} key={i} className='poperty-card'>
                                    <Card sx={{ maxWidth: 345 }} key={i} onClick={handleOpen}>
                                        <CardActionArea>
                                            <CardMedia
                                                component="img"
                                                height="140"
                                                image={x['imageLink']}
                                            />
                                            <Link to={"/PropertyDetail/" + x["id"]}>
                                                <CardContent>
                                                    <Typography gutterBottom variant="h5" component="div">
                                                        {x['name']}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        <i>{x['squareFeet']} sq. ft.</i>
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        Price: ₹{x['price']}
                                                    </Typography>
                                                    <div>{x['interested'] ? <FavoriteIcon /> : <FavoriteBorderSharpIcon />}</div>
                                                </CardContent>
                                            </Link>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                            )}
                        </Grid>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Search;
