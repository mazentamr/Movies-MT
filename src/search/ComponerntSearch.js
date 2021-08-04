import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FakeSearch from './FakeSearch'
import React, { useState } from 'react';
import './search.css'
import MovieItim from './MovieItim'
import { searchMove } from "../api/api"
import axios from '../api/axios';
import {AiOutlineSearch} from "react-icons/ai"
export default function ComponerntSearch() {
    const [name_move, setName_move] = useState("")
    const [movies, setMovies] = useState([])
    const [loding, setLoding] = useState(false)
    const [lodingFake, setLodingFake] = useState(false)

    const handlClike = async () => {
        setLodingFake(true);
        const response = await axios.get(searchMove(name_move));
        setMovies(response.data.results);
        setLoding(true);
        // setLodingFake(false);

        return response
    }

    const handlChange = (event) => {
        const newName = event.target.value
        setName_move(newName)
    }

    console.log(name_move)

    return (
        <div className="pirant">
            <div className="search_style">
                <div>
                    <TextField id="filled-basic" label="Search" variant="filled" value={name_move} onChange={handlChange}
                        required
                        name="text"
                    />
                </div>
                <div>
                    <Button disableElevation variant="contained" onClick={handlClike} ><AiOutlineSearch/>Search</Button>
                </div>
            </div>
            <hr></hr>
            {
                loding === false && lodingFake === true ?
                    <FakeSearch lodingFake={true} />
                    : null
            }
            <div>
            {
                loding ? movies.map((item, i) => <MovieItim name={item.title} id={item.id} urlImg={item.poster_path} key={i} />) : null
            }
            </div>
            
        </div>
    )
}