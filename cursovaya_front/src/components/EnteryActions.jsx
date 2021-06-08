import edit from '../img/Edit.svg';
import clean from '../img/Delete.svg';
import { useLocation } from "react-router-dom";


let EnteryActions = (props) => {

    const location = useLocation().pathname.replace('/', '');

    return(
        <span className='entryActions'> <a href=""><img src={edit} alt="" /></a> <img onClick={()=>{props.delete(props.Id, location)}} src={clean} alt="" /> </span>
    )
}

export default EnteryActions;