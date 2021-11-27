import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';

export default function Question_2(){

    const history = useHistory();
    const location = useLocation();
    const [percent,setPercent]= useState(18);

    const [check,setCheck] = useState(()=> JSON.parse(window.localStorage.getItem("check")) || {
        B6: "",
        B7: "",
        B8: "",
        B9: "",
        B10: ""
    });
    
    const handleChange = e => {
        setCheck({
            ...check,
            [e.target.name] : e.target.value
        })
        setPercent(Math.round((e.target.className/28)*100))
        // console.log(percent);
        // console.log(check);
        // console.log(result);
    }

    const [result,setResult]= useState([]);
    const questionList = async() =>{
            const res = await axios.get('https://www.career.go.kr/inspct/openapi/test/questions?apikey=73587f95ef371322626bf3a537e9eb3b&q=6')
            try{
                setResult(res.data.RESULT.splice(5,10))
            } catch(error){
                console.log(error);
            }
    }
    useEffect(()=>{
        window.localStorage.setItem("check", JSON.stringify(check));
        questionList()
        console.log(location.state);
        // console.log(check);
        // console.log()
    }, [check])

    function handleSubmit(e){
        if(check.B6 ==='' || check.B7 ==='' || check.B8 ==='' || check.B9 ==='' || check.B10 ===''){
            alert('모든 항목을 체크해주세요.')
        }
        else{
            history.push({
                pathname : '/test3',
                state: {...location.state, ...check},
            })
            window.location.href ='/test3'

        }
    }

    return(
        <div class="container">
            <div class="progress" style={{height: '25px'}}>
                <div class="progress-bar bg-info progress-bar-striped progress-bar-animated" style={{width: `${percent}%`}}>{percent}%</div>
            </div>
            <br/>
            <div class="question">
                <p>Q6.{result[0]?.question}</p>
                <label class="btn btn-outline-info"><input type="radio" name="B6" value='11' className='6' checked={check.B6 === result[0]?.answerScore01} onChange={handleChange}/> {result[0]?.answer01}</label> &ensp;
                <label class="btn btn-outline-info"><input type="radio" name="B6" value='12' className='6' checked={check.B6 === result[0]?.answerScore02} onChange={handleChange}/> {result[0]?.answer02}</label>
                <br/><br/>
                <p>Q7.{result[0]?.question}</p>
                <label class="btn btn-outline-info"><input type="radio" name="B7" value='13' className='7' checked={check.B7 === result[1]?.answerScore01} onChange={handleChange}/> {result[1]?.answer01}</label> &ensp;
                <label class="btn btn-outline-info"><input type="radio" name="B7" value='14' className='7' checked={check.B7 === result[1]?.answerScore02} onChange={handleChange}/> {result[1]?.answer02}</label>
                <br/><br/>
                <p>Q8.{result[0]?.question}</p>
                <label class="btn btn-outline-info"><input type="radio" name="B8" value='15' className='8' checked={check.B8 === result[2]?.answerScore01} onChange={handleChange}/> {result[2]?.answer01}</label> &ensp;
                <label class="btn btn-outline-info"><input type="radio" name="B8" value='16' className='8' checked={check.B8 === result[2]?.answerScore02} onChange={handleChange}/> {result[2]?.answer02}</label>
                <br/><br/>
                <p>Q9.{result[0]?.question}</p>
                <label class="btn btn-outline-info"><input type="radio" name="B9" value='17' className='9' checked={check.B9 === result[3]?.answerScore01} onChange={handleChange}/> {result[3]?.answer01}</label> &ensp;
                <label class="btn btn-outline-info"><input type="radio" name="B9" value='18' className='9' checked={check.B9 === result[3]?.answerScore02} onChange={handleChange}/> {result[3]?.answer02}</label>
                <br/><br/>
                <p>Q10.{result[0]?.question}</p>
                <label class="btn btn-outline-info"><input type="radio" name="B10" value='19' className='10' checked={check.B10 === result[4]?.answerScore01} onChange={handleChange}/> {result[4]?.answer01}</label> &ensp;
                <label class="btn btn-outline-info"><input type="radio" name="B10" value='20' className='10' checked={check.B10 === result[4]?.answerScore02} onChange={handleChange}/> {result[4]?.answer02}</label>
            </div>
            <br/><br/>
            <Link to='/test1'><button type="submit" class="btn btn-outline-primary">이전</button></Link> &ensp;
            <button type="submit" class="btn btn-outline-primary" onClick={handleSubmit}>다음</button>
        </div>

    );
}