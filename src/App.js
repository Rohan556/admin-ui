import React, { useEffect, useState } from "react"
import { MAX_NO_OF_ROWS as max_rows, backend } from "./config"
import { prepareDataHelper, filterSearchHelper, handleDeleteHelper } from "./helper";
import "./App.css"
import SearchBar from "./Components/SearchBar"
import DisplayUsers from "./Components/DisplayUsers";
import PageNavigation from "./Components/PageNavigation";
import axios from "axios"

let gUsers = [] //Contains data of all users
let gSearchText = ""


function App() {
  
  //State Variables
  const [toDisplay, setToDisplay] = useState([]) //Contains data to be displayed
  const [offset, setOffSet] = useState(0); //Tells the offset of current page
  let minPageNumber = toDisplay.length === 0 ? 0 : 1; // Min possible page number
  let maxPageNumber = Math.ceil(toDisplay.length/max_rows) //Max possible page number


  //Lifecycles
    //Component Did mount
    useEffect(() => {
      getUsers(); //get all users using API when the component renders
    }, [])


    //Component did update whenever toDisplay updates
    useEffect(() => {
      console.log(toDisplay)
      //Min page number and max page number gets updated everytime the display items are changed
      calculatePageNumbers();
    }, [toDisplay])



    const calculatePageNumbers = () => {
      minPageNumber = toDisplay.length === 0 ? 0 : 1;
      maxPageNumber = Math.ceil(toDisplay.length/max_rows)
    }
  //methods
    //get all the users through the API get call
  const getUsers = async() => {
    let data = await axios.get(backend).then(res => {
      console.log(res.data)
      gUsers = res.data
      setToDisplay(prepareDataHelper(gUsers)) //preparing the data to add "selected" property to it
      return res;
    }).catch(err => {
      console.log(err)
    })  
    return data
  }

  //Called when user tries to change page number
  const handlePageNumbers = (mode, minPageNumber, maxPageNumber, number=false) => {

    if(number)
      setOffSet(mode - 1)
    else{
      if(mode === "increment")
      setOffSet((offset) => offset + 1)

      else if(mode === "decrement")
        setOffSet((offset) => offset - 1)

      else if(mode === "left")
        setOffSet(minPageNumber - 1)

      else if(mode === "right")
        setOffSet(maxPageNumber - 1)
    }
  }

  //Used to return search result based on the user input on searchBar
  const handleSearch = (searchText) => {
    console.log(gUsers)
    gSearchText = searchText
    let searchResult = filterSearchHelper(gUsers, searchText)
    console.log(searchResult)
    calculatePageNumbers();
    console.log(maxPageNumber)
    console.log(toDisplay.length)
    setToDisplay(searchResult)
  }

  const handleCheck = (toDisplay, e, id, min_index = 0, max_index = 0) => {
    if(toDisplay.length === 0)
      return;
    console.log(toDisplay, id, min_index, max_index)
    let selectedIds = {}
    if(id === "all"){
      for(let i=min_index; i<=max_index; i++){
        toDisplay[i].selected = e.target.checked
        let temp = toDisplay[i].id
        selectedIds[temp] = e.target.checked
        console.log(e.target.checked)
        document.getElementById(`row${temp}`).style.backgroundColor = e.target.checked ? "#C0C0C0" : ""
        document.getElementById(`name${temp}`).style.backgroundColor = e.target.checked ? "#C0C0C0" : ""
        document.getElementById(`email${temp}`).style.backgroundColor = e.target.checked ? "#C0C0C0" : ""
        document.getElementById(`role${temp}`).style.backgroundColor = e.target.checked ? "#C0C0C0" : ""
      }
    }else{
      selectedIds[id] = e.target.checked
      document.getElementById(`row${id}`).style.backgroundColor = e.target.checked ? "#C0C0C0" : ""
      document.getElementById(`name${id}`).style.backgroundColor = e.target.checked ? "#C0C0C0" : ""
      document.getElementById(`email${id}`).style.backgroundColor = e.target.checked ? "#C0C0C0" : ""
      document.getElementById(`role${id}`).style.backgroundColor = e.target.checked ? "#C0C0C0" : ""
    }
    console.log(selectedIds)
    
    gUsers = gUsers.map((user) => {
      if(selectedIds.hasOwnProperty(user.id)){
        user.selected = selectedIds[user.id];
        return user
      }
      return user;
    })

    console.log(gUsers)
}

  // Used to delete for both checked deletion and single deletion
  const handleDelete = (id) => {
    console.log("I am called")
    if(id){
      gUsers = gUsers.filter((user) => {
        return user.id !== id
      })
    }else
      gUsers = handleDeleteHelper(gUsers)
    console.log(gUsers)
    handleSearch(gSearchText)
  }

  //used to update Record
  const updateRecord = (id, name, email, role) => {
    console.log(id, name, email, role)

    for(let i=0;i<gUsers.length;i++){
      if(gUsers[i].id === id){
        gUsers[i].name = name;
        gUsers[i].email = email;
        gUsers[i].role = role;
        break;
      }
    }
    handleSearch(gSearchText)
  }

  
  return (
   <div className="App">
    <SearchBar handleSearch={handleSearch}/>
    <DisplayUsers toDisplay={toDisplay} offset={offset} maxRows={max_rows} handleCheck={handleCheck} handleDelete={handleDelete} updateRecord={updateRecord}/>
    <PageNavigation handlePageNumbers={handlePageNumbers} currentPage={offset + 1} minPageNumber={minPageNumber} maxPageNumber={maxPageNumber}/>
   </div>
  );
}

export default App;
