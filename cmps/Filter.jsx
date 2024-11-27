const { useEffect, useState, useRef } = React
const { Link, useNavigate } = ReactRouterDOM
import { debounce } from "../services/util.service.js"


export function Filter({ filterBy, onFilter }) {
    const [filter, setFilter] = useState(filterBy);
    const onDebounce = useRef(debounce(onFilter)).current

    const navigate = useNavigate()

    useEffect(() => {
        if (filter) {
            onDebounce(filter)
        }


    }, [filterBy, filter]);

    function handleInputChange(e) {
        const { name: field, value } = e.target;
        setFilter((prev) => ({ ...prev, [field]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        onFilter(filter);
    }

    return (
        <div className="container">

            <h1 className='font'>It's all about books</h1>
            <h3>Filter</h3>
            <form className="form-flex" onSubmit={handleSubmit}>

                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={filter.title || ''}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <input
                        type="text"
                        name="description"
                        value={filter.description || ''}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Min Price:</label>
                    <input
                        type="number"
                        name="minPrice"
                        value={filter.minPrice || ''}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Max Price:</label>
                    <input
                        type="number"
                        name="maxPrice"
                        value={filter.maxPrice || ''}
                        onChange={handleInputChange}
                    />
                </div>
                <div>

                </div>
            </form>
            <button className="btn btn-link" onClick={() => navigate('/book/add')}>Add a new Book</button>
        </div>
    );
}
