import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Question_3(){
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

        } catch(error){
            console.error(error);
        }
    }
    useEffect(()=>{questionList()},[])
    return(
        <div> 
            <p>Q11.{answer.question}</p>
            <input type="radio"/> {answer.answer101}
            <input type="radio"/> {answer.answer102}
            <br/>
            <p>Q12.{answer.question}</p>
            <input type="radio"/> {answer.answer111}
            <input type="radio"/> {answer.answer112}
            <br/>
            <p>Q13.{answer.question}</p>
            <input type="radio"/> {answer.answer121}
            <input type="radio"/> {answer.answer122}
            <br/>
            <p>Q14.{answer.question}</p>
            <input type="radio"/> {answer.answer131}
            <input type="radio"/> {answer.answer132}
            <br/>
            <p>Q15.{answer.question}</p>
            <input type="radio"/> {answer.answer141}
            <input type="radio"/> {answer.answer142}
            <br/>
            <Link to='/test2'><button type="submit">이전</button></Link>
            <Link to='/test4'><button type="submit">다음</button></Link>
        </div>

    )
}