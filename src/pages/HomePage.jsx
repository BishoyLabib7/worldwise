import styles from "./Homepage.module.css";
import PageNav from "../components/PageNav";
import {useAuth} from "../contexts/FakeAuthContext.jsx";
import {Link, useNavigate} from "react-router-dom";

export default function Homepage() {
    const {isAuthenticated} = useAuth()
    const navigate = useNavigate()

    // function handleLogin() {
    //     if (isAuthenticated)
    //         navigate("/app")
    //     else navigate("/login")
    // }

    return (
        <main className={styles.homepage}>
            <PageNav/>
            <section>
                <h1>
                    You travel the world.
                    <br/>
                    WorldWise keeps track of your adventures.
                </h1>
                <h2>
                    A world map that tracks your footsteps into every city you can think
                    of. Never forget your wonderful experiences, and show your friends how
                    you have wandered the world.
                </h2>
                {/*<Button type="primary" onClick={handleLogin}></Button>*/}
                <Link to="/login" className="cta">
                    start tracking now
                </Link>
            </section>
        </main>
    );
}
