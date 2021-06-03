import edit from '../img/Edit.svg';
import clean from '../img/Delete.svg';

import TableControl from './TableControl';

let Content = (props) => {
    return(
        <div className="content">
        
        <TableControl />

        <table>
          <tr><th>id</th><th>Заказчик</th><th>Месяц</th><th>Рекламная конструкция</th><th>Тип</th><th></th></tr>
          <tr><td>1</td><td>Авдеев Иван</td><td>Ноябрь</td><td>17</td><td>Социальная реклама</td><td> <span className='entryActions'> <a href=""><img src={edit} alt="" /></a> <a href=""><img src={clean} alt="" /></a> </span></td></tr>
          <tr><td>1</td><td>Авдеев Иван</td><td>Ноябрь</td><td>17</td><td>Социальная реклама</td><td> <span className='entryActions'> <a href=""><img src={edit} alt="" /></a> <a href=""><img src={clean} alt="" /></a> </span> </td></tr>
        </table>
      </div>
    )
}

export default Content;