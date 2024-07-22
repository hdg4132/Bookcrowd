import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Signup.css";

const Signup = () => {
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    address: "",
    detailaddress: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [emailDuplication, setEmailDuplication] = useState(false); // 이메일 중복 확인 여부
  const [agreeToPolicy, setAgreeToPolicy] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });

    if (name === "email") {
      setEmailDuplication(false); // 이메일이 변경될 때마다 이메일 중복 확인 상태를 초기화
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        email: "*이메일 중복 확인을 해주세요.",
      }));
    }
  };

  const validate = (values) => {
    const errors = {};

    if (!values.username) {
      errors.username = "*성함을 입력해 주세요";
    }

    if (!values.email) {
      errors.email = "*이메일을 입력해 주세요.";
    } else if (!emailDuplication) {
      errors.email = "*중복된 이메일이 있습니다.";
    }

    if (!values.password) {
      errors.password = "*비밀번호를 입력해 주세요.";
    } else if (values.password.length < 6) {
      errors.password = "*비밀번호는 6자 이상이어야 합니다.";
    }

    if (!values.confirmPassword) {
      errors.confirmPassword = "*비밀번호 확인을 입력해 주세요.";
    } else if (values.confirmPassword !== values.password) {
      errors.confirmPassword = "*비밀번호가 일치하지 않습니다.";
    }

    if (!values.phoneNumber) {
      errors.phoneNumber = "*휴대폰 번호를 입력해 주세요";
    }

    if (!values.phoneNumber) {
      errors.phoneNumber = "*휴대폰 번호를 입력해 주세요";
    }

    if (!values.address) {
      errors.address = "*주소를 입력해 주세요";
    }

    if (!values.detailaddress) {
      errors.detailaddress = "*상세 주소를 입력해 주세요";
    }
    return errors;
  };

  const checkEmailDuplication = async () => {
    if (!formValues.email) {
      alert("이메일을 입력해 주세요.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8000/checkEmailDuplication`,
        { email: formValues.email }
      );
      console.log("서버 응답:", response.data);
      setEmailDuplication(response.data.success);

      // 이메일 중복 확인이 성공하면 이메일 관련 에러를 제거
      if (response.data.success) {
        setFormErrors((prevErrors) => {
          const { email, ...otherErrors } = prevErrors;
          return otherErrors;
        });
      }

      alert(response.data.message);
    } catch (error) {
      console.error("이메일 중복 확인 중 오류:", error);
      alert("이메일 중복 확인 중 오류가 발생했습니다.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate(formValues);
    setFormErrors(errors);

    if (!agreeToPolicy) {
      alert("개인정보 처리방침에 동의해 주세요.");
      return;
    }
  
    if (!agreeToTerms) {
      alert("이용약관에 동의해 주세요.");
      return;
    }  

    if (Object.keys(errors).length === 0) {
      setIsSubmit(true);
      try {
        const response = await axios.post("http://localhost:8000/signup", {
          username: formValues.username,
          password: formValues.password,
          email: formValues.email,
          address: formValues.address,
          detailaddress: formValues.detailaddress,
          phonenumber: formValues.phoneNumber,
          usertype: "personal",
        });
        console.log("서버 응답:", response.data);
        alert("회원가입이 완료되었습니다.");
        window.location.href = "/"; // 홈 페이지 또는 다른 페이지로 리디렉션
      } catch (error) {
        if (error.response) {
          console.log(
            "서버 응답 오류:",
            error.response.status,
            error.response.data
          );
          alert("서버 오류: " + error.response.data.message);
        } else if (error.request) {
          console.log("서버 응답이 없음:", error.request);
          alert("서버 응답이 없습니다.");
        } else {
          console.log("요청 설정 중 오류:", error.message);
          alert("요청 설정 중 오류가 발생했습니다.");
        }
      } finally {
        setIsSubmit(false);
      }
    }
  };

  return (
    <div>
      <div id="sub_banner">
        <div className="container_fix">
        <h2>Join</h2>
        <p>회원가입</p>
        </div>
      </div>
      <main>
        <h3>책 보관하기</h3>
        <form className="signup_form" onSubmit={handleSubmit}>
          <div className="signup_form_con">
            <label htmlFor="name">성함</label>
            <div>
              <input
                type="text"
                name="username"
                id="name"
                value={formValues.username}
                placeholder="성함"
                onChange={handleChange}
              />
              {formErrors.username && <p>{formErrors.username}</p>}
            </div>
          </div>
          <div className="signup_form_con">
            <label htmlFor="email">이메일 주소</label>
            <div className="mail_input_wrap">
              <div className="mail_input">
                <div>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formValues.email}
                    placeholder="이메일 주소"
                    onChange={handleChange}
                  />
                  {formErrors.email && <p>{formErrors.email}</p>}
                </div>
                <button
                  type="button"
                  className="btn_check"
                  onClick={checkEmailDuplication}
                >
                  중복 확인
                </button>
              </div>
            </div>
          </div>
          <div className="signup_form_con">
            <label htmlFor="password">비밀번호</label>
            <div>
              <div>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formValues.password}
                  placeholder="비밀번호"
                  onChange={handleChange}
                />
              </div>
              {formErrors.password && <p>{formErrors.password}</p>}
            </div>
            <div></div>
          </div>
          <div className="signup_form_con">
            <label htmlFor="password_check">비밀번호 확인</label>
            <div className="password_wrap">
              <input
                type="password"
                name="confirmPassword"
                value={formValues.confirmPassword}
                placeholder="비밀번호 확인"
                onChange={handleChange}
              />
              {formErrors.confirmPassword && (
                <p>{formErrors.confirmPassword}</p>
              )}
            </div>
          </div>
          <div className="signup_form_con">
            <label htmlFor="phonenumber">휴대폰 번호</label>
            <div>
              <input
                type="text"
                name="phoneNumber"
                id="phonenumber"
                value={formValues.phoneNumber}
                placeholder="휴대폰 번호"
                onChange={handleChange}
              />
              {formErrors.phoneNumber && <p>{formErrors.phoneNumber}</p>}
            </div>
          </div>
          <div className="signup_form_con">
            <label htmlFor="address">주소</label>
            <div>
              <input
                type="text"
                name="address"
                value={formValues.address}
                placeholder="주소"
                onChange={handleChange}
              />
              {formErrors.address && <p>{formErrors.address}</p>}
            </div>
          </div>
          <div className="signup_form_con">
            <label></label>
            <div>
              <input
                type="text"
                name="detailaddress"
                id="detailaddress"
                value={formValues.detailaddress}
                placeholder="상세주소"
                onChange={handleChange}
              />
              {formErrors.detailaddress && <p>{formErrors.detailaddress}</p>}
            </div>
          </div>
          <div className="signup_form_policybox">
            <p>개인정보 처리방침</p>
            <div className="policy_box">
            <textarea class="policy-box" rows="4" cols="100" wrap="hard"readonly>
[북적북적](이하 "사이트"라 함)은 개인정보 보호법에 따라 이용자의 개인정보 보호 및 권익을 보호하고 개인정보와 관련한 이용자의 고충을 원활하게 처리할 수 있도록 다음과 같은 처리방침을 두고 있습니다.

1. 개인정보의 수집 목적 및 이용 목적
- 회원 가입 및 관리: 회원 가입 의사 확인, 회원제 서비스 제공에 따른 본인 식별·인증, 회원 자격 유지·관리, 서비스 부정 이용 방지, 각종 고지·통지, 고충 처리 등
- 서비스 제공: 도서 대여 및 관련 서비스 제공, 콘텐츠 제공, 맞춤 서비스 제공, 본인 인증, 연령 인증
- 고객 상담 및 민원 처리: 민원인의 신원 확인, 민원 사항 확인, 사실 조사를 위한 연락·통지, 처리 결과 통보

2. 수집하는 개인정보의 항목
- 필수 항목: 이름, 생년월일, 성별, 로그인 ID, 비밀번호, 전화번호, 주소, 이메일, 결제 정보(신용카드 정보 등)
- 선택 항목: 관심 도서, 대여 이력, 기타 개인 맞춤형 서비스 제공을 위한 정보

3. 개인정보의 보유 및 이용 기간
- 회원 탈퇴 시까지 보유 및 이용. 단, 관계 법령에 따라 보관할 필요가 있는 경우 해당 법령에서 정한 기간 동안 보관

4. 개인정보의 제3자 제공에 관한 사항
- 사이트는 이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다. 다만, 이용자의 동의가 있거나 법령의 규정에 의거해 적법하게 제3자에게 제공할 경우는 예외로 합니다.

5. 개인정보의 파기 절차 및 방법
- 파기 절차: 이용자가 입력한 정보는 목적 달성 후 별도의 DB에 옮겨져 내부 방침 및 기타 관련 법령에 따라 일정 기간 저장된 후 파기됩니다.
- 파기 방법: 전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제하며, 종이 문서에 기록된 개인정보는 분쇄기로 분쇄하거나 소각하여 파기합니다.

6. 이용자의 권리와 그 행사 방법
- 이용자는 언제든지 등록되어 있는 자신의 개인정보를 조회하거나 수정할 수 있으며, 개인정보의 처리 정지 및 삭제를 요청할 수 있습니다.
- 권리 행사는 서면, 전화, 이메일 등을 통해 하실 수 있으며, 사이트는 이에 대해 지체 없이 조치하겠습니다.

7. 개인정보의 안전성 확보 조치
- 개인정보의 암호화, 해킹 등에 대비한 기술적 대책, 접근 통제 및 접근 권한 제한, 개인정보 취급 직원의 최소화 및 교육 등

8. 개인정보 보호책임자
- 이름: [김태형]
- 직책: 개인정보 보호책임자
- 연락처: [010-0000-0000], [qweasd123@gmail.com]

이 방침은 2024년 7월 17일부터 시행됩니다.
        </textarea>
            </div>
            <div className="checkbox-container">
             <input
              type="checkbox"
              id="agreeToPolicy"
              checked={agreeToPolicy}
              onChange={() => setAgreeToPolicy(!agreeToPolicy)}
              />
            <label htmlFor="agreeToPolicy">개인정보 처리방침에 동의합니다</label>
         </div>
            </div>
            <div className="signup_form_TermsofUse">
            <p>이용약관</p>
            <div className="TermsofUse">
            <textarea class="TermsofUse" rows="4" cols="100" wrap="hard"readonly>
            제1조(목적)
이 약관은 (주)EZEN에서 운영하는 온라인 책보관창고 및 공유도서관 서비스인 국민도서관 책꽂이 bookoob(이하 “북적북적”)에서 제공하는 인터넷 서비스(이하 “서비스”라 한다)를 이용자가 이용함에 있어, “북적북적”과 이용자의 권리의무 및 책임사항을 규정함을 목적으로 합니다.

제2조(정의)

① “북적북적”이란 보리떡광주리가 재화 또는 용역(이하 “재화등”이라 함)을 이용자에게 제공하기 위하여 컴퓨터등 정보통신설비를 이용하여 재화등을 거래할 수 있도록 설정한 가상의 영업장을 말합니다.

② “이용자”란 “북적북적”에 접속하여 이 약관에 따라 “북적북적”이 제공하는 서비스를 받는 회원 (정회원 및 준회원)및 비회원을 말합니다.

③ ‘정회원’이라 함은 “북적북적”에 개인정보를 제공하여 회원등록을 한 자로서, “북적북적”의 정보를 지속적으로 제공받으며, “북적북적”이 제공하는 서비스를 이용하기 위해 약정된 ‘회비’를 지불한 자를 말합니다. 정회원은 회비를 지불하는 금액에 따라 3단계로 나누어지며, 각 등급에 해당하는 혜택을 누리게 됩니다. 또한 “북적북적”은 제3자의 서비스 제휴관계를 통해 회비를 지불하지 않고도 '정회원'의 자격을 이용자에게 부여할 수 있습니다.

‘준회원’이라 함은 “북적북적”에 개인정보를 제공하여 회원등록을 하였으나, ‘회비’를 지불하지 않는 자를 말합니다. '준회원'은 서비스 내에서 '손님'이라는 용어로 통용됩니다.

④ ‘비회원’이라 함은 회원에 가입하지 않고 “북적북적”이 제공하는 서비스를 이용하는 자를 말합니다.

⑤ ‘회비’란, “북적북적”을 이용하기 위해 이용자가 자신의 책을 “북적북적”의 보관공간에 맡기고, 그에 대한 보관료로 지불하는 비용을 말합니다.

⑥ ‘부코비앙’이란, “북적북적”이 이용자에게 보다 향상된 서비스를 제공하고자 함께하는 서비스 파트너로서, 이용자가 거주하는 지역을 중심으로 배달 업무 외 기타 업무를 담당하는 자를 말합니다.


제3조 (약관등의 명시와 설명 및 개정)

① “북적북적”은 이 약관의 내용과 상호 및 대표자 성명, 영업소 소재지 주소(소비자의 불만을 처리할 수 있는 곳의 주소를 포함), 전화번호, 모사전송번호, 전자우편주소, 사업자등록번호, 통신판매업신고번호, 개인정보관리책임자등을 이용자가 쉽게 알 수 있도록 “북적북적”의 초기화면에 게시합니다. 다만, 약관의 내용은 이용자가 연결화면을 통하여 볼 수 있도록 할 수 있습니다.

② “북적북적”은 이용자가 약관에 동의하기에 앞서 약관에 정하여져 있는 내용 중 청약철회,배송책임,환불조건 등과 같은 중요한 내용을 이용자가 이해할 수 있도록 별도의 연결화면 또는 팝업화면 등을 제공하여 이용자의 확인을 구하여야 합니다.

③ “북적북적”은 전자상거래등에서의소비자보호에관한법률, 약관의규제에관한법률, 전자거래기본법, 전자서명법, 정보통신망이용촉진등에관한법률, 방문판매등에관한법률, 소비자보호법 등 관련법을 위배하지 않는 범위에서 이 약관을 개정할 수 있습니다.

④ “북적북적”이 약관을 개정할 경우에는 적용일자 및 개정사유를 명시하여 현행약관과 함께 북적북적의 초기화면에 그 적용일자 7일이전부터 적용일자 전일까지 공지합니다.

다만, 이용자에게 불리하게 약관내용을 변경하는 경우에는 최소한 30일 이상의 사전 유예기간을 두고 공지합니다. 이 경우 "북적북적“은 개정전 내용과 개정후 내용을 명확하게 비교하여 이용자가 알기 쉽도록 표시합니다. 

⑤ “북적북적”이 약관을 개정할 경우에는 그 개정약관은 그 적용일자 이후에 체결되는 계약에만 적용되고 그 이전에 이미 체결된 계약에 대해서는 개정전의 약관조항이 그대로 적용됩니다. 다만 이미 계약을 체결한 이용자가 개정약관 조항의 적용을 받기를 원하는 뜻을 제3항에 의한 개정약관의 공지기간내에 “북적북적”에 송신하여 “북적북적”의 동의를 받은 경우에는 개정약관 조항이 적용됩니다.

⑥ 이 약관에서 정하지 아니한 사항과 이 약관의 해석에 관하여는 전자상거래등에서의소비자보호에관한법률, 약관의규제등에관한법률, 공정거래위원회가 정하는 전자상거래등에서의소비자보호지침 및 관계법령 또는 상관례에 따릅니다.


제4조(서비스의 제공 및 변경)

① “북적북적”은 다음과 같은 업무를 수행합니다.

1. 재화 또는 용역에 대한 정보 제공 및 보관 및 대여계약의 체결

2. 대여계약이 체결된 재화 또는 용역의 배송

3. 기타 “북적북적”이 정하는 업무

② “북적북적”은 재화 또는 용역의 품절 또는 기술적 사양의 변경 등의 경우에는 장차 체결되는 계약에 의해 제공할 재화 또는 용역의 내용을 변경할 수 있습니다. 이 경우에는 변경된 재화 또는 용역의 내용 및 제공일자를 명시하여 현재의 재화 또는 용역의 내용을 게시한 곳에 즉시 공지합니다.

③ “북적북적”이 제공하기로 이용자와 계약을 체결한 서비스의 내용을 재화등의 품절 또는 기술적 사양의 변경 등의 사유로 변경할 경우에는 그 사유를 이용자에게 통지 가능한 주소로 즉시 통지합니다.

④ 전항의 경우 “북적북적”은 이로 인하여 이용자가 입은 손해를 배상합니다. 다만, “북적북적”이 고의 또는 과실이 없음을 입증하는 경우에는 그러하지 아니합니다.


제5조(서비스의 중단)

① “북적북적”은 컴퓨터 등 정보통신설비의 보수점검교체 및 고장, 통신의 두절 등의 사유가 발생한 경우에는 서비스의 제공을 일시적으로 중단할 수 있습니다.

② “북적북적”은 제1항의 사유로 서비스의 제공이 일시적으로 중단됨으로 인하여 이용자 또는 제3자가 입은 손해에 대하여 배상합니다. 단, “북적북적”이 고의 또는 과실이 없음을 입증하는 경우에는 그러하지 아니합니다.

③ 사업종목의 전환, 사업의 포기, 업체간의 통합 등의 이유로 서비스를 제공할 수 없게 되는 경우에는 “북적북적”은 제8조에 정한 방법으로 이용자에게 통지하고 당초 “북적북적”에서 제시한 조건에 따라 소비자에게 보상합니다. 다만, “북적북적”이 보상기준 등을 고지하지 아니한 경우에는 이용자들의 마일리지 또는 적립금 등을 “북적북적”에서 통용되는 통화가치에 상응하는 현물 또는 현금으로 이용자에게 지급합니다. 또한, 이용자가 “북적북적”에 맡긴 도서에 대해 회송받고자 하는 경우, 이용자의 요금부담으로 15권 단위로 5000원의 택배비를 입금받은 후 발송하게 됩니다.


제6조(회원가입)

① 이용자는 “북적북적”이 정한 가입 양식에 따라 회원정보를 기입한 후 이 약관에 동의한다는 의사표시를 함으로서 회원가입을 신청합니다.

② “북적북적”은 제1항과 같이 회원으로 가입할 것을 신청한 이용자 중 다음 각호에 해당하지 않는 한 회원으로 등록합니다.

1. 가입신청자가 이 약관 제7조 제3항에 의하여 이전에 회원자격을 상실한 적이 있는 경우, 다만 제7조 제3항에 의한 회원자격 상실후 3년이 경과한 자로서 “북적북적”의 회원재가입 승낙을 얻은 경우에는 예외로 한다.

2. 등록 내용에 허위, 기재누락, 오기가 있는 경우

3. 기타 회원으로 등록하는 것이 “북적북적”의 기술상 현저히 지장이 있다고 판단되는 경우

③ 회원가입계약의 성립시기는 “북적북적”의 승낙이 회원에게 도달한 시점으로 합니다.

④ 회원은 제15조제1항에 의한 등록사항에 변경이 있는 경우, 즉시 전자우편 기타 방법으로 “북적북적”에 대하여 그 변경사항을 알려야 합니다.


제7조(회원 탈퇴 및 자격 상실 등)

① 회원은 “북적북적”에 언제든지 탈퇴를 요청할 수 있으며 제7조 제2항에 속하지 않는 경우, “북적북적”은 즉시 회원탈퇴를 처리합니다.

② 회원이 다음 각호의 사유에 해당하는 경우, “북적북적”은 회원자격을 제한 및 정지시킬 수 있습니다. 또한 탈퇴요청의 시기를 연기할 수 있습니다.

1. 가입 신청시에 허위 내용을 등록한 경우

2. “북적북적”의 이용을 위해 지불해야만 하는 대금, 기타 “북적북적”이용에 관련하여 회원이 부담하는 채무를 기일에 지급하지 않는 경우

3. “북적북적”을 통해 대여한 도서를 모두 반환하지 않은 경우

4. “북적북적”을 통해 대여한 도서를 손상시켰을 때 적절한 변상이 이뤄지지 않은 경우

5. “북적북적”을 통해 대여한 도서의 분실에 대한 적절한 변상이 이뤄지지 않은 경우

6. 다른 사람의 “북적북적” 이용을 방해하거나 그 정보를 도용하는 등 전자상거래 질서를 위협하는 경우

7. “북적북적”을 이용하여 법령 또는 이 약관이 금지하거나 공서양속에 반하는 행위를 하는 경우

③ “북적북적”이 회원 자격을 제한정지 시킨 후, 동일한 행위가 2회 이상 반복되거나 30일이내에 그 사유가 시정되지 아니하는 경우 “북적북적”은 회원자격을 상실시킬 수 있습니다.

④ “북적북적”이 회원자격을 상실시키는 경우에는 회원등록을 말소합니다. 이 경우 회원에게 이를 통지하고, 회원등록 말소전에 최소한 30일 이상의 기간을 정하여 소명할 기회를 부여합니다.


제8조(회원에 대한 통지)

① “북적북적”이 회원에 대한 통지를 하는 경우, 회원이 “북적북적”과 미리 약정하여 지정한 전자우편 주소로 할 수 있습니다.

② “북적북적”은 불특정다수 회원에 대한 통지의 경우 1주일이상 “북적북적” 공지사항 게시판에 게시함으로서 개별 통지에 갈음할 수 있습니다. 다만, 회원 본인의 거래와 관련하여 중대한 영향을 미치는 사항에 대하여는 개별통지를 합니다.


제9조(이용신청)

“북적북적”이용자는 “북적북적”상에서 다음 또는 이와 유사한 방법에 의하여 서비스 구매 및 이용(대여)를 신청하며, “북적북적”은 이용자가 그와 같은 신청을 함에 있어서 다음의 각 내용을 알기 쉽게 제공하여야 합니다. 단, 회원인 경우 제2호 내지 제4호의 적용을 제외할 수 있습니다.

1. 재화등의 검색 및 선택

2. 성명, 주소, 전화번호, 전자우편주소(또는 이동전화번호) 등의 입력

3. 약관내용, 청약철회권이 제한되는 서비스, 배송료, 설치비 등의 비용부담과 관련한 내용에 대한 확인

4. 이 약관에 동의하고 위 3호의 사항을 확인하거나 거부하는 표시(예, 마우스 클릭)

5. 재화등의 구매,대여신청 및 이에 관한 확인 또는 “북적북적”의 확인에 대한 동의

6. 결제방법의 선택


제10조 (계약의 성립)

① “북적북적”은 제9조와 같은 서비스 구매 및 이용신청에 대하여 다음 각호에 해당하면 승낙하지 않을 수 있습니다. 

1. 신청 내용에 허위, 기재누락, 오기가 있는 경우

2. 미성년자가 담배, 주류 등 청소년보호법에서 금지하는 재화 및 용역을 구매하는 경우

3. 기타 구매신청에 승낙하는 것이 “북적북적” 기술상 현저히 지장이 있다고 판단하는 경우

② “북적북적”의 승낙이 제12조제1항의 수신확인통지형태로 이용자에게 도달한 시점에 계약이 성립한 것으로 봅니다.

③ “북적북적”의 승낙의 의사표시에는 이용자의 구매 신청에 대한 확인 및 판매가능 여부, 구매신청의 정정 취소등에 관한 정보 등을 포함하여야 합니다.


제11조(지급방법)

“북적북적”에서 구매한 재화 또는 용역에 대한 대금지급방법은 다음 각호의 방법 중 가용한 방법으로 할 수 있습니다. 단, “북적북적”은 이용자의 지급방법에 대하여 재화 등의 대금에 어떠한 명목의 수수료도 추가하여 징수할 수 없습니다.

1. 폰뱅킹, 인터넷뱅킹, 메일 뱅킹 등의 각종 계좌이체

2. 선불카드, 직불카드, 신용카드 등의 각종 카드 결제

3. 온라인무통장입금

4. 전자화폐에 의한 결제

5. 수령시 대금지급

6. 마일리지 등 “북적북적”이 지급한 포인트에 의한 결제

7. “북적북적”과 계약을 맺었거나 “북적북적”이 인정한 상품권에 의한 결제 

8. 기타 전자적 지급 방법에 의한 대금 지급 등
            </textarea>
          </div>
          <div className="checkbox-container">
           <input
            type="checkbox"
            id="agreeToTerms"
            checked={agreeToTerms}
            onChange={() => setAgreeToTerms(!agreeToTerms)}
           />
          <label htmlFor="agreeToTerms">이용약관에 동의합니다</label>
        </div>
          </div>
          <div id="btn_signup">
            <Link to="/login" type="reset" className="btn_back">
              뒤로가기
            </Link>
            <button type="submit" className="btn_signup" disabled={isSubmit}>
              회원가입
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Signup;
