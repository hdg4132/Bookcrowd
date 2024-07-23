import React from "react";
import SubBanner from "../../component/SubBanner";
import "./CommunityDetail.css";

export default function CommunityDetail() {
  return (
    <div>
      <SubBanner
        page_name={"checkout"}
        title_en={"Community"}
        title_kr={"커뮤니티"}
        search
      />
      <div>
        <div class="container_fix">
          <div>
            <h5>게시글 타이틀이 노출됩니다.</h5>
          </div>
          <div>게시글 내용이 노출됩니다.</div>
          <div>
            <div>
              <p>댓글</p>
            </div>
            <ul>
              <li>
                <div>
                  <p>댓글 작성자명</p>
                </div>
                <div>댓글 내용이 노출됩니다.</div>
              </li>
            </ul>
          </div>
          <div>
            <form>
              <div>
                <p>댓글 작성자명</p>
              </div>
              <textarea name="" id=""></textarea>
              <button>글쓰기</button>
            </form>
          </div>
        </div>
      </div>
      <div>
        <div class="container_fix">
          <div>
            <button>목록</button>
            <button>글쓰기</button>
          </div>
        </div>
      </div>
    </div>
  );
}
