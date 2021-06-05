import {tablesAPI} from '../api';

const SET_TABLE = 'SET_TABLE';
const CHANGE_TABLE = 'CHANGE_TABLE';
const TOGLE_PRELOADER = 'TOGLE_PRELOADER';


const tablesInfo =  [{
    path:'/zakaz',
    title:'Заказ',
    columns: {
        id: {
            nameInDB: 'Id_Zakaza',
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
    path:'/zakazchik',
    title:'Заказчик',
    columns:{
        id:{
            nameInDB: 'id_zakazchika',
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
}]

let initialState = {
    currentTable: {},
    table:{},
    isPreloading : true
}

const tablesReducer = (state = initialState, action) => {
    debugger;

    switch(action.type) {
        case CHANGE_TABLE: if(tablesInfo.some((table) => {

            return table.path === action.path;}))
                return {...state, currentTable: tablesInfo.find((table)=>{
                    return table.path === action.path;
                })}

            case SET_TABLE: 
                return {...state, table:action.table}
                
            case TOGLE_PRELOADER: 
                return {...state, isPreloading: action.value}

        default: return state;
    }
}

export const changeTable = (path) =>({ type: CHANGE_TABLE, path })
export const setTable = table => ({type: SET_TABLE, table})
export const togglePreloader = (value) =>({ type: TOGLE_PRELOADER, value})

export const getTable = (path) => (dispatch) => {
    dispatch(togglePreloader(true));
    tablesAPI.getTable().then(response => {
    
        dispatch(changeTable(path));
        dispatch(setTable(response));
        dispatch(togglePreloader(false));
    });
}

export default tablesReducer;

