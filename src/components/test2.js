import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Question_2(){
    const [answer, setAnswer] = useState({});
    const [check,setCheck] = useState({
        ans_6 : "",
        ans_7: "",
        ans_8: "",
        ans_9: "",
        ans_10: ""
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
                answer51: res.data.RESULT[5].answer01,
                answer52: res.data.RESULT[5].answer02,
                answer61: res.data.RESULT[6].answer01,
                answer62: res.data.RESULT[6].answer02,
                answer71: res.data.RESULT[7].answer01,
                answer72: res.data.RESULT[7].answer02,
                answer81: res.data.RESULT[8].answer01,
                answer82: res.data.RESULT[8].answer02,
                answer91: res.data.RESULT[9].answer01,
                answer92: res.data.RESULT[9].answer02,
            })
    }
    useEffect(()=>{
        questionList()
    },[])

    function handleSubmit(e){
        e.preventDefault();
        if(check.ans_6 ==='' || check.ans_7 ==='' || check.ans_8 ==='' || check.ans_9 ==='' || check.ans_10 ===''){
            alert('모든 항목을 체크해주세요.')
        }
        else{
            window.location.href ='/test3'
        }
    }
    return(
        <div> 
            <p>Q6.{answer.question}</p>
            <input type="radio" name="ans_6" value={answer.answer51} onClick={handleChange}/> {answer.answer51}
            <input type="radio" name="ans_6" value={answer.answer52} onClick={handleChange}/> {answer.answer52}
            <br/>
            <p>Q7.{answer.question}</p>
            <input type="radio" name="ans_7" value={answer.answer61} onClick={handleChange}/> {answer.answer61}
            <input type="radio" name="ans_7" value={answer.answer62} onClick={handleChange}/> {answer.answer62}
            <br/>
            <p>Q8.{answer.question}</p>
            <input type="radio" name="ans_8" value={answer.answer71} onClick={handleChange}/> {answer.answer71}
            <input type="radio" name="ans_8" value={answer.answer72} onClick={handleChange}/> {answer.answer72}
            <br/>
            <p>Q9.{answer.question}</p>
            <input type="radio" name="ans_9" value={answer.answer81} onClick={handleChange}/> {answer.answer81}
            <input type="radio" name="ans_9" value={answer.answer82} onClick={handleChange}/> {answer.answer82}
            <br/>
            <p>Q10.{answer.question}</p>
            <input type="radio" name="ans_10" value={answer.answer91} onClick={handleChange}/> {answer.answer91}
            <input type="radio" name="ans_10" value={answer.answer92} onClick={handleChange}/> {answer.answer92}
            <br/>
            <Link to='/test1'><button type="submit">이전</button></Link>
            <button type="submit" onClick={handleSubmit}>다음</button>
        </div>

    )
}