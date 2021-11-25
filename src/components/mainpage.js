import React, {useState} from 'react';
import { useHistory, useLocation } from 'react-router-dom';

export default function Mainpage(){
    
    const history = useHistory();
    const location = useLocation();

    const [userid, setUserid] = useState({
        userName: "",
        userGender: ""
    });

    // const {
    //     userName, userGender
    // } = userid;

    const handleChange = e => {
        setUserid({
            ...userid,
            [e.target.name]: e.target.value
        });
    };

    function handleSubmit(e) {
        e.preventDefault();
        console.log(userid);
        if (userid.userGender === '' || userid.userName === '' ){
            alert("이름과 성별을 정확히 입력해주세요.")
        }
        else{
            history.push({
                pathname: '/start',
                state: userid
            })
            window.location.href = '/start'
        }

            
    }

    return(
        <div>
            
            <form method="get">
                <h1>직업가치관검사</h1>
                <br/><br/><br/>
                <h4>이름</h4>
                <input type="text" name = "userName" placeholder="이름" onChange={handleChange} />
                <br/><br/>
                <h4>성별</h4>
                <input type="radio" name="userGender" value="100323" onClick={handleChange}/>남자 <br/>
                <input type="radio" name="userGender" value="100324" onClick={handleChange}/>여자<br/><br/>
                
                <button type="submit" onClick={handleSubmit}>검사 시작</button>
                
            </form>
        </div>
    )
}