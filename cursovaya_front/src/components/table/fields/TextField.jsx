import {useState} from 'react';

let TextField = (props) => {

    let {editField, tableHeader, entity, Key} = props;

    const [count, setCount] = useState(entity[Key]);

    debugger;
        
        return((<td><input onChange={(e)=>setCount(e.target.value)} onBlur={(e)=>editField(tableHeader.path, entity.Id, Key, e.target.value)} value={count} type="text"/></td>))
      }
      
      export default TextField;