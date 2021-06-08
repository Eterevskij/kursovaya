import Search from './Search';

import add from '../img/Add.svg';

let TableContorl = (props) => {

    console.log(props)

    return(
    <div className="table_managment"> {/* !!! */}
            <h2 className="table_managment_header">{props.options.title} <a href=""><img src={add} alt="" /></a></h2>
            
            <Search columnsNames={props.columnsNames} options={props.options.columns} search={props.find} 
                    columnName={props.columnName} searchText={props.searchText}/>
    </div>
)
}

export default TableContorl;