let Search = (props) => {
    return(
        <div className="table_managment_saerch">
            <input className="table_managment_saerch_input" type="text" placeholder='Поиск' />
            <p>по</p>
            <select className="table_managment_saerch_by">
                <option></option>
                <option>Пункт 2</option>
            </select>
        </div>
)
}

export default Search;
