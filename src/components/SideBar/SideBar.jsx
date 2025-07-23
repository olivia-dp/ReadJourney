import s from './Sidebar.module.css';
import { NavLink } from 'react-router-dom';
import { IoMdClose } from "react-icons/io";
import { useDispatch } from 'react-redux';
import { logoutThunk } from '../../redux/auth/operations';
import clsx from 'clsx';

const Sidebar = ({ isOpen, onClose }) => {
    const dispatch = useDispatch();
    
    const buildLinkClass = ({ isActive }) => {
        return clsx(s.link, isActive && s.active);
      };

  return (
    <>
      <div
        className={`${s.backdrop} ${isOpen ? s.show : ''}`}
        onClick={onClose}
      />
      <aside className={`${s.sidebar} ${isOpen ? s.open : ''}`}>
      <IoMdClose onClick={onClose} className={s.btnClose}/>
        <nav className={s.nav}>
<div className={s.linkBox}>
              <NavLink to="/dashboard/recommended" onClick={onClose} className={buildLinkClass}>Home</NavLink>
              <NavLink to="/dashboard/library" onClick={onClose} className={buildLinkClass}>My library</NavLink>
</div>
          <button onClick={() => dispatch(logoutThunk())} className={s.btn}>Log Out</button>
        </nav>
        
      </aside>
    </>
  );
};

export default Sidebar;
