import logo from '../img/Logo.svg';
import arrow from '../img/Arrow.svg';
import {NavLink} from "react-router-dom";
import {useState} from 'react'



const MENU_PUNKTS = [{text:'Заказы', link:"/zakaz"},{text:'Заказчик', link:"/zakazchik"},{text:'Рекламные конструкции', link:"/info_o_Reklamnoj_Konstrukcii"},{text:'Локация', link:"/lokacia"} ,{text:'Месяцы', link:"/mesyci"},{text:'Признаки', link:"/priznaki"}, {text:'Сторона', link:"/storona"}, {text:'Тип рекламы', link:"/tip_reklami"} ];


let Header = (props) => {

  console.log(props)
  const [isMenuOpened, setMenu] = useState(false);

    return (

        <header className="Header">
          
        <div className="container">
          <img src={logo} alt="logo" />
          <div className="menu">

          {MENU_PUNKTS.map((punkt, i)=>{
            if(i < 3)
            return <NavLink  to={punkt.link} className="menu_link">{punkt.text}</NavLink>
          })}
          
            <span className="menu_link_more" onClick={()=> setMenu(!isMenuOpened)}setMenu>
              Прочее
              <img src={arrow} className="menu_link_more_icon" alt="arrow" />

              {isMenuOpened && <div className='dropDownMenu'>

                      {MENU_PUNKTS.map((punkt, i)=>{
                   if(i >= 3)
                    return <NavLink  to={punkt.link} className="menu_link">{punkt.text}</NavLink>
                  })}

                </div>}

            </span>



          </div>
        </div>
      </header>
    )
}

export default Header;