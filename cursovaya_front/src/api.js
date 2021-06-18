import * as axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:3001/',
});

export const tablesAPI = {
    getTable(location, tableName, text) {

        if(typeof(text) == 'object') {
            return instance.get(`?table=${location}`).then(response => {
                return response.data;
            });
        } else {
            return instance.get(`?table=${location}&${(tableName + '=' + text)}`).then(response => {
                return response.data;
            });
        }
       

    },
    deleteEntityFromDb(Id, Priznaki_Konstrukcii)  {
        return instance.delete(`?Id=${Id}&tableName=${Priznaki_Konstrukcii}`)
            .then(response => {
                if (response.status !== 200) return { success: false};
                return { success: true}; 
            });
    },


    editEntityInDb(location, Id, field, value)  {
        return instance.put(`?table=${location}&${field}=${value.replace(' ', '%20')}&Id=${Id}`)
            .then(response => {
                if (response.status !== 200) return { success: false};
                return { success: true}; 
            });
    },


    getSelect(table, field)  {
        return instance.get(`select?table=${table}&field=${field}`)
            .then(response => {
                return response.data;
            });
    }
}