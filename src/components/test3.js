import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';

export default function Question_3(){

    const history = useHistory();
    const location = useLocation();
    const [percent,setPercent]= useState(36);

    const [check,setCheck] = useState(()=> JSON.parse(window.localStorage.getItem("check")) || {
        B11: "",
        B12: "",
        B13: "",
        B14: "",
        B15: ""
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
                setResult(res.data.RESULT.splice(10,15))
            } catch(error){
                console.log(error);
            }
    }

    useEffect(()=>{
        window.localStorage.setItem("check", JSON.stringify(check));
        questionList()
        console.log(location.state);
    }, [check])

    function handleSubmit(e){
        e.preventDefault();
        if(check.B11 ==='' || check.B12 ==='' || check.B13 ==='' || check.B14 ==='' || check.B15 ===''){
            alert('모든 항목을 체크해주세요.')
        }
        else{
            history.push({
                pathname : '/test4',
                state: {...location.state, ...check},
            })
            window.location.href ='/test4'
            // console.log(check);
        }
    }
    
    return(
        <div class="container">
            <div class="question">
                <div class="progress" style={{height: '25px'}}>
                    <div class="progress-bar bg-info progress-bar-striped progress-bar-animated" style={{width: `${percent}%`}}>{percent}%</div>
                </div>
                <br/>
                <p>Q11.{result[0]?.question}</p>
                <label class="btn btn-outline-info"><input type="radio" name="B11" value='21' className='11' checked={check.B11 === result[0]?.answerScore01} onChange={handleChange}/> {result[0]?.answer01}</label> &ensp;
                <label class="btn btn-outline-info"><input type="radio" name="B11" value='22' className='11' checked={check.B11 === result[0]?.answerScore02} onChange={handleChange}/> {result[0]?.answer02}</label> &ensp;
                <br/><br/>
                <p>Q12.{result[0]?.question}</p>
                <label class="btn btn-outline-info"><input type="radio" name="B12" value='23' className='12' checked={check.B12 === result[1]?.answerScore01} onChange={handleChange}/> {result[1]?.answer01}</label> &ensp;
                <label class="btn btn-outline-info"><input type="radio" name="B12" value='24' className='12' checked={check.B12 === result[1]?.answerScore02} onChange={handleChange}/> {result[1]?.answer02}</label> &ensp;
                <br/><br/>
                <p>Q13.{result[0]?.question}</p>
                <label class="btn btn-outline-info"><input type="radio" name="B13" value='25' className='13' checked={check.B13 === result[2]?.answerScore01} onChange={handleChange}/> {result[2]?.answer01}</label> &ensp;
                <label class="btn btn-outline-info"><input type="radio" name="B13" value='26' className='13' checked={check.B13 === result[2]?.answerScore02} onChange={handleChange}/> {result[2]?.answer02}</label> &ensp;
                <br/><br/>
                <p>Q14.{result[0]?.question}</p>
                <label class="btn btn-outline-info"><input type="radio" name="B14" value='27' className='14' checked={check.B14 === result[3]?.answerScore01} onChange={handleChange}/> {result[3]?.answer01}</label> &ensp;
                <label class="btn btn-outline-info"><input type="radio" name="B14" value='28' className='14' checked={check.B14 === result[3]?.answerScore02} onChange={handleChange}/> {result[3]?.answer02}</label> &ensp;
                <br/><br/>
                <p>Q15.{result[0]?.question}</p>
                <label class="btn btn-outline-info"><input type="radio" name="B15" value='29' className='15' checked={check.B15 === result[4]?.answerScore01} onChange={handleChange}/> {result[4]?.answer01}</label> &ensp;
                <label class="btn btn-outline-info"><input type="radio" name="B15" value='30' className='15' checked={check.B15 === result[4]?.answerScore02} onChange={handleChange}/> {result[4]?.answer02}</label> &ensp;
            </div>
            <br/><br/>
            <Link to='/test2'><button type="submit" class="btn btn-outline-primary">이전</button></Link> &ensp;
            <button type="submit" class="btn btn-outline-primary" onClick={handleSubmit}>다음</button>
        </div>

    )
}