import TableControl from './TableControl';
import EnteryActions from './EnteryActions';
import Preloader from '../img/Preloader.gif';


let Content = (props) => {

    let columnsNames = [];
    let columnsNamesInDB = [];
    

    let isLoaded = !Object.keys(props.tableHeader).length == 0;

    if(isLoaded){

        columnsNames = Object.keys(props.tableHeader.columns).map((Key,i)=>{
            return (
                props.tableHeader.columns[Key]
              )
          })

          columnsNamesInDB = Object.keys(props.tableHeader.columns).map((Key,i)=>{
            return (
                props.tableHeader.columns[Key].nameInDB
              )
          })
    }



    console.log(columnsNamesInDB)
    debugger;
    return(
        <div className="content">
            {props.isPreloading ? <img src={Preloader} className="preloader" alt="preloader" /> : 
            <>
            <TableControl />

            <table>
                <tbody>
                    <tr>
                        
    
                    {columnsNames.map((column)=>{
                        return(
                            <th>{column.columnName}</th>
                    )
                    })}
                    <th></th>
    
                    </tr>

                    {isLoaded && (props.table.map((entity)=>{
                        return(<tr>{Object.keys(entity).map((Key,i)=>{
                            {return columnsNamesInDB.map((name)=>{
                                if(name === Key){
                                    return <td>{entity[Key]}</td>
                                } 
                            })}
                        })}<th><EnteryActions/></th></tr>)
                    }))
                }
                    
                </tbody>
            </table></>}
        
        
      </div>
    )
}

export default Content;