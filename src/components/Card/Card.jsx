import { memo } from 'react'
import styles from './styles.module.css'

function CardComponent({discount, name, image}) {
    return (
        <div className={styles.card__container}>
            <header>
                {
                    image ? (
                        <picture>
                            <source srcSet={`https://clube-static.clubegazetadopovo.com.br/${image}`} type="image/png" />
                            <img src={`https://clube-static.clubegazetadopovo.com.br/${image}`} alt="Logo do estabelecimento" />
                        </picture>
                    ) : (
                        <div></div>
                    )
                }
            </header>
            <div className={styles.card__container_info}>
                <span>{discount}% off</span>
                <p>{name}</p>
            </div>
        </div>
    )
}

export const Card = memo(CardComponent, (prevProps, nextProps) => {
    return prevProps.discount === nextProps.discount && prevProps.name === nextProps.name && prevProps.image === nextProps.image
})