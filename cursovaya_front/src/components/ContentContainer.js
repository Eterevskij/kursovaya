import Content from "./Content";
import {connect} from "react-redux";
import {deleteEntity, getTable, editField, setEditMode, setSelectOptions} from '../redux/tables-reducer';


let mapStateToProps = (state) => {

    return {
        isPreloading: state.tables.isPreloading,
        tableHeader: state.tables.currentTable,
        table: state.tables.table,
        searchText: state.tables.searchText,
        columnName: state.tables.columnName,
        editMode: state.tables.editMode,
        editEntity: state.tables.editEntity,
        selects: state.tables.selects
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        delete: (id, tableName) => {
            dispatch(deleteEntity(id, tableName))
        },
        find: (location, tableName, text, optionNum) => {
            dispatch(getTable(location, tableName, text, optionNum))
        },
        editField: (location, Id, field, value) => {
            dispatch(editField(location, Id, field, value))
        },
        setEditMode: (value, Id) => {
            dispatch(setEditMode(value, Id))
        },
        setSelectOptions: (table, field) => {
            dispatch(setSelectOptions(table, field))
        }
    }
}

const ContentContainer = connect(mapStateToProps, mapDispatchToProps)(Content);

export default ContentContainer;