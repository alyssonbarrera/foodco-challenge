import { memo } from "react";
import styles from "./styles.module.css";

function ButtonComponent({children, onClick, isActive, variant}) {
    return (
        <button
            className={`${isActive ? styles.button_active : ''} ${variant == 'long' ? styles.button_variant_long : styles.button}`}
            onClick={onClick}
        >
            {children}
        </button>
    )
}

export const Button = memo(ButtonComponent)