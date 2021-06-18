import EditigRow from './EditingRow';
import EnteryActions from './EnteryActions';
import StaticRow from './StaticRow' 

let Row = (props) => {


    let {entity} = props

    let columnsNamesInDB = Object.keys(props.tableHeader.columns).map((Key,i)=>{
        return (
            {text: props.tableHeader.columns[Key].nameInDB,
            type: props.tableHeader.columns[Key].editType}
          )
      })

    console.log(props)
  
        return(<tr>{Object.keys(entity).map((Key,i)=>{
            if(props.editMode && entity.Id == props.editEntity) {
                return <EditigRow Key={Key} editField={props.editField} selects={props.selects} tableHeader={props.tableHeader} entity={entity} columnsNamesInDB={columnsNamesInDB}/>
            } else {
                return <StaticRow Key={Key} entity={entity} columnsNamesInDB={columnsNamesInDB}/>
            }
        })}<th><EnteryActions Id={entity.Id} delete={props.delete} setEditMode={props.setEditMode}/></th></tr>)
  }
  
  export default Row;