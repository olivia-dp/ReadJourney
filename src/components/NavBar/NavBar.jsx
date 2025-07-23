import UserAvatar from "../UserAvatar/UserAvatar";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import s from "./NavBar.module.css";
import { useState } from "react";
import Sidebar from "../SideBar/SideBar";
import useMedia from "../../hooks/useMedia";
import { useDispatch, useSelector } from 'react-redux';
import { logoutThunk } from '../../redux/auth/operations';
import clsx from 'clsx';
import { NavLink } from "react-router-dom";
import { selectUser } from "../../redux/auth/selectors";

const NavBar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { isMobile, isDesktop } = useMedia();
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const buildLinkClass = ({ isActive }) => {
      return clsx(s.link, isActive && s.active);
    };


  return (
    <header className={s.header}>
      <div className={s.logoWrapper}>
            <svg className={s.logo}>
              <use href={"/symbol.svg#icon-logo"} />
            </svg>
            {isDesktop && <p className={s.logoText}>read journey</p>}
        </div>
         {isMobile ? (
           <>
             <nav className={s.menuBox}>
                <UserAvatar/>
                <HiOutlineMenuAlt3 className={s.menu} onClick={() => setIsSidebarOpen(true)}/>
            </nav>
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} /> 
          
           </> )
: (
<>
    <div className={s.linkBox}>
                  <NavLink to="/dashboard/recommended" className={buildLinkClass}>Home</NavLink>
                  <NavLink to="/dashboard/library" className={buildLinkClass}>My library</NavLink>
    </div>
    <div className={s.btnBox}>
      {!isDesktop ? <UserAvatar/> : (<div className={s.userBlock}><UserAvatar size={40} fontSize={16}/><p className={s.user}>{user.name}</p></div>)}
                <button onClick={() => dispatch(logoutThunk())} className={s.btn}>Log Out</button>
    </div>
</>
)}
         
    </header>
  )
}

export default NavBar

