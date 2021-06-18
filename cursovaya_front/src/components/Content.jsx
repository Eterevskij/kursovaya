import TableControl from './TableControl';
import Preloader from '../img/Preloader.gif';
import Table from './table/Table'


let Content = (props) => {

    console.log(props)

    let columnsNames = [];
    let columnsNamesInDB = [];
    

    let isLoaded = !Object.keys(props.tableHeader).length == 0;

    if(isLoaded){

        columnsNames = Object.keys(props.tableHeader.columns).map((Key,i)=>{
            return (
                props.tableHeader.columns[Key]
              )
          })
    }


    return(
        <div className="content">
            {props.isPreloading ? <img src={Preloader} className="preloader" alt="preloader" /> : 
            <>
            <TableControl options={props.tableHeader} columnsNames={columnsNames} find={props.find} columnName={props.columnName} searchText={props.searchText}/>

            <Table selects={props.selects} setSelectOptions={props.setSelectOptions} columnsNames={columnsNames} tableHeader={props.tableHeader} columnsNamesInDB={columnsNamesInDB} table={props.table} setEditMode={props.setEditMode} editMode={props.editMode} delete={props.delete} editField={props.editField} editEntity={props.editEntity}/>
            
            </>}
        
        
      </div>
    )
}

export default Content;