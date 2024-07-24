import './CheckoutWrite.css'
import AdmLayout from "../component/AdmLayout";
import {useState, useEffect} from "react";

const CheckoutWrite =({})=>{
    const [input, setInput] = useState({
        title:"", author:"", date:"", public:"", page:"", price:"", storage:"", info:""
    })
    const onChangeInput = (e) => {
        const { name, value} = e.target;

        setInput({
            ...input,
            [name]: value
        });
    };
    return(
        <div className="CheckoutWrite">
            <AdmLayout/>
            <div className="adm_con write_checkout">
                <form>
                    <p>
                        <label htmlFor="title">제목</label>
                        <input onChange={onChangeInput} type="text" name="title" id="title"></input>
                    </p>
                    <p>
                        <label htmlFor="isbn">ISBN</label>
                        <input onChange={onChangeInput} type="text" name="isbn" id="isbn"></input>
                    </p>
                    <p>
                        <label htmlFor="author">저자</label>
                        <input onChange={onChangeInput} type="text" name="author" id="author"></input>
                    </p>
                    <p>
                        <label htmlFor="date">발행일</label>
                        <input onChange={onChangeInput} type="text" name="date" id="date"></input>
                    </p>
                    <p>
                        <label htmlFor="public">출판사</label>
                        <input onChange={onChangeInput} type="text" name="public" id="public"></input>
                    </p>
                    <p>
                        <label htmlFor="page">면 수</label>
                        <input onChange={onChangeInput} type="text" name="page" id="page"></input>
                    </p>
                    <p>
                        <label htmlFor="price">정가</label>
                        <input onChange={onChangeInput} type="text" name="price" id="price"></input>
                    </p>
                    <p>
                        <label htmlFor="storage">대출가능 권 수</label>
                        <input onChange={onChangeInput} type="text" name="storage" id="storage"></input>
                    </p>
                    <p>
                        <label htmlFor="info">책 소개</label>
                        <textarea onChange={onChangeInput} name="info" id="info"></textarea>
                    </p>
                    <p>
                        <label htmlFor="file">책 이미지</label>
                        <input onChange={onChangeInput} type="file" name="file" id="file"
                               accept="image/gif, image/jpeg, image/png"/>
                    </p>
                    <div className="btn_area">
                        <button type="" className="btn btn_write">
                            작성하기
                        </button>
                        <a href="" className="btn btn_cancel">
                            취소
                        </a>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CheckoutWrite;