
let StaticRow = (props) => {

    let {entity} = props

        return(props.columnsNamesInDB.map((name)=>{
                if(name.text === props.Key){
                    return <td>{entity[props.Key]}</td>
                } 
            })
        )
  }
  
  export default StaticRow;