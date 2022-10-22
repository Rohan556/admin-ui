import React, { useEffect, useState } from "react"
import './Component_CSS/displayUser.css'

let gmin_index = 0 
let gmax_index = 0

const DisplayUsers = ({ toDisplay, offset, maxRows, handleCheck, handleDelete, updateRecord }) => {

    const attributeNames = ["Name", "Email", "Role", "Actions"] //Table heading names
    const [parentChecked, setParentChecked] = useState(false)

    useEffect(() => {
        let allSelected = true;
        console.log(toDisplay, gmax_index, gmin_index)
        if(toDisplay.length > 0){
            for(let i=gmin_index;i<=gmax_index;i++){
            if(toDisplay[i].selected)
                continue

                allSelected = false
                break;       
        }
        console.log(allSelected)
        if(allSelected)
            setParentChecked(true)

        else
            setParentChecked(false)
        
        console.log(parentChecked)
        }else{
            setParentChecked(false)
        }
    }, [offset, toDisplay])


    //to Handle edit and save option
    const handleEditAndSave = (id) => {
        let currentClass = document.getElementById(`icon${id}`).classList[1]

       if(currentClass === "fa-edit"){
        let getIcon = document.getElementById(`icon${id}`)
            getIcon.classList.remove("fa-edit")
            getIcon.classList.add("fa-save")
            document.getElementById(`name${id}`).disabled = false;
            document.getElementById(`email${id}`).disabled = false;
            document.getElementById(`role${id}`).disabled = false   
       }else{
            let getIcon = document.getElementById(`icon${id}`)
            getIcon.classList.remove("fa-save")
            getIcon.classList.add("fa-edit")
            let getName = document.getElementById(`name${id}`)
            let getEmail = document.getElementById(`email${id}`)
            let getRole = document.getElementById(`role${id}`)
            getName.disabled = true
            getEmail.disabled = true
            getRole.disabled = true

            updateRecord(id, getName.value, getEmail.value, getRole.value)
       }
    }

    //Display complete row component
    const DisplayRows = () => {
        if(offset < 0)
            return;
        console.log(toDisplay)
        let min_index = offset * maxRows; // min index for toDisplay array
        let check_condition = toDisplay.slice(min_index, toDisplay.length) // used to check if the page contains atmost maxRow to deal with last page corner case
        let max_index = min_index + maxRows - 1;
        console.log(offset, maxRows)
        
        gmin_index = min_index
        
        if(check_condition.length < maxRows){
            max_index = min_index + check_condition.length - 1;
        }
        gmax_index = max_index
        console.log(min_index, max_index)
        console.log(toDisplay.slice(min_index, max_index + 1))
        return toDisplay.slice(min_index, max_index + 1).map((user, i) => {
            console.log(user.editing)
            return <tr key={user.id} id={`row${user.id}`}>
                <td>
                    <input type="checkbox" defaultChecked={user.selected} onChange={(e) => handleCheck(toDisplay, e, user.id)}/>
                </td>
                <td className="table-col">
                    <input type="text" className="table-input" id={`name${user.id}`} defaultValue={user.name} name="name" disabled={!user.editing}/>
                </td>
                <td className="table-col">
                    <input type="text" className="table-input" id={`email${user.id}`} defaultValue={user.email} name="email" disabled={!user.editing}/>
                </td>
                <td className="table-col">
                    <input type="text" className="table-input" id={`role${user.id}`} defaultValue={user.role} name="role" disabled={!user.editing}/>
                </td>
                <td className="icon">
                    {/* {user.editing ? <i className="fas fa-save" onClick={() => handleEditAndSave(user.id, "save")}></i> :<i className="fas fa-edit" onClick={() => handleEditAndSave(user.id, "edit")}></i> } */}
                    <i className="fas fa-edit cursor" style={{color: "#262891"}} id={`icon${user.id}`} onClick={() => handleEditAndSave(user.id)}></i>
                    <i className="fas fa-trash-alt cursor" style={{color: "red"}} onClick={() => {handleDelete(user.id)}}></i>
                </td>
            </tr>
        })
    }

    return (
        <div>
            <table style={{width: "100%",height: "fit-content",borderCollapse: "collapse"}}>
                <thead>
                    <tr>
                        <td><input type="checkbox" checked={parentChecked} onChange={(e) => {setParentChecked(!parentChecked) ;handleCheck(toDisplay, e, "all", gmin_index, gmax_index)}}/></td>
                        {
                            attributeNames.map((attribute) => {
                                return <td key={attribute}>{attribute}</td>
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    <DisplayRows />
                </tbody>
            </table>
            <button id="delete-button" className="cursor" onClick={() => handleDelete()}>Delete Selected</button>
        </div>
    )
}

export default DisplayUsers