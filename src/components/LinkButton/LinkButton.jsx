/* eslint-disable react/jsx-closing-tag-location */
import styles from './styles.module.css'
import { Link } from 'react-router-dom'
import { MdOpenInNew } from 'react-icons/md'

const LinkButton = ({ iconSize = 22, label, to, disabled, ...props }) => {
  return (
    !disabled
      ? <Link
          {...props}
          className={styles.linkButton}
          to={to}
        >
        <MdOpenInNew size={iconSize} />
        {label}
      </Link>
      : <span
          className={styles.linkButtonDisabled}
        >
        <MdOpenInNew size={iconSize} />
        {label}
      </span>
  )
}

export default LinkButton
