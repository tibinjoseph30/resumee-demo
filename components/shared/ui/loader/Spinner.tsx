import styles from './Spinner.module.scss';

const Spinner = ({ size = 50, color = 'rgb(var(--app-primary-color))', strokeWidth = 5 }) => {

    const spinnerStyle = {
        width: `${size}px`,
        height: `${size}px`,
    };

    const pathStyle = {
        stroke: color,
        strokeWidth: `${strokeWidth}px`,
    };

    return (
        <svg className={styles.spinner} viewBox="0 0 50 50" style={spinnerStyle}>
            <circle className={styles.path} cx="25" cy="25" r="20" style={pathStyle} />
        </svg>
    )
}

export default Spinner