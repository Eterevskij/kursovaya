import * as axios from "axios";

const instance = axios.create({
    // withCredentials: true,
    baseURL: 'http://localhost:3001/',
});

export const tablesAPI = {
    getTable(location, tableName, text) {
        debugger
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
    }
}