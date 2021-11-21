import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Question_3(){
    const [answer, setAnswer] = useState({});
    const [check,setCheck] = useState({
        ans_11 : "",
        ans_12: "",
        ans_13: "",
        ans_14: "",
        ans_15: ""
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
                answer101: res.data.RESULT[10].answer01,
                answer102: res.data.RESULT[10].answer02,
                answer111: res.data.RESULT[11].answer01,
                answer112: res.data.RESULT[11].answer02,
                answer121: res.data.RESULT[12].answer01,
                answer122: res.data.RESULT[12].answer02,
                answer131: res.data.RESULT[13].answer01,
                answer132: res.data.RESULT[13].answer02,
                answer141: res.data.RESULT[14].answer01,
                answer142: res.data.RESULT[14].answer02,
            })
    }

    useEffect(()=>{
        questionList()
    },[])

    function handleSubmit(e){
        e.preventDefault();
        if(check.ans_11 ==='' || check.ans_12 ==='' || check.ans_13 ==='' || check.ans_14 ==='' || check.ans_15 ===''){
            alert('모든 항목을 체크해주세요.')
        }
        else{
            window.location.href ='/test4'
        }
    }
    
    return(
        <div> 
            <p>Q11.{answer.question}</p>
            <input type="radio" name="ans_11" value={answer.answer101} onClick={handleChange}/> {answer.answer101}
            <input type="radio" name="ans_11" value={answer.answer102} onClick={handleChange}/> {answer.answer102}
            <br/>
            <p>Q12.{answer.question}</p>
            <input type="radio" name="ans_12" value={answer.answer111} onClick={handleChange}/> {answer.answer111}
            <input type="radio" name="ans_12" value={answer.answer112} onClick={handleChange}/> {answer.answer112}
            <br/>
            <p>Q13.{answer.question}</p>
            <input type="radio" name="ans_13" value={answer.answer121} onClick={handleChange}/> {answer.answer121}
            <input type="radio" name="ans_13" value={answer.answer122} onClick={handleChange}/> {answer.answer122}
            <br/>
            <p>Q14.{answer.question}</p>
            <input type="radio" name="ans_14" value={answer.answer131} onClick={handleChange}/> {answer.answer131}
            <input type="radio" name="ans_14" value={answer.answer132} onClick={handleChange}/> {answer.answer132}
            <br/>
            <p>Q15.{answer.question}</p>
            <input type="radio" name="ans_15" value={answer.answer141} onClick={handleChange}/> {answer.answer141}
            <input type="radio" name="ans_15" value={answer.answer142} onClick={handleChange}/> {answer.answer142}
            <br/>
            <Link to='/test2'><button type="submit">이전</button></Link>
            <button type="submit" onClick={handleSubmit}>다음</button>
        </div>

    )
}