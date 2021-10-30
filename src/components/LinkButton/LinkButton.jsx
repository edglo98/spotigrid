import styles from './styles.module.css'
import { Link } from 'react-router-dom'

const LinkButton = ({ icon, label, to }) => {
  return (
    <Link className={styles.linkButton} to={to}>
      {icon && icon}
      <h5>{label}</h5>
    </Link>
  )
}

export default LinkButton
