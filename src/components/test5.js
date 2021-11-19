import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Question_5(){
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

        } catch(error){
            console.error(error);
        }
    }
    useEffect(()=>{questionList()},[])
    return(
        <div> 
            <p>Q21.{answer.question}</p>
            <input type="radio"/> {answer.answer201}
            <input type="radio"/> {answer.answer202}
            <br/>
            <p>Q22.{answer.question}</p>
            <input type="radio"/> {answer.answer211}
            <input type="radio"/> {answer.answer212}
            <br/>
            <p>Q23.{answer.question}</p>
            <input type="radio"/> {answer.answer221}
            <input type="radio"/> {answer.answer222}
            <br/>
            <p>Q24.{answer.question}</p>
            <input type="radio"/> {answer.answer231}
            <input type="radio"/> {answer.answer232}
            <br/>
            <p>Q25.{answer.question}</p>
            <input type="radio"/> {answer.answer241}
            <input type="radio"/> {answer.answer242}
            <br/>
            <Link to='/test4'><button type="submit">이전</button></Link>
            <Link to='/test6'><button type="submit">다음</button></Link>
        </div>

    )
}