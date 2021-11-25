import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
// import {useHistory} from 'react-router';
import { Link, useHistory, useLocation} from 'react-router-dom';

export default function Question_1(){

    //location으로 data를 받아줌.
    const history = useHistory();
    const location = useLocation();
    const [percent,setPercent]= useState(0);

    const [check,setCheck] = useState(()=> JSON.parse(window.localStorage.getItem("check")) || {
        B1: "",
        B2: "",
        B3: "",
        B4: "",
        B5: ""
    });

    const handleChange = e => {
        setCheck({
            ...check,
            [e.target.name] : e.target.value
        })
        setPercent(Math.round((e.target.className/28)*100))
        console.log(percent);
    }

    const [result,setResult]= useState([]);
    const questionList = async() =>{
            const res = await axios.get('https://www.career.go.kr/inspct/openapi/test/questions?apikey=73587f95ef371322626bf3a537e9eb3b&q=6')
            try{
                setResult(res.data.RESULT.splice(0,5))
        } catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{
        window.localStorage.setItem("check", JSON.stringify(check));
        questionList()
    }, [check])

        //렌더링 시에 한 번만 questionList를 실행한다.
    function handleSubmit(e){
        if(check.B1 ==='' || check.B2 ==='' || check.B3 ==='' || check.B4 ==='' || check.B5 ===''){
            alert('모든 항목을 체크해주세요.');
        }
        else{
            //test 2로 check한 데이터를 넘겨준다.
            history.push({
                pathname: '/test2',
                state: {...location.state, ...check}
            })
            window.location.href ='/test2'
        }
    }
    return(
        <div> 
            <progress max="100" value={percent} ></progress> {percent}%
            <p>Q1.{result[0]?.question}</p>
            <input type="radio" name="B1" value='1' className='1' checked={check.B1 === result[0]?.answerScore01} onChange={handleChange}/> {result[0]?.answer01}
            <input type="radio" name="B1" value='2' className='1' checked={check.B1 === result[0]?.answerScore02} onChange={handleChange}/> {result[0]?.answer02}
            <br/>
            <p>Q2.{result[0]?.question}</p>
            <input type="radio" name="B2" value='3' className='2' checked={check.B2 === result[1]?.answerScore01} onChange={handleChange}/> {result[1]?.answer01}
            <input type="radio" name="B2" value='4' className='2' checked={check.B2 === result[1]?.answerScore02} onChange={handleChange}/> {result[1]?.answer02}
            <br/>
            <p>Q3.{result[0]?.question}</p>
            <input type="radio" name="B3" value='5' className='3' checked={check.B3 === result[2]?.answerScore01} onChange={handleChange}/> {result[2]?.answer01}
            <input type="radio" name="B3" value='6' className='3' checked={check.B3 === result[2]?.answerScore02} onChange={handleChange}/> {result[2]?.answer02}
            <br/>
            <p>Q4.{result[0]?.question}</p>
            <input type="radio" name="B4" value='7' className='4' checked={check.B4 === result[3]?.answerScore01} onChange={handleChange}/> {result[3]?.answer01}
            <input type="radio" name="B4" value='8' className='4' checked={check.B4 === result[3]?.answerScore02} onChange={handleChange}/> {result[3]?.answer02}
            <br/>
            <p>Q5.{result[0]?.question}</p>
            <input type="radio" name="B5" value='9' className='5' checked={check.B5 === result[4]?.answerScore01} onChange={handleChange}/> {result[4]?.answer01}
            <input type="radio" name="B5" value='10' className='5' checked={check.B5 === result[4]?.answerScore02} onChange={handleChange}/> {result[4]?.answer02}
            <br/>
            <Link to='/start'><button type="submit">이전</button></Link>
            <button type="submit" onClick={handleSubmit}>다음</button>
        </div>

    )
}
