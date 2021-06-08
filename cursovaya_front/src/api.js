import * as axios from "axios";

const instance = axios.create({
    // withCredentials: true,
    baseURL: 'http://localhost:3001/',
});

export const tablesAPI = {
    getTable() {
        return instance.get()
            .then(response => {
                debugger
                return response.data;
            });
    },
    deleteEntityFromDb(Id, Priznaki_Konstrukcii)  {
        return instance.delete(`?Id=${Id}&tableName=${Priznaki_Konstrukcii}`)
            .then(response => {
                if (response.status !== 200) return { success: false};
                return { success: true}; 
            });
    }
}