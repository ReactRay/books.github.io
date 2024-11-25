
const { Link, NavLink } = ReactRouterDOM

export function AppHeader() {

    // nav bar will be here
    return (
        <header className="header-flex">
            <div><h2>Miss<span>Book </span>📔</h2></div>

            <div className="nav-flex">
                <NavLink  to="/home">Home</NavLink>
                <NavLink   to="/about">About</NavLink>
                <NavLink   to="/book" >Books</NavLink>
            </div>

          
        </header>
    )
}
