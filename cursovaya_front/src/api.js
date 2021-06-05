import * as axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:3001/',
});

export const tablesAPI = {
    getTable() {
        return instance.get()
            .then(response => {
                return response.data;
            });
    }
}