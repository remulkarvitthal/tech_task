import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './PropertyDetail.scss';

interface Property {
    id: number;
    name: string;
    location: string;
    price: number;
    interested: boolean;
    image: string;
    year: number;
    squareFeet: number;
    imageLink: string;
    bedrooms: number;
    bathrooms: number;
}

function PropertyDetail() {
    const { id } = useParams();
    const [properties, setProperties] = useState<Property|null>(null);


    useEffect(() => {
        fetchProperties()
    }, [])


    const fetchProperties = () => {
        fetch("http://localhost:8989/v1/property/manageProperty/" + id)
            .then(response => {
                return response.json()
            })
            .then(data => {
                const property: Property = data as Property;
                setProperties(property);
            })
    }

    console.log(properties);
    return (
        <div>
            <div className="a">
                <div className="images">
                    <img src={properties?.imageLink} alt="Logo" width={1000} style={{height:"100vh"}}/>
                </div>
                <div className="info">
                    {properties == undefined && <div className="title">
                        <h1>Loading...</h1>
                    </div>
                    }
                    {properties !== undefined &&
                        <div style={{margin: 10}}>
                            <div className="title">
                                <h1>{properties?.name}</h1>
                            </div>
                            <div className="price">
                                <h3>Price: ₹{properties?.price}</h3>
                            </div>
                            <div className="city">
                                <h3>City: {properties?.location}</h3>
                            </div>
                            <div className="year">
                                <i>{properties?.squareFeet} Sq. Ft.</i>
                            </div>
                            <hr></hr>
                            <div className="room-details">
                                Bedrooms: {properties?.bedrooms} <br></br>
                                Bathrooms: {properties?.bathrooms} 
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default PropertyDetail;
