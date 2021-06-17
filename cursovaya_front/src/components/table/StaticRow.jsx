

let StaticRow = (props) => {

    debugger

    let {entity} = props

    console.log(props)
  
        return(props.columnsNamesInDB.map((name)=>{
                if(name === props.Key){
                    return <td>{entity[props.Key]}</td>
                } 
            })
        )
  }
  
  export default StaticRow;