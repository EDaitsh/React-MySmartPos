import {FC} from 'react'


import './promotion.styles.scss'
import { Promotion as PromotionType } from '../../store/cart/cart.types';
type PromotionProps = {
    promotion: PromotionType
}


export const Promotion: FC<PromotionProps> = ({promotion}) => {
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