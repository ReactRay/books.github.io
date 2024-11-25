const { useState, useEffect } = React
const { NavLink } = ReactRouterDOM


export function Home() {
    return (
        <section className="container">
            <h1>Welcome to our website</h1>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Praesentium officiis in eveniet eius, nisi atque.</p>

            <div className="home-flex">

                <div className="home-box">
                    <NavLink className='nav' to={'/about'}>

                        <h2>About</h2>
                        <img src='https://images.pexels.com/photos/904616/pexels-photo-904616.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt="https://images.pexels.com/photos/904616/pexels-photo-904616.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
                    </NavLink>



                </div>
                <div className="home-box">
                    <NavLink className='nav' to={'/book'}>
                        <h2>Books</h2>
                        <img src='https://images.pexels.com/photos/2465877/pexels-photo-2465877.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt="https://images.pexels.com/photos/2465877/pexels-photo-2465877.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />

                    </NavLink>
                </div>
            </div>
        </section>
    )
}

