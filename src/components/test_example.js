import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

export default function Test(){

    const history = useHistory();
    const location = useLocation();
    const [check,setCheck] = useState({
        checked : ""
    });

    const handleChange = e => {
        setCheck({
            [e.target.name] : e.target.value
        })
    }

    function handleSubmit(e){
        e.preventDefault();
        if(check.checked === ''){
            alert('하나를 체크하세요!')
        }
        else{
            history.push({
                pathname: '/test1',
                state: {...location.state}
            })
            window.location.href ='/test1'
        }
    }

    return(
        <div class="container">
            <h1> 검사예시 </h1>
            <br/>
            <div class="progress" style={{height: '25px'}}>
                <div class="progress-bar bg-info progress-bar-striped progress-bar-animated" style={{width: '1%'}}>1%</div>
            </div>
            <br/>
            <div class="example">            
                <p>직업과 관련된 두개의 가치 중에서 자기에게 더 중요한 가치에 표시하세요.</p>
                <p>가치의 뜻을 잘 모르겠다면 문항 아래에 있는 가치의 설명을 확인해보세요.</p>
                <div>
                    <p>두개 가치 중에 자신에게 더 중요한 가치를 선택하세요.</p><br/>
                    <label class="btn btn-outline-info"><input type="radio" name="checked" value="능력발휘" onClick={handleChange}/>능력발휘 </label> &ensp;
                    <label class="btn btn-outline-info"><input type="radio" name="checked" value="자율성" onClick={handleChange}/>자율성 </label>
                    <br/><br/>
                    <button type="submit" class="btn btn-outline-primary" onClick={handleSubmit}>검사 시작</button>
                </div>
            </div>
        </div>
    )
}