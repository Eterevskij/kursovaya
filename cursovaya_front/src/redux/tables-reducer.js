import {tablesAPI} from '../api';

const SET_TABLE = 'SET_TABLE';
const CHANGE_TABLE = 'CHANGE_TABLE';
const TOGLE_PRELOADER = 'TOGLE_PRELOADER';
const DELETE_ENTITY = 'DELETE_ENTITY';
const SET_SEARCH = 'SET_SEARCH';


const tablesInfo =  [{
    path:'zakaz',
    title:'Заказ',
    columns: {
        id: {
            nameInDB: 'Id',
            columnName: 'id'
        },
        customer:{
            nameInDB: 'Imya_Zakazchika',
            columnName: 'Заказчик'
        },
        month:{
            nameInDB: 'Nazvanie_Mesyaca',
            columnName: 'Месяц'
        },
        type:{
            nameInDB: 'Nazvanie_Tipa',
            columnName: 'Тип'
        },
        advertisingStructure:{
            nameInDB: 'Reklamnaya_Konstrukciya',
            columnName: 'Рекламная конструкция'
        },
    }
},
{
    path:'zakazchik',
    title:'Заказчик',
    columns:{
        id:{
            nameInDB: 'Id',
            columnName: 'id'
        },
        imya_Zakazchika:{
            nameInDB: 'Imya_Zakazchika',
            columnName: 'Имя'
        },
        nazvanie_kompanii:{
            nameInDB: 'Nazvanie_Companii',
            columnName: 'Компания'
        },
    }
},
{
    path:'info_o_Reklamnoj_Konstrukcii',
    title:'Информация о рекаламной конструкции',
    columns:{
        id:{
            nameInDB: 'Id',
            columnName: 'id'
        },
        storona:{
            nameInDB: 'Storona',
            columnName: 'Сторона'
        },        
        adres:{
            nameInDB: 'Adres',
            columnName: 'Адрес'
        },
    }
},

]

let initialState = {
    currentTable: {},
    table:{},
    isPreloading : true,
    searchText: '',
    columnName: 0
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

            case TOGLE_PRELOADER: 
                return {...state, isPreloading: action.value}

            case SET_SEARCH: 
                return {...state, searchText: action.text, columnName: action.column}

        default: return state;
    }
}

export const changeTable = (path) =>({ type: CHANGE_TABLE, path })
export const setTable = table => ({type: SET_TABLE, table})
export const togglePreloader = (value) =>({ type: TOGLE_PRELOADER, value})
export const deleteEntityFromTable = (id) =>({ type: DELETE_ENTITY, id})
export const setSearch = (column, text) => ({type: SET_SEARCH, column, text})

export const getTable = (path, column = null, text = null, optionNum = null) => (dispatch) => {
    debugger
    if(typeof(column) !== "null" || "object"){
        dispatch(setSearch (optionNum, text));
    } 
    dispatch(togglePreloader(true));
    tablesAPI.getTable(path, column, text).then(response => {
        dispatch(changeTable(path));
        dispatch(setTable(response));
        dispatch(togglePreloader(false));
    });
}

export const deleteEntity = (Id, Priznaki_Konstrukcii) => (dispatch) => {

    tablesAPI.deleteEntityFromDb(Id, Priznaki_Konstrukcii).then(response => {
        dispatch(deleteEntityFromTable(Id));
    });
}

export default tablesReducer;

