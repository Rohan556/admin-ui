//this will add some properties inside the users object 
export const prepareDataHelper = (users) => {
    let prepareUsers = users.map((user) => {
        user.selected = false;
        user.editing = false;
        return user;
    })

    return prepareUsers
}

//this will filter the table based on search text
export const filterSearchHelper = (users, searchText) => {
    searchText = searchText.toLowerCase();
    console.log(users, searchText)
   
    const result = users.filter((user) => {
        console.log()
        return user.name.toLowerCase().includes(searchText) || user.email.toLowerCase().includes(searchText) || user.role.toLowerCase().includes(searchText)
    })

    return result
}

//this will help delete all selected users
export const handleDeleteHelper = (users) => {
    let deletedUsers = users.filter((user) => {
        return !user.selected
    })

    return deletedUsers
}