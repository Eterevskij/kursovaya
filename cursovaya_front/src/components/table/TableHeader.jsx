let TableHeader = (props) => {

  console.log(props)

    return (
        <tr>
            {props.columnsNames.map((column)=>{
                return(
                    <th>{column.columnName}</th>
            )})}
            <th></th>
        </tr>
    )
}

export default TableHeader;