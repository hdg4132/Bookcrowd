import './AdmLayout.css'

const AdmLayout=()=>{
    return(
        <div className="AdmLayout">
            <div className="adm_side">
                <h2 className="adm_title">북적북적<span>ADMIN</span></h2>
                <ul className="adm_nav">
                    <li><a href="">회원관리</a></li>
                    <li><a href="">1:1 채팅관리</a></li>
                    <li><a href="">책 보관 관리</a></li>
                    <li><a href="">책 대여 관리</a></li>
                    <li></li>
                </ul>
            </div>
            <div className="adm_header adm_con">
                <a href="/" className="btn btn_home">홈페이지로 가기</a>
            </div>
        </div>
    )

}

export default AdmLayout;