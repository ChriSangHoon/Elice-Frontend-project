import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Question_4(){
    const [answer, setAnswer] = useState({});
    const [check,setCheck] = useState({
        ans_16 : "",
        ans_17: "",
        ans_18: "",
        ans_19: "",
        ans_20: ""
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
                answer151: res.data.RESULT[15].answer01,
                answer152: res.data.RESULT[15].answer02,
                answer161: res.data.RESULT[16].answer01,
                answer162: res.data.RESULT[16].answer02,
                answer171: res.data.RESULT[17].answer01,
                answer172: res.data.RESULT[17].answer02,
                answer181: res.data.RESULT[18].answer01,
                answer182: res.data.RESULT[18].answer02,
                answer191: res.data.RESULT[19].answer01,
                answer192: res.data.RESULT[19].answer02,
            })
    }

    useEffect(()=>{
        questionList()
    },[])

    function handleSubmit(e){
        e.preventDefault();
        if(check.ans_16 ==='' || check.ans_17 ==='' || check.ans_18 ==='' || check.ans_19 ==='' || check.ans_20 ===''){
            alert('모든 항목을 체크해주세요.')
        }
        else{
            window.location.href ='/test5'
        }
    }

    return(
        <div> 
            <p>Q16.{answer.question}</p>
            <input type="radio" name="ans_16" value={answer.answer151} onClick={handleChange}/> {answer.answer151}
            <input type="radio" name="ans_16" value={answer.answer152} onClick={handleChange}/> {answer.answer152}
            <br/>
            <p>Q17.{answer.question}</p>
            <input type="radio" name="ans_17" value={answer.answer161} onClick={handleChange}/> {answer.answer161}
            <input type="radio" name="ans_17" value={answer.answer162} onClick={handleChange}/> {answer.answer162}
            <br/>
            <p>Q18.{answer.question}</p>
            <input type="radio" name="ans_18" value={answer.answer171} onClick={handleChange}/> {answer.answer171}
            <input type="radio" name="ans_18" value={answer.answer172} onClick={handleChange}/> {answer.answer172}
            <br/>
            <p>Q19.{answer.question}</p>
            <input type="radio" name="ans_19" value={answer.answer181} onClick={handleChange}/> {answer.answer181}
            <input type="radio" name="ans_19" value={answer.answer182} onClick={handleChange}/> {answer.answer182}
            <br/>
            <p>Q20.{answer.question}</p>
            <input type="radio" name="ans_20" value={answer.answer191} onClick={handleChange}/> {answer.answer191}
            <input type="radio" name="ans_20" value={answer.answer192} onClick={handleChange}/> {answer.answer192}
            <br/>
            <Link to='/test3'><button type="submit">이전</button></Link>
            <button type="submit" onClick={handleSubmit}>다음</button>
        </div>

    )
}