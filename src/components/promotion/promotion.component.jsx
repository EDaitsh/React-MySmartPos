import './promotion.styles.scss'

export const Promotion = ({promotion}) => {
    const {amount, description} = promotion;

    return (
        <div className='promotion-container'>
            <span className='name'>{description}</span>
            <span className='space1'></span>
            <span className='space2'></span>
            <span className='amount'>{-amount}</span>
        </div>
    )
}

export default Promotion;