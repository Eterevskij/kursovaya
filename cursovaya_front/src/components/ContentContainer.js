import Content from "./Content";
import {connect} from "react-redux";
import {deleteEntity} from '../redux/tables-reducer';


let mapStateToProps = (state) => {
    return {
        isPreloading: state.tables.isPreloading,
        tableHeader: state.tables.currentTable,
        table: state.tables.table
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        delete: (id, tableName) => {
            dispatch(deleteEntity(id, tableName))
        }
    }
}

const ContentContainer = connect(mapStateToProps, mapDispatchToProps)(Content);

export default ContentContainer;