import edit from '../img/Edit.svg';
import clean from '../img/Delete.svg';

let EnteryActions = (props) => {
    console.log(123);
    return(
        <span className='entryActions'> <a href=""><img src={edit} alt="" /></a> <a href=""><img src={clean} alt="" /></a> </span>
    )
}

export default EnteryActions;