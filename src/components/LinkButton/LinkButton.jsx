/* eslint-disable react/jsx-closing-tag-location */
import styles from './styles.module.css'
import { Link } from 'react-router-dom'

const LinkButton = ({ icon, label, to, disabled, ...props }) => {
  return (
    !disabled
      ? <Link
          {...props}
          className={styles.linkButton}
          to={to}
        >
        {icon && icon}
        <h5>{label}</h5>
      </Link>
      : <span
          className={styles.linkButtonDisabled}
        >
        {icon && icon}
        <h5>{label}</h5>
      </span>
  )
}

export default LinkButton
