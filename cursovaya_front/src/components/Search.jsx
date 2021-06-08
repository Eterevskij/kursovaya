import React from 'react';
import { useLocation } from "react-router-dom";


let Search = (props) => {


    const location = useLocation().pathname.replace('/', '');

    console.log(props)

    let textInput = React.createRef();
    let selectInput = React.createRef();

    let changeSearch = ()=>{
        
        debugger
    let inputText = textInput.current.value;
    
    if(inputText === "") {props.search(location); return};
    debugger
    let i = -1;
        for (let key in props.options) {
                debugger
                i++;
                if(props.options[key].columnName === selectInput.current.value || selectInput.current.value === 'none'){
                    let columnName = props.options[key].nameInDB;
                    props.search(location, columnName, inputText, selectInput.current.value)
                
                    return
                }
          }
    }

    let optionNameInDB 

    // let currentSelect = props;
    return(
        <div className="table_managment_saerch">
            <input className="table_managment_saerch_input" value={props.searchText} type="text" placeholder='Поиск' ref={textInput} onChange={() => changeSearch() } autoFocus/>
            <p>по</p>
            <select className="table_managment_saerch_by" value={props.columnName} ref={selectInput} onChange={() => changeSearch() }>
                <option value="none"></option>
                {props.columnsNames.map((name)=>{
                   return <option value={name.columnName}>{name.columnName}</option>
                })}
            </select>
        </div>
)
}

export default Search;
