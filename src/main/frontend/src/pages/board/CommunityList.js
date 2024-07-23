import React from "react";
import SubBanner from "../../component/SubBanner";
import "./CommunityList.css";

export default function CommunityList() {
  return (
    <div>
      <SubBanner
        page_name={"checkout"}
        title_en={"Community"}
        title_kr={"커뮤니티"}
        search
      />
      <div className="list_body">
        <div className="container_fix">
          <ul>
            <li className="list_header">
              <span className="list_title">제목</span>
              <div className="list_info">
                <span className="writer">작성자</span>
                <span className="date">게시일</span>
              </div>
            </li>
            <li className="list_header">
              <span className="list_content">게시글의 제목이 노출됩니다</span>
              <div className="list_info">
                <span className="writer">작성자</span>
                <span className="date">게시일</span>
              </div>
            </li>
            <li className="list_header">
              <span className="list_content">게시글의 제목이 노출됩니다</span>
              <div className="list_info">
                <span className="writer">작성자</span>
                <span className="date">게시일</span>
              </div>
            </li>
            <li className="list_header">
              <span className="list_content">게시글의 제목이 노출됩니다</span>
              <div className="list_info">
                <span className="writer">작성자</span>
                <span className="date">게시일</span>
              </div>
            </li>
            <li className="list_header">
              <span className="list_content">게시글의 제목이 노출됩니다</span>
              <div className="list_info">
                <span className="writer">작성자</span>
                <span className="date">게시일</span>
              </div>
            </li>
            <li className="list_header">
              <span className="list_content">게시글의 제목이 노출됩니다</span>
              <div className="list_info">
                <span className="writer">작성자</span>
                <span className="date">게시일</span>
              </div>
            </li>
          </ul>
        </div>
        <div class="community_pagination">
          <button>&laquo;</button>
          <button>&lsaquo;</button>
          <button>1</button>
          <button>2</button>
          <button>3</button>
          <button>4</button>
          <button>5</button>
          <button>6</button>
          <button>7</button>
          <button>8</button>
          <button>&rsaquo;</button>
          <button>&raquo;</button>
        </div>
      </div>
    </div>
  );
}
