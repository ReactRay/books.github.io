

const { useNavigate } = ReactRouterDOM
const team = [
    {
        id: 1,
        name: "Alice Johnson",
        job: "Software Engineer",
        description: "Loves debugging code with a cup of coffee and jazz music.",
        imgNum: 1,
    },
    {
        id: 2,
        name: "Bob Smith",
        job: "Project Manager",
        description: "Keeps the team on track while cracking the best (and worst) puns.",
        imgNum: 2,
    },
    {
        id: 3,
        name: "Clara Zhang",
        job: "UI/UX Designer",
        description: "Passionate about creating user-friendly designs and perfect gradients.",
        imgNum: 3,
    },
    {
        id: 4,
        name: "Dan Patel",
        job: "Data Analyst",
        description: "Finds patterns in data like a pro and can't live without his spreadsheets.",
        imgNum: 4,
    },
];

export function Team() {

    const navigate = useNavigate()

    return (
        <div>
            <button className="btn" onClick={() => navigate('/about')}>close</button>
            <div className="team-container">
                {team.map((team) => {
                    return (
                        <div className="team-box">
                            <img src={`../assets/img/office${team.imgNum}.jpg`} alt="office pic" />
                            <h2>{team.name}</h2>
                            <h3>{team.job}</h3>
                            <p>{team.description}</p>
                        </div>
                    )
                })}
            </div>

        </div>
    )
}