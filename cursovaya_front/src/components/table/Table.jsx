import TableHeader from './TableHeader';
import Row from './Row';


let Table = (props) => {
if(typeof(props) !=='undefined'){
debugger

  return(
        <table>
            <tbody>
                <TableHeader columnsNames={props.columnsNames}/>

                {props.table.map((entity)=>{
                    return <Row entity={entity} tableHeader={props.tableHeader} editMode={props.editMode} editEntity={props.editEntity} delete={props.delete} setEditMode={props.setEditMode}/>
                })
            }
                
            </tbody>
        </table>
        )
        }
}

export default Table;