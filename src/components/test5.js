import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Question_5(){
    const [answer, setAnswer] = useState({});
    const [check,setCheck] = useState({
        ans_21 : "",
        ans_22: "",
        ans_23: "",
        ans_24: "",
        ans_25: ""
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
                answer201: res.data.RESULT[20].answer01,
                answer202: res.data.RESULT[20].answer02,
                answer211: res.data.RESULT[21].answer01,
                answer212: res.data.RESULT[21].answer02,
                answer221: res.data.RESULT[22].answer01,
                answer222: res.data.RESULT[22].answer02,
                answer231: res.data.RESULT[23].answer01,
                answer232: res.data.RESULT[23].answer02,
                answer241: res.data.RESULT[24].answer01,
                answer242: res.data.RESULT[24].answer02,
            })
    }
    useEffect(()=>{
        questionList()
    },[])

    function handleSubmit(e){
        e.preventDefault();
        if(check.ans_21 ==='' || check.ans_22 ==='' || check.ans_23 ==='' || check.ans_24 ==='' || check.ans_25 ===''){
            alert('모든 항목을 체크해주세요.')
        }
        else{
            window.location.href ='/test6'
        }
    }

    return(
        <div> 
            <p>Q21.{answer.question}</p>
            <input type="radio" name="ans_21" value={answer.answer201} onClick={handleChange}/> {answer.answer201}
            <input type="radio" name="ans_21" value={answer.answer202} onClick={handleChange}/> {answer.answer202}
            <br/>
            <p>Q22.{answer.question}</p>
            <input type="radio" name="ans_22" value={answer.answer211} onClick={handleChange}/> {answer.answer211}
            <input type="radio" name="ans_22" value={answer.answer212} onClick={handleChange}/> {answer.answer212}
            <br/>
            <p>Q23.{answer.question}</p>
            <input type="radio" name="ans_23" value={answer.answer221} onClick={handleChange}/> {answer.answer221}
            <input type="radio" name="ans_23" value={answer.answer222} onClick={handleChange}/> {answer.answer222}
            <br/>
            <p>Q24.{answer.question}</p>
            <input type="radio" name="ans_24" value={answer.answer231} onClick={handleChange}/> {answer.answer231}
            <input type="radio" name="ans_24" value={answer.answer232} onClick={handleChange}/> {answer.answer232}
            <br/>
            <p>Q25.{answer.question}</p>
            <input type="radio" name="ans_25" value={answer.answer241} onClick={handleChange}/> {answer.answer241}
            <input type="radio" name="ans_25" value={answer.answer242} onClick={handleChange}/> {answer.answer242}
            <br/>
            <Link to='/test4'><button type="submit">이전</button></Link>
            <button type="submit" onClick={handleSubmit}>다음</button>
        </div>

    )
}