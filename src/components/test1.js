import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Question_1(){
    const [answer, setAnswer] = useState({});
    const [check,setCheck] = useState({
        ans_1 : "",
        ans_2: "",
        ans_3: "",
        ans_4: "",
        ans_5: ""
    });
    const handleChange = e => {
        setCheck({
            ...check,
            [e.target.name] : e.target.value
        })
    }
    const questionList = async() =>{
            const res = await axios.get('https://www.career.go.kr/inspct/openapi/test/questions?apikey=73587f95ef371322626bf3a537e9eb3b&q=6')
            setAnswer({
                question: res.data.RESULT[0].question,
                answer01: res.data.RESULT[0].answer01,
                answer02: res.data.RESULT[0].answer02,
                answer11: res.data.RESULT[1].answer01,
                answer12: res.data.RESULT[1].answer02,
                answer21: res.data.RESULT[2].answer01,
                answer22: res.data.RESULT[2].answer02,
                answer31: res.data.RESULT[3].answer01,
                answer32: res.data.RESULT[3].answer02,
                answer41: res.data.RESULT[4].answer01,
                answer42: res.data.RESULT[4].answer02,
            })     
    }
    useEffect(()=>{
        questionList()
    }, [] )
        //렌더링 시에 한 번만 questionList를 실행한다.

    function handleSubmit(e){
        e.preventDefault();
        if(check.ans_1 ==='' || check.ans_2 ==='' || check.ans_3 ==='' || check.ans_4 ==='' || check.ans_5 ===''){
            alert('모든 항목을 체크해주세요.')
        }
        else{
            window.location.href ='/test2'
        }
    }
    return(
        <div> 
            <p>Q1.{answer.question}</p>
            <input type="radio" name="ans_1" value={answer.answer01} onClick={handleChange}/> {answer.answer01}
            <input type="radio" name="ans_1" value={answer.answer02} onClick={handleChange}/> {answer.answer02}
            <br/>
            <p>Q2.{answer.question}</p>
            <input type="radio" name="ans_2" value={answer.answer11} onClick={handleChange}/> {answer.answer11}
            <input type="radio" name="ans_2" value={answer.answer12} onClick={handleChange}/> {answer.answer12}
            <br/>
            <p>Q3.{answer.question}</p>
            <input type="radio" name="ans_3" value={answer.answer21} onClick={handleChange}/> {answer.answer21}
            <input type="radio" name="ans_3" value={answer.answer21} onClick={handleChange}/> {answer.answer22}
            <br/>
            <p>Q4.{answer.question}</p>
            <input type="radio" name="ans_4" value={answer.answer31} onClick={handleChange}/> {answer.answer31}
            <input type="radio" name="ans_4" value={answer.answer32} onClick={handleChange}/> {answer.answer32}
            <br/>
            <p>Q5.{answer.question}</p>
            <input type="radio" name="ans_5" value={answer.answer41} onClick={handleChange}/> {answer.answer41}
            <input type="radio" name="ans_5" value={answer.answer42} onClick={handleChange}/> {answer.answer42}
            <br/>
            <Link to='/start'><button type="submit">이전</button></Link>
            <button type="submit" onClick={handleSubmit}>다음</button>
        </div>

    )
}
