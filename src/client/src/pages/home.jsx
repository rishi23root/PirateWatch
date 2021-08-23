import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import ShowInputValue from '../components/ShowInputValue'
import "../css/Home.css"
import MovieCard from '../components/MovieCard';
// import { store, updateMagnet } from "../redux/store";
// import * as Types from "../redux/types";
import Key from "../redux/keys";


// this is just for the shows
// https://api.tvmaze.com/shows // update it for movies also


const searchByNameURI = (name) => `https://api.tvmaze.com/search/shows?q=${name}`
const searchByNameURI2 = (api_key, name) => `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${name}`

function Home({ }) {
    const [SearchValue, setSearchValue] = useState('');
    const [JsonResponse, setJsonResponse] = useState([]);

    useEffect(() => {
        console.log(

            Key.get()
        );
    }, [])

    function fetchByName(value) {
        fetch(searchByNameURI(value))
            .then(res => res.json())
            .then(res => setJsonResponse(res))
            .catch(err => console.log(err))
    }
    return (
        <div className="Home">
            <div className="head">
                <h1 className={SearchValue.trim() ? "headName small" : "headName big"} >Torrent Search</h1>
                <nav className={SearchValue ? "officialNav" : "empty"}>
                    <TextField
                        autoFocus
                        size='medium'
                        inputProps={{ style: { fontSize: 30 } }} // font size of input text
                        InputLabelProps={{ style: { fontSize: 20 } }} // font size of input label
                        className="search-field full-page"
                        id="outlined-basic"
                        label="By  Movie-Name 😎"
                        variant="outlined"
                        onChange={(event) => {
                            setSearchValue(event.target.value);
                            fetchByName(SearchValue);
                        }}
                    />
                </nav>
                {SearchValue && <ShowInputValue value={SearchValue} />}
            </div>
            <div className="showCards">
                <div className="showMovies">
                    "this is the way"
                    {
                        SearchValue
                        && JsonResponse
                            .map(
                                element => {
                                    console.log(element);
                                    return <h1 >{element.show.name}</h1>
                                }
                            )
                    }
                </div>
            </div>
        </div>
    )
}

export default Home;