const CheckoutItem =()=>{
    return(
        <li>
            <a href="rent/11">
                <div className='list_img'>
                    <img src="" />
                </div>
                <div className='list_con'>
                    <h4 className='con_title'>책 제목이 노출됩니다.</h4>
                    <ul className="con_info">
                        <li>저자: ㅇㅇㅇ</li>
                        <li>출판사: ㅇㅇㅇ</li>
                    </ul>
                    <p className='con_con'>게시글에 대한 내용이 2-3줄 정도 노출됩니다.</p>
                </div>
            </a>
        </li>
    )
}

export default CheckoutItem;