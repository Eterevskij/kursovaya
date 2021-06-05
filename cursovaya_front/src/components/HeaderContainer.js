import Header from "./Header";
import {connect} from "react-redux";

let mapStateToProps = (state) => {
    return {
        tables: state.tablesInfo
    }
}

const HeaderContainer = connect(mapStateToProps)(Header);

export default HeaderContainer;