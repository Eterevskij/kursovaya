import TableHeader from './TableHeader';
import Row from './Row';


let Table = (props) => {
if(typeof(props) !=='undefined'){

  return(
        <table>
            <tbody>
                <TableHeader columnsNames={props.columnsNames}/>

                {props.table.map((entity)=>{
                    return <Row editField={props.editField} setSelectOptions={props.setSelectOptions} selects={props.selects} entity={entity} tableHeader={props.tableHeader} editMode={props.editMode} editEntity={props.editEntity} delete={props.delete} setEditMode={props.setEditMode}/>
                })
            }
                
            </tbody>
        </table>
        )
        }
}

export default Table;