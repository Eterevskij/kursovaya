import TextField from './fields/TextField'


let EditingRow = (props) => {

debugger;

    let {entity} = props;
    
    return(props.columnsNamesInDB.map((name)=>{
        if(name.text === props.Key){
            if(name.type === 'text'){
                return <TextField editField={props.editField} entity={entity} tableHeader={props.tableHeader} Key={props.Key}/>
            } else if (name.type === 'select') {
 
                return (<td><select id='select' onChange={(e)=>props.editField(props.tableHeader.path, props.entity.Id, props.Key, e.target.value)}>
                            {props.selects[props.Key].map((select)=> {
debugger
                                return <option>{select?.Id ? select.Id : select[props.Key]}</option>
                            })}
                        </select></td>)
            } else {
                return <td>{entity[props.Key]}</td>
            }

        } 
    })
)
  }
  
  export default EditingRow;