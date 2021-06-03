import Search from './Search';

import add from '../img/Add.svg';

let TableContorl = (props) => {
    return(
    <div className="table_managment"> {/* !!! */}
            <h2 className="table_managment_header">Заказы <a href=""><img src={add} alt="" /></a></h2>
            
            <Search />
    </div>
)
}

export default TableContorl;