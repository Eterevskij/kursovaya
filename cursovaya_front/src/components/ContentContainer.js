import Content from "./Content";
import {connect} from "react-redux";
import {deleteEntity, getTable} from '../redux/tables-reducer';


let mapStateToProps = (state) => {
    debugger
    return {
        isPreloading: state.tables.isPreloading,
        tableHeader: state.tables.currentTable,
        table: state.tables.table,
        searchText: state.tables.searchText,
        columnName: state.tables.columnName
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        delete: (id, tableName) => {
            dispatch(deleteEntity(id, tableName))
        },
        find: (location, tableName, text, optionNum) => {
            dispatch(getTable(location, tableName, text, optionNum))
        }
    }
}

const ContentContainer = connect(mapStateToProps, mapDispatchToProps)(Content);

export default ContentContainer;