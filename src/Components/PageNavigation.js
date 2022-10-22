import React from "react";
import "./Component_CSS/pageNavigation.css"

const PageNavigation = ({ handlePageNumbers, currentPage, minPageNumber, maxPageNumber }) => {

    
    const GenerateButtons = () => {
        if(minPageNumber < 1)
            return null;
            
        let buttonComponent = new Array()
        for(let i=minPageNumber; i<=maxPageNumber; i++){
            if(i === currentPage){
                let component = <button className="selected nav-buttons" key={i} onClick={() => handlePageNumbers(i, minPageNumber, maxPageNumber, true)}>{i}</button>
                buttonComponent.push(component)
            }else{
                let component = <button className="nav-buttons" key={i} onClick={() => handlePageNumbers(i, minPageNumber, maxPageNumber, true)}>{i}</button>
                buttonComponent.push(component)
            }
        }
        return buttonComponent
    }


    return <div className="pagenavigation">
        {console.log(minPageNumber, currentPage)}
        <button className={"nav-buttons " + (currentPage === minPageNumber || minPageNumber < 1 ? "button-disabled" : "")} onClick={() => handlePageNumbers("left", minPageNumber, maxPageNumber)}>
            <i className="fas fa-angle-double-left" aria-hidden="true"></i>
        </button>
        <button className={"nav-buttons " + (currentPage === minPageNumber || minPageNumber < 1 ? "button-disabled" : "")} onClick={() => handlePageNumbers("decrement", minPageNumber, maxPageNumber)}>
            <i className="fas fa-angle-left" aria-hidden="true"></i>
        </button>
        <GenerateButtons />
        <button className={"nav-buttons " + (currentPage === maxPageNumber || minPageNumber < 1 ? "button-disabled" : "")} onClick={() => handlePageNumbers("increment", minPageNumber, maxPageNumber)}>
            <i className="fas fa-angle-right" aria-hidden="true"></i>
        </button>
        <button className={"nav-buttons " + (currentPage === maxPageNumber || minPageNumber < 1 ? "button-disabled" : "")} onClick={() => handlePageNumbers("right", minPageNumber, maxPageNumber)}>
            <i className="fas fa-angle-double-right" aria-hidden="true"></i>
        </button>
    </div>
}

export default PageNavigation;