import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import ShowInputValue from '../components/ShowInputValue'
import "../css/Home.css"
import MovieCard from '../components/MovieCard';
// import { store, updateMagnet } from "../redux/store";
// import * as Types from "../redux/types";
import Key from "../redux/keys";


// update store to save the 
// metadata
// torrent info and url to make request from the server

// add the store on click of the movie cards to show info of that movie 
// in back get the torrent link for that movie and how the movie info 
// and get the metadata for the torrent and add the info on the page and in the store
// and link to redirect the movie pages and to show the movies info page - https://reactrouter.com/web/api/Link 
    

// const searchByNameURI = (name) => `https://api.tvmaze.com/search/shows?q=${name}`
const searchByNameURI = (name, api_key) => `https://api.themoviedb.org/4/search/movie?api_key=${api_key}&query=${encodeURI(name)}`

function Home({ }) {
    const [SearchValue, setSearchValue] = useState('');
    const [JsonResponse, setJsonResponse] = useState([]);
    const [APIKey, setAPIKey] = useState('');
    const [timeout, settimeout] = useState(false);
    const allTimeouts = []

    function fetchByName(value, APIkey = APIKey) {
        var URI = searchByNameURI(value, APIkey)
        // console.log(URI, value)
        if (value) {
            return fetch(URI)
                .then(res => res.json())
                .then(res => {
                    try {
                        // console.log(res.results);
                        setJsonResponse(res.results)
                    } catch {
                        // console.log(`1234`);
                        setJsonResponse([])
                    }
                })
                .catch(err => console.log(err))
        } else {
            return
        }
    }

    function loaderTimeout() {
        console.log(12354);
        const newt = setTimeout(() => {
            settimeout(true)
        }, 5 * 1000);
        allTimeouts.push(newt);
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
        // loaderTimeout()

        return () => {
            setJsonResponse([])
            settimeout(false)
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
                            if (event.target.value == "") {
                                setJsonResponse([])
                            }
                            // console.log(JsonResponse);

                            // remove all the timeout from list and then do it
                            allTimeouts.map(ele=>clearTimeout(ele));
                            settimeout(false);
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
                                // console.log(element);
                                return <MovieCard
                                    key={element.id}
                                    {...element}
                                />
                            }
                        }
                    )
                }
                {
                    (SearchValue.trim() != "")
                    && JsonResponse.length == 0
                    && (
                        timeout  // check for new changes for switch base 
                            ? <h1> 😟 Noting to show ¯\_(ツ)_/¯ </h1>
                            : <h1
                                onLoad={loaderTimeout()}
                                className="dotloading">
                                👷‍♂️ Working HARD to get Results
                            </h1>)
                }
            </div>
        </div>
    )
}

export default Home;