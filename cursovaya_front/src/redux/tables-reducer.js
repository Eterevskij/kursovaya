import {tablesAPI} from '../api';

const SET_TABLE = 'SET_TABLE';
const CHANGE_TABLE = 'CHANGE_TABLE';
const TOGLE_PRELOADER = 'TOGLE_PRELOADER';
const DELETE_ENTITY = 'DELETE_ENTITY';


const tablesInfo =  [{
    path:'/zakaz',
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

        default: return state;
    }
}

export const changeTable = (path) =>({ type: CHANGE_TABLE, path })
export const setTable = table => ({type: SET_TABLE, table})
export const togglePreloader = (value) =>({ type: TOGLE_PRELOADER, value})
export const deleteEntityFromTable = (id) =>({ type: DELETE_ENTITY, id})

export const getTable = (path) => (dispatch) => {
    dispatch(togglePreloader(true));
    tablesAPI.getTable().then(response => {
    
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

