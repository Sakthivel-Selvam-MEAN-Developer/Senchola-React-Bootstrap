import { useEffect, useState } from 'react';
import './main.css';

const Main = () => {
    const API_URL = 'https://api.thecatapi.com/v1/images/search?limit=10';

    const [images, setImages] = useState([]);
    const [notGettingError, setNotGettingError] = useState(false);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await fetch(API_URL);

                if (!response.ok) throw Error('Error: Data not Received');

                const result = await response.json();
                setImages(result);
            } catch (err) {
                setNotGettingError(true);
            }
        };

        fetchImages();
        console.log(images)
    }, []);

    return (
        <div className="container mt-5">
            <h3 className='mb-3 mt-3'>Cat Cards</h3>
            <div className="card-container d-flex flex-wrap justify-content-between">
                {!notGettingError ? (
                    images.length ? (
                        images.map((img) => (
                            <div className="card m-2" key={img.id}>
                                <img src={img.url} className="card-img-top" alt="img" />
                                <div className="card-body">
                                    <h5 className="card-title">Cat Card</h5>
                                    <p className="card-text">Some Content About Cat and The Breed</p>
                                    <a href="#" className="btn btn-primary">Go Cat</a>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Loading...</p>
                    )
                ) : (
                    <p>Error: Data not Fetched</p>
                )}
            </div>
        </div>
    );
};

export { Main };
