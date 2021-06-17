import EditigRow from './EditingRow';
import EnteryActions from './EnteryActions';
import StaticRow from './StaticRow' 

let Row = (props) => {

    debugger

    let {entity} = props

    let columnsNamesInDB = Object.keys(props.tableHeader.columns).map((Key,i)=>{
        return (
            props.tableHeader.columns[Key].nameInDB
          )
      })

    console.log(props)
  
        return(<tr>{Object.keys(entity).map((Key,i)=>{
            if(props.editMode && entity.Id == props.editEntity) {
                <EditigRow />
            } else {
                debugger
                return <StaticRow Key={Key} entity={entity} columnsNamesInDB={columnsNamesInDB}/>
            }
        })}<th><EnteryActions Id={entity.Id} delete={props.delete} setEditMode={props.setEditMode}/></th></tr>)
  }
  
  export default Row;