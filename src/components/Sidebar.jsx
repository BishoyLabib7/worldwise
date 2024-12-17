import Logo from "./Logo.jsx";
import AppNav from "./AppNav.jsx";
import style from './Sidebar.module.css';
import {Outlet} from "react-router-dom";

function Sidebar() {
    return <div className={style.sidebar}>
        <Logo/>
        <AppNav/>
        <Outlet/>
        <footer className={style.footer}>
            <p className={style.copyright}>&copy; Copyright {new Date().getFullYear()} by WorlWise Inc.</p>
        </footer>
    </div>;
}

export default Sidebar;
