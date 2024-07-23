import { Link, Outlet } from "react-router-dom";
import Rent from "./Rent";

function Main() {
  // const user = {
  //   id: 1,
  //   name: "한만서",
  //   phone: "010-3791-1290",
  // };

  // localStorage.setItem("userInfo", JSON.stringify(user));

  // const book = {
  //   bookname: "마음을 맡기는 보관가게 2",
  //   author: "오야마 준코",
  //   publisher: "모모",
  //   date: "2024년 07월 17일",
  //   ISBN13: "9791198809964",
  //   ISBN9: "1198809965",
  //   bookimgurl: "https://image.yes24.com/goods/129085141/XL",
  // };

  // localStorage.setItem("book", JSON.stringify(book));

  const scrollDown = useRef(null);

  const clickDown = () => {
    if (scrollDown.current) {
      scrollDown.current.scrollIntoView({ behavior: "smooth" });
    }
  };



  return (
    // <div className="App">
    //   <Link to="/rent">
    //     대여로 <Outlet />
    //   </Link>
    //   <br />
    //   <Link to="/rent_admin">
    //     대여관리로 <Outlet />
    //   </Link>
    // </div>
    <div>
      <div className="main_banner">
        <div className="logo">
          <p className="main_banner_text">책 대여 보관 시스템</p>
          <img alt="logo" src={bookLogo} />
          <div className="scroll">
            <span className="scroll_down">scroll down</span>
            <div className="animation">
              <span className="arrow" onClick={clickDown}></span>
            </div>
          </div>
        </div>
      </div>
      <main>
        <div className="container_fix">
          <section className="section_1">
            <div className="content">
              <div className="text_1">
                <h3>북적북적은?</h3>
                <p>북적북적은 책을 보관하고, 대여할 수 있는 공간입니다.</p>
                <p>
                  책을 보관할 공간이 필요한 분들은 <br />
                  도서 보관하기를 통해 북적북적에 책을 보관할 수 있습니다.
                </p>
              </div>
              <div>
                <img alt="image1" src={img1} />
              </div>
            </div>
            <div className="content">
              <div className="imgage">
                <img alt="image2" src={img2} />
              </div>
              <div className="text_2">
                <h3>책 보관 · 대여 시스템</h3>
                <p>
                  책을 보고 싶은 분들은
                  <br />
                  도서 대여하기를 통해 북적북적에 있는 책을 빌릴 수 있습니다.
                </p>
                <p>
                  보관 신청 시 대여가 가능하다고 설정된 책은
                  <br />
                  다른 회원들이 빌려볼 수 있습니다.
                </p>
              </div>
            </div>
          </section>
          <section className="section_2">
            <div className="book_list">
              <div className="main_list_text">
                <h4>대여 가능한 도서</h4>
                <div>
                  <a href="/checkout">
                    <span>+ 더보기</span>
                  </a>
                </div>
              </div>
              <div className="book_list_box">
                <ul>
                  <div className="book_list_box_original">
                    <MainBookList />
                    <MainBookList />
                    <MainBookList />
                    <MainBookList />
                  </div>
                  <div className="book_list_box_clone">
                    <MainBookList />
                    <MainBookList />
                    <MainBookList />
                    <MainBookList />
                  </div>
                </ul>
              </div>
            </div>
          </section>
          <section className="section_3">
            <div className="community_list">
              <div className="main_list_text">
                <h4>커뮤니티</h4>
                <div>
                  <a href="/community">
                    <span>+ 더보기</span>
                  </a>
                </div>
              </div>
              <div className="community_content">
                <MainCommunityList />
                <MainCommunityList />
                <MainCommunityList />
                <MainCommunityList />
                <MainCommunityList />
              </div>
            </div>
          </section>
        </div>
        <section>
          <div className="bottom_banner" ref={scrollDown}>
            <div className="bottom_banner_content">
              <p className="bottom_banner_text">메인타이틀이 노출됩니다</p>
              <div>
                <a href="#">
                  <button className="bottom_banner_btn">시작하기</button>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Main;
