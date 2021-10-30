import styles from './styles.module.css'

const Button = ({ onClick, leftIcon, label }) => {
  return (
    <button className={styles.button} onClick={onClick}>
      {leftIcon && leftIcon}
      <h5>{label}</h5>
    </button>
  )
}

export default Button
