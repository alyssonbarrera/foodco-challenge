import styles from './styles.module.css'

export function InputSearch({ onSearch = () => {} }) {
    return (
        <input
            className={styles.inputSearch}
            type="text"
            placeholder="Pesquisar"
            onChange={(e) => onSearch(e.target.value.trim())}
        />
    );
}