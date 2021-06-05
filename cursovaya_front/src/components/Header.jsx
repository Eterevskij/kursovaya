import logo from '../img/Logo.svg';
import arrow from '../img/Arrow.svg';
import {NavLink} from "react-router-dom";
import {Redirect} from 'react-router'



const MENU_PUNKTS = [{text:'Заказы', link:"/zakaz"},{text:'Заказчик', link:"/zakazchik"},{text:'Рекламные конструкции', link:"/reklamnieKonstrukcii"}];

let Header = (props) => {

  console.log(props)

    return (

        <header className="Header">
          
        <div className="container">
          <img src={logo} alt="logo" />
          <div className="menu">

          {MENU_PUNKTS.map((punkt)=>{
            return <NavLink  to={punkt.link} className="menu_link">{punkt.text}</NavLink>
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