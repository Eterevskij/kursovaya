import logo from '../img/Logo.svg';
import arrow from '../img/Arrow.svg';

const MENU_PUNKTS = [{text:'Заказы', link:""},{text:'Заказчик', link:""},{text:'Рекламные конструкции', link:""}];

let Header = (props) => {
    return (
        <header className="Header">
        <div className="container">
          <img src={logo} alt="logo" />
          <div className="menu">

          {MENU_PUNKTS.map((punkt)=>{
              return <a href={punkt.link} className="menu_link">{punkt.text}</a>
          })}
          
            <a href="" className="menu_link_more">
              Прочее
              <img src={arrow} className="menu_link_more_icon" alt="arrow" />

            </a>
          </div>
        </div>
      </header>
    )
}

export default Header;