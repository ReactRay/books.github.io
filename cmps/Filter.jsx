const { useEffect, useState, useRef } = React
const { useNavigate } = ReactRouterDOM
import { debounce } from "../services/util.service.js";


export function Filter({ filterBy, onFilter }) {
    const [filter, setFilter] = useState(filterBy || {});
    const onDebounce = useRef(debounce(onFilter)).current;

    const navigate = useNavigate();

    useEffect(() => {
        if (filter) {
            onDebounce(filter);
        }
    }, [filter, onDebounce]);

    function handleInputChange(e) {
        const { name: field, value } = e.target;
        setFilter((prev) => ({ ...prev, [field]: value }));
    }

    function handleCheckboxChange(e) {
        const { name, checked } = e.target;
        setFilter((prev) => ({ ...prev, [name]: checked }));
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
                    <label>Subtitle:</label>
                    <input
                        type="text"
                        name="subtitle"
                        value={filter.subtitle || ''}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Authors:</label>
                    <input
                        type="text"
                        name="authors"
                        value={filter.authors || ''}
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
                    <label>Categories:</label>
                    <input
                        type="text"
                        name="categories"
                        value={filter.categories || ''}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Page Count:</label>
                    <input
                        type="number"
                        name="pageCount"
                        value={filter.pageCount || ''}
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
                    <label>
                        On Sale:
                        <input
                            type="checkbox"
                            name="isOnSale"
                            checked={filter.isOnSale || false}
                            onChange={handleCheckboxChange}
                        />
                    </label>
                </div>
                <div>
                </div>
            </form>
            <button className="filter-btn" onClick={() => navigate('/book/bookedit')}>Add a new Book</button>
        </div>
    );
}
