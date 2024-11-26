const { useEffect, useState } = React
const { Link } = ReactRouterDOM


export function Filter({ filterBy, onFilter }) {
    const [filter, setFilter] = useState(filterBy);

    useEffect(() => {
        setFilter(filterBy);
    }, [filterBy]);

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
                    <button type="submit" className="btn">Submit</button>
                </div>
            </form>
            <Link className="btn-link" to="/book/add">Add a new Book</Link>
        </div>
    );
}
