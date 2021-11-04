import { NavLink } from 'react-router-dom'
import styles from './styles.module.css'
import { MdHomeFilled, MdLibraryMusic, MdKeyboardArrowRight } from 'react-icons/md'
import { useState } from 'react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(true)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <nav className={`${isOpen ? styles.nabvarClose : null} ${styles.navbar}`}>
      <span onClick={toggleMenu} className={styles.handlerNavbar}>
        <MdKeyboardArrowRight
          size={28}
          className={`
            ${styles.arrowTrans}
            ${!isOpen ? styles.handlerNavbarClose : null}
          `}
        />
      </span>
      <ul>
        <li>
          <NavLink className={styles.anchor} activeClassName={styles.isActive} to='/'>
            <MdHomeFilled size={26} />
            <h5>
              Home
            </h5>
          </NavLink>
        </li>
        <li>
          <NavLink className={styles.anchor} activeClassName={styles.isActive} to='/about'>
            <MdLibraryMusic size={26} />
            <h5>
              Lists
            </h5>
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
