import EnteryActions from './EnteryActions'

let EditingRow = (props) => {

    console.log(props)
    debugger
    let {entity} = props;
    
        return(
            <>{Object.keys(entity).map((Key,i)=>{
                if(props.editMode && entity.Id == props.editEntity) {
                    
                }
            })}<th><EnteryActions Id={entity.Id} delete={props.delete} setEditMode={props.setEditMode}/></th></>
        )
  }
  
  export default EditingRow;