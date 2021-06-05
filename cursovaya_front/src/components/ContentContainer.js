import Content from "./Content";
import {connect} from "react-redux";

let mapStateToProps = (state) => {
    debugger
    return {
        isPreloading: state.tables.isPreloading,
        tableHeader: state.tables.currentTable,
        table: state.tables.table
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        sendMessage: () => {
            alert(1)
        }
    }
}

const ContentContainer = connect(mapStateToProps)(Content);

export default ContentContainer;