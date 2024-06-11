import React, { useState } from "react";
import MemberLayout from '../../layout/MemberLayout';
import { Link, useNavigate } from 'react-router-dom';
import { RootUrl } from '../../api/RootUrl.js';
import { useDispatch } from "react-redux";
import axios from "axios";
import { login } from "../../slice/LoginSlice"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faLockOpen } from "@fortawesome/free-solid-svg-icons";


const rootURL = RootUrl();

const initState = {
    uid: "",
    pass: "",
  };

const LoginPage = () => {


    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showPswd, setShowPswd] = useState(false);
    const [loginParam, setLoginParam] = useState({ ...initState });
    const [lockState, setLockState] = useState(false);
    //const [isCheck,setIsCheck] = useState(true)
    //const [isCheck1,setIsCheck1] = useState(true);
  

    const changeHandler = (e) => {
        console.log("여기 일단 들어와?");
      //loginParam[e.target.name] = e.target.value;
      setLoginParam({ ...loginParam, [e.target.name]: e.target.value });
    };


    const changePassStatus =  (e) =>{

      e.preventDefault();

      console.log("비밀번호 상태를 바꿔보자꾸나.");

      setShowPswd((prevShowPswd) => !prevShowPswd);
      setLockState((prevLockState) => !prevLockState);

    }

   
    const submitHandler = (e) => {
      e.preventDefault();
  
      // 반드시 FormData로 생성해서 username, password로 선언해야 spring security 인증처리 됨
      const formData = new FormData();
      formData.append("username", loginParam.uid);
      formData.append("password", loginParam.pass);

  
      axios
        .post(`${rootURL}/login`,formData)//loginParam
        .then((response) => {
          console.log("here1 : " + JSON.stringify(response.data));
  
          // redux 액션 실행
          dispatch(login(response.data));
  
          // 메인 이동
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
    };



  return (
    <MemberLayout>
    <div className="memberBack loginBack">
        <div className="memberBox loginBox">
            <div>
                <img className="loginImg" src="../images/zeroPie2.png" alt=""/>
            </div>

            <form onSubmit={submitHandler}>
                <label htmlFor="">
                <input type="text" name = "uid" placeholder='아이디입력' value={loginParam.uid} onChange={changeHandler}/>
                </label>

                <label htmlFor="">
                <input type={showPswd ? "text" : "password"} name="pass" placeholder='비밀번호입력' value={loginParam.pass} onChange={changeHandler}/>
                
                {lockState ? (
                  <button type ="button" onClick={changePassStatus}><FontAwesomeIcon icon={faLockOpen} /></button>                

                ) : (
                  <button type ="button" onClick={changePassStatus}><FontAwesomeIcon icon={faLock} /></button>
                )}
                
                </label>

                <label htmlFor="myInput" className="labelSvae">
                    <input type="checkbox"/> 아이디 저장
                </label>

                <input type="submit" value="로그인" className='btnLogin'/>
            </form>

            <div>
                <Link to="#" className="socialLogin">
                    <img src="/images/googleIcon.png" alt=""/>
                    <span style={{color:"white"}}>구글 계정으로 로그인</span>
                </Link>
            </div>

            <div className="loginEtc">
                <Link to="/findId">아이디찾기</Link>
                <Link to="/findPw">비밀번호찾기</Link>
                <Link to="/terms">회원가입</Link>
            </div>
            
            <div className="loginEtc" style={{flexDirection:"column", textAlign:"center"}}>
              <p>Copyright ⓒ ZeroPie Corp. All Rights Reserved.</p>
              <p>Version : {process.env.REACT_APP_VERSION}</p>
            </div>
        </div>

    </div>
    </MemberLayout>
  )
}

export default LoginPage