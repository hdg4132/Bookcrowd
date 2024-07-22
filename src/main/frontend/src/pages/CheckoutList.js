import SubBanner from '../component/SubBanner';
import './CheckoutList.css'
import CheckoutItem from '../component/CheckoutItem'


const CheckoutList =()=>{
    return(
        <div className='checkoutList'>
            <SubBanner page_name={"checkout"} title_en={"Checkout Book"} title_kr={"책 대여하기"} search/>

            <div className='container_fix'>
                <ul className="checkout_list">
                    <CheckoutItem/>
                    <CheckoutItem/>
                    <CheckoutItem/>
                </ul>
            </div>
        </div>
    )
}

export default CheckoutList;