import React, { useState } from 'react';
import './searchbar.css';
import SearchIcon from '@mui/icons-material/Search';

function SearchBar({ placeholder, data }) {
    const [filteredData, setFilteredData] = useState([]);

    const handleFilter = (event) => {
        const searchWord = event.target.value
        const newFilter = ""
    }

    return (
        <div className='search'>
            <div className='searchInputs'>
                <input type='text' placeholder={placeholder} onChange={{handleFilter}}></input>
                <div className='searchIcon'>
                    <SearchIcon />
                </div>
            </div>
            {filteredData.length != 0 && (
                <div className='dataResults'></div>
            )}
        </div>
    )
}

export default SearchBar; 