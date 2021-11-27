import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';

export default function Question_4(){

    const history = useHistory();
    const location = useLocation();
    const [percent,setPercent]= useState(54);

    const [check,setCheck] = useState(()=> JSON.parse(window.localStorage.getItem("check")) || {
        B16: "",
        B17: "",
        B18: "",
        B19: "",
        B20: ""
    });
    
    const handleChange = e => {
        setCheck({
            ...check,
            [e.target.name] : e.target.value
        })
        setPercent(Math.round((e.target.className/28)*100))
    }

    const [result,setResult]= useState([]);
    const questionList = async() =>{
            const res = await axios.get('https://www.career.go.kr/inspct/openapi/test/questions?apikey=73587f95ef371322626bf3a537e9eb3b&q=6')
            try{
                setResult(res.data.RESULT.splice(15,20))
            } catch(error){
                console.log(error);
            }
    }
    useEffect(()=>{
        window.localStorage.setItem("check", JSON.stringify(check));
        questionList()
        console.log(location.state);
        console.log(result[0]?.answer02)
    }, [check])

    function handleSubmit(e){
        e.preventDefault();
        if(check.B16 ==='' || check.B17 ==='' || check.B18 ==='' || check.B19 ==='' || check.B20 ===''){
            alert('모든 항목을 체크해주세요.')
        }
        else{
            history.push({
                pathname : '/test5',
                state: {...location.state, ...check},
            })
            window.location.href ='/test5'
        }
    }

    return(
        <div class="container">
            <div class="question">
                <div class="progress" style={{height: '25px'}}>
                    <div class="progress-bar bg-info progress-bar-striped progress-bar-animated" style={{width: `${percent}%`}}>{percent}%</div>
                </div>
                <br/>
                <p>Q16.{result[0]?.question}</p>
                <label class="btn btn-outline-info"><input type="radio" name="B16" value='31' className='16' checked={check.B16 === result[0]?.answerScore01} onChange={handleChange}/> {result[0]?.answer01}</label> &ensp;
                <label class="btn btn-outline-info"><input type="radio" name="B16" value='32' className='16' checked={check.B16 === result[0]?.answerScore02} onChange={handleChange}/> {result[0]?.answer02}</label> &ensp;
                <br/><br/>
                <p>Q17.{result[0]?.question}</p>
                <label class="btn btn-outline-info"><input type="radio" name="B17" value='33' className='17' checked={check.B17 === result[1]?.answerScore01} onChange={handleChange}/> {result[1]?.answer01}</label> &ensp;
                <label class="btn btn-outline-info"><input type="radio" name="B17" value='34' className='17' checked={check.B17 === result[1]?.answerScore02} onChange={handleChange}/> {result[1]?.answer02}</label> &ensp;
                <br/><br/>
                <p>Q18.{result[0]?.question}</p>
                <label class="btn btn-outline-info"><input type="radio" name="B18" value='35' className='18' checked={check.B18 === result[2]?.answerScore01} onChange={handleChange}/> {result[2]?.answer01}</label> &ensp;
                <label class="btn btn-outline-info"><input type="radio" name="B18" value='36' className='18' checked={check.B18 === result[2]?.answerScore02} onChange={handleChange}/> {result[2]?.answer02}</label> &ensp;
                <br/><br/>
                <p>Q19.{result[0]?.question}</p>
                <label class="btn btn-outline-info"><input type="radio" name="B19" value='37' className='19' checked={check.B19 === result[3]?.answerScore01} onChange={handleChange}/> {result[3]?.answer01}</label> &ensp;
                <label class="btn btn-outline-info"><input type="radio" name="B19" value='38' className='19' checked={check.B19 === result[3]?.answerScore02} onChange={handleChange}/> {result[3]?.answer02}</label> &ensp;
                <br/><br/>
                <p>Q20.{result[0]?.question}</p>
                <label class="btn btn-outline-info"><input type="radio" name="B20" value='39' className='20' checked={check.B20 === result[4]?.answerScore01} onChange={handleChange}/> {result[4]?.answer01}</label> &ensp;
                <label class="btn btn-outline-info"><input type="radio" name="B20" value='40' className='20' checked={check.B20 === result[4]?.answerScore02} onChange={handleChange}/> {result[4]?.answer02}</label> &ensp;
            </div>
            <br/><br/>
            <Link to='/test3'><button type="submit" class="btn btn-outline-primary">이전</button></Link> &ensp;
            <button type="submit" class="btn btn-outline-primary" onClick={handleSubmit}>다음</button>
        </div>

    )
}