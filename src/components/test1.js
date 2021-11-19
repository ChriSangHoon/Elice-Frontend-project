import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Question_1(){
    const [answer, setAnswer] = useState({});
    const questionList = async() =>{
        //state를 빈 배열로 설정 후에 for문을 돌면서 
        try{
            const res = await axios.get('https://www.career.go.kr/inspct/openapi/test/questions?apikey=73587f95ef371322626bf3a537e9eb3b&q=6')
            // for(let i=0; i<res.data.RESULT.length; i++){
            //     newAnswer.push({question: res.data.RESULT[i].question,
            //     answer01: res.data.RESULT[i].answer01,
            //     answer02: res.data.RESULT[i].answer02});
            // }
            // setAnswer(newAnswer);
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

        } catch(error){
            console.error(error);
        }
    }
    useEffect(()=>{questionList()},[])
    return(
        <div> 
            <p>Q1.{answer.question}</p>
            <input type="radio"/> {answer.answer01}
            <input type="radio"/> {answer.answer02}
            <br/>
            <p>Q2.{answer.question}</p>
            <input type="radio"/> {answer.answer11}
            <input type="radio"/> {answer.answer12}
            <br/>
            <p>Q3.{answer.question}</p>
            <input type="radio"/> {answer.answer21}
            <input type="radio"/> {answer.answer22}
            <br/>
            <p>Q4.{answer.question}</p>
            <input type="radio"/> {answer.answer31}
            <input type="radio"/> {answer.answer32}
            <br/>
            <p>Q5.{answer.question}</p>
            <input type="radio"/> {answer.answer41}
            <input type="radio"/> {answer.answer42}
            <br/>
            <Link to='/start'><button type="submit">이전</button></Link>
            <Link to='/test2'><button type="submit">다음</button></Link>
        </div>

    )
}
