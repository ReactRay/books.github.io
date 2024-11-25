
const{Link,NavLink} = ReactRouterDOM


export function About(){
    return (
        <div className="container">
            <h1>welcome to our Abour page</h1>
            <section className="small-container">
                <h3>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ut soluta, recusandae ipsum cum dolore non beatae exercitationem nobis iste placeat quod delectus, iure ullam vitae nam omnis magni, sit in.</h3>
                <Link to={'/home'}><button className="btn">prev page</button></Link>
                  <Link to={'/book'}><button className="btn">next page</button></Link>
            </section>
        </div>
    )
}