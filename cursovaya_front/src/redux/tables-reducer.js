import {tablesAPI} from '../api';

const SET_TABLE = 'SET_TABLE';
const CHANGE_TABLE = 'CHANGE_TABLE';
const TOGLE_PRELOADER = 'TOGLE_PRELOADER';
const DELETE_ENTITY = 'DELETE_ENTITY';
const SET_SEARCH = 'SET_SEARCH';
const EDIT_FIELD = 'EDIT_FIELD'
const SET_EDIT_MODE = 'SET_EDIT_MODE'
const SET_EDIT_ENTITY = 'SET_EDIT_ENTITY'
const SET_SELECT = 'SET_SELECT'

const tablesInfo =  [{
    path:'zakaz',
    title:'Заказ',
    columns: {
        id: {
            nameInDB: 'Id',
            columnName: 'id',
            editType: 'no'
        },
        customer:{
            nameInDB: 'Imya_Zakazchika',
            columnName: 'Заказчик',
            editType: 'select'
        },
        month:{
            nameInDB: 'Nazvanie_Mesyaca',
            columnName: 'Месяц',
            editType: 'select'
        },
        type:{
            nameInDB: 'Nazvanie_Tipa',
            columnName: 'Тип',
            editType: 'select'
        },
        advertisingStructure:{
            nameInDB: 'Reklamnaya_Konstrukciya',
            columnName: 'Рекламная конструкция',
            editType: 'select'
        },
    }
},
{
    path:'zakazchik',
    title:'Заказчик',
    columns:{
        id:{
            nameInDB: 'Id',
            columnName: 'id',
            editType: 'no'
        },
        imya_Zakazchika:{
            nameInDB: 'Imya_Zakazchika',
            columnName: 'Имя',
            editType: 'text'
        },
        nazvanie_kompanii:{
            nameInDB: 'Nazvanie_Companii',
            columnName: 'Компания',
            editType: 'text'
        },
    }
},
{
    path:'info_o_Reklamnoj_Konstrukcii',
    title:'Информация о рекаламной конструкции',
    columns:{
        id:{
            nameInDB: 'Id',
            columnName: 'id',
            editType: 'no'
        },
        storona:{
            nameInDB: 'Storona',
            columnName: 'Сторона',
            editType: 'select'
        },        
        adres:{
            nameInDB: 'Adres',
            columnName: 'Адрес',
            editType: 'text'
        },
        cena:{
            nameInDB: 'Cena',
            columnName: 'Цена',
            editType: 'text'
        },
    }
},

]

let initialState = {
    currentTable: {},
    table:{},
    isPreloading : true,
    searchText: '',
    columnName: 0,
    editMode: false,
    editEntity: 0,
    selects: {}
}

const tablesReducer = (state = initialState, action) => {
    switch(action.type) {
        case CHANGE_TABLE: if(tablesInfo.some((table) => {

            return table.path === action.path;}))
                return {...state, currentTable: tablesInfo.find((table)=>{
                    return table.path === action.path;
                })}

            case SET_TABLE: 
                return {...state, table:action.table}
                
            case DELETE_ENTITY: 
                return {...state, table: state.table.filter((entity)=>{
                    return entity.Id !== action.id;
                })}

            case EDIT_FIELD: 
                return {...state, table: state.table.map((entity)=>{
                    if(entity.Id === action.id) {
                        return {...state, table: state.table}
                    } else {
                        return {...state, table: state.table}
                    }

                })}

            case TOGLE_PRELOADER: 
                return {...state, isPreloading: action.value}
            
            case SET_EDIT_MODE : {
                return{...state, editMode: action.value, editEntity: action.Id}
            }

            case SET_EDIT_ENTITY : {
                return{...state, editEntity: action.Id}
            }

            case SET_SEARCH: 
                return {...state, searchText: action.text, columnName: action.column}

            case SET_SELECT: 
            return {
                ...state,
                selects: {...state.selects, [action.field]: action.options}
            };

        default: return state;
    }
}

export const changeTable = (path) =>({ type: CHANGE_TABLE, path })
export const setTable = table => ({type: SET_TABLE, table})
export const setEditMode = (value, Id, location) => ({type: SET_EDIT_MODE, value, Id, location})
export const togglePreloader = (value) =>({ type: TOGLE_PRELOADER, value})
export const deleteEntityFromTable = (id) =>({ type: DELETE_ENTITY, id})
export const editFieldInDb = (id, field, value) =>({ type: EDIT_FIELD, id, field, value})
export const setSearch = (column, text) => ({type: SET_SEARCH, column, text})
export const setEditEntity = Id => ({type: SET_EDIT_ENTITY, Id})
export const setSelect = (field, options) => ({type: SET_SELECT, field, options})

export const getTable = (path, column = null, text = null, optionNum = null) => (dispatch) => {

    if(typeof(column) !== "null" || "object"){
        dispatch(setSearch (optionNum, text));
    } 

    dispatch(togglePreloader(true));
    tablesAPI.getTable(path, column, text).then(response => {
        
        dispatch(changeTable(path));
        dispatch(setTable(response));

        for (let table in tablesInfo) {
            if(tablesInfo[table].path === path) {
                let columns = tablesInfo[table].columns;
                for(let i in columns ) {
                    if(columns[i].editType === 'select') {
                        dispatch(setSelectOptions(path, columns[i].nameInDB));
                    }
                }
            }
        } 
 
        dispatch(togglePreloader(false));
    });
}

export const deleteEntity = (Id, Priznaki_Konstrukcii) => (dispatch) => {

    tablesAPI.deleteEntityFromDb(Id, Priznaki_Konstrukcii).then(response => {
        dispatch(deleteEntityFromTable(Id));
    });
}

export const setSelectOptions = (table, field) => (dispatch) => {

    tablesAPI.getSelect(table, field).then(response => {
        dispatch(setSelect(field,  response ));
    });
}

export const editField = (location, Id, field, value) => (dispatch) => {
    dispatch(setEditEntity(Id));
    dispatch(setEditMode(true));
    tablesAPI.editEntityInDb(location, Id, field, value).then(response => {
        dispatch(editFieldInDb(Id, field, value));
        dispatch(setEditMode(false));
    });
}

export default tablesReducer;

