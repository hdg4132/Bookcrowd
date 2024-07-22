import SubBanner from "../component/SubBanner";

const CheckoutView =()=>{
    return(
        <div className="checkout_view">
            <SubBanner page_name={"checkout"} title_en={"Checkout Book"} title_kr={"책 대여하기"}/>
        </div>
    )
}

export default CheckoutView;