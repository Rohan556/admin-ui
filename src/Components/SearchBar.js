import React from "react"
import './Component_CSS/searchbar.css'

const SearchBar = ({ handleSearch }) => {
    return (
        <div>
            <input type="text" placeholder="Search by name, email or role" id="search-input" onChange={(e) => handleSearch(e.target.value)}/>
        </div>
    )
}

export default SearchBar;

