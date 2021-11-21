import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Question_6(){
    const [answer, setAnswer] = useState({});
    const [check,setCheck] = useState({
        ans_26 : "",
        ans_27: "",
        ans_28: "",
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
                answer251: res.data.RESULT[25].answer01,
                answer252: res.data.RESULT[25].answer02,
                answer261: res.data.RESULT[26].answer01,
                answer262: res.data.RESULT[26].answer02,
                answer271: res.data.RESULT[27].answer01,
                answer272: res.data.RESULT[27].answer02,
            })
    }

    useEffect(()=>{
        questionList()
    },[])

    function handleSubmit(e){
        e.preventDefault();
        if(check.ans_26 ==='' || check.ans_27 ==='' || check.ans_28 ===''){
            alert('모든 항목을 체크해주세요.')
        }
        else{
            window.location.href ='/'
        }
    }

    return(
        <div> 
            <p>Q26.{answer.question}</p>
            <input type="radio" name="ans_26" value={answer.answer251} onClick={handleChange}/> {answer.answer251}
            <input type="radio" name="ans_26" value={answer.answer252} onClick={handleChange}/> {answer.answer252}
            <br/>
            <p>Q27.{answer.question}</p>
            <input type="radio" name="ans_27" value={answer.answer261} onClick={handleChange}/> {answer.answer261}
            <input type="radio" name="ans_27" value={answer.answer262} onClick={handleChange}/> {answer.answer262}
            <br/>
            <p>Q28.{answer.question}</p>
            <input type="radio" name="ans_28" value={answer.answer271} onClick={handleChange}/> {answer.answer271}
            <input type="radio" name="ans_28" value={answer.answer272} onClick={handleChange}/> {answer.answer272}
            <br/>
            <Link to='/test5'><button type="submit">이전</button></Link>
            <button type="submit" onClick={handleSubmit}>다음</button>
        </div>
    )
}