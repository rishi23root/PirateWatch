import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import ShowInputValue from '../components/ShowInputValue'
import "../css/Home.css"
import MovieCard from '../components/MovieCard';
// import { store, updateMagnet } from "../redux/store";
// import * as Types from "../redux/types";
import Key from "../redux/keys";

// const searchByNameURI = (name) => `https://api.tvmaze.com/search/shows?q=${name}`
const searchByNameURI = (name, api_key) => `https://api.themoviedb.org/4/search/movie?api_key=${api_key}&query=${encodeURI(name)}`

function Home({ }) {
    const [SearchValue, setSearchValue] = useState('');
    const [JsonResponse, setJsonResponse] = useState([]);
    const [APIKey, setAPIKey] = useState('')

    function fetchByName(value, APIkey = APIKey) {
        var URI = searchByNameURI(value, APIkey)
        // console.log(URI, value)
        if (value) {
            return fetch(URI)
                .then(res => res.json())
                .then(res => {
                    try {
                        console.log(res.results);
                        setJsonResponse(res.results)
                    } catch {
                        console.log(`1234`);
                        setJsonResponse([])
                    }
                })
                .catch(err => console.log(err))
        } else {
            return
        }
    }

    useEffect(() => {
        // test the key here
        setAPIKey(Key.get())
        // for (let index = 0; index < 3; index++) {
        //     var testKey = Key.get()
        //     fetchByName("avengers", testKey)
        //     if (JsonResponse) {
        //         setJsonResponse([])
        //         setAPIKey(testKey)
        //         break
        //     } else {
        //         Key.del(testKey);
        //     }
        // }
        setJsonResponse([])
        return () =>{
            setJsonResponse([])
        }
    }, [])

    return (
        <div className="Home">
            <div className="head">
                <h1 className={SearchValue.trim() ? "headName small" : "headName big"} >Torrent Search</h1>
                <nav className={SearchValue.trim() ? "officialNav" : "empty"}>
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
                            fetchByName(event.target.value, APIKey);
                            if (event.target.value == ""){
                                setJsonResponse([])
                            }
                            console.log(JsonResponse);
                        }}
                    />
                </nav>
                {SearchValue && <ShowInputValue value={SearchValue} />}
            </div>
            <div className="showCards">
                {
                    SearchValue.trim() != "" &&
                    JsonResponse &&
                    JsonResponse.map(
                        element => {
                            if (element.poster_path) {
                                return <MovieCard key={element.id} {...element} />
                            }
                        }
                    )
                }
                {
                    (SearchValue.trim() != "") 
                    && JsonResponse.length == 0 
                    && <h1> 😟 Noting to show ¯\_(ツ)_/¯</h1>
                }
            </div>
        </div>
    )
}

export default Home;