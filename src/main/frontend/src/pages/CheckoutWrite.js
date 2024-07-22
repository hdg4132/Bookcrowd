import './CheckoutWrite.css'
import AdmLayout from "../component/AdmLayout";

const CheckoutWrite =()=>{
    return(
        <div class="CheckoutWrite">
            <AdmLayout/>
            <div className="adm_con write_checkout">
                <form>
                    <p>
                        <label htmlFor="title">제목</label>
                        <input type="text" id="title"></input>
                    </p>
                    <p>
                        <label htmlFor="author">저자</label>
                        <input type="text" id="author"></input>
                    </p>
                    <p>
                        <label htmlFor="date">발행일</label>
                        <input type="text" id="date"></input>
                    </p>
                    <p>
                        <label htmlFor="public">출판사</label>
                        <input type="text" id="public"></input>
                    </p>
                    <p>
                        <label htmlFor="page">면 수</label>
                        <input type="text" id="page"></input>
                    </p>
                    <p>
                        <label htmlFor="price">정가</label>
                        <input type="text" id="price"></input>
                    </p>
                    <p>
                        <label htmlFor="storage">대출가능 권 수</label>
                        <input type="text" id="storage"></input>
                    </p>
                    <p>
                        <label htmlFor="info">책 소개</label>
                        <textarea id="info"></textarea>
                    </p>

                </form>
            </div>
        </div>
    )
}

export default CheckoutWrite;