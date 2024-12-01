
const { Link, NavLink, Outlet } = ReactRouterDOM


export function About() {
    return (
        <div className="container">
            <h1 className="font fly">welcome to our Abour page</h1>
            <section >
                <h3 className="fly">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ut soluta, recusandae ipsum cum dolore non beatae exercitationem nobis iste placeat quod delectus, iure ullam vitae nam omnis magni, sit in.</h3>
                <Link to={'/home'}><button className=" btn fly">prev page</button></Link>
                <Link to={'/book'}><button className=" btn fly">next page</button></Link>
                <Link to={'/about/team'}><button className=" btn fly">our team</button></Link>
            </section>
            <Outlet />
        </div>
    )
}