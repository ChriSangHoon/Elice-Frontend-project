import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Question_4(){
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

        } catch(error){
            console.error(error);
        }
    }
    useEffect(()=>{questionList()},[])
    return(
        <div> 
            <p>Q16.{answer.question}</p>
            <input type="radio"/> {answer.answer151}
            <input type="radio"/> {answer.answer152}
            <br/>
            <p>Q17.{answer.question}</p>
            <input type="radio"/> {answer.answer161}
            <input type="radio"/> {answer.answer162}
            <br/>
            <p>Q18.{answer.question}</p>
            <input type="radio"/> {answer.answer171}
            <input type="radio"/> {answer.answer172}
            <br/>
            <p>Q19.{answer.question}</p>
            <input type="radio"/> {answer.answer181}
            <input type="radio"/> {answer.answer182}
            <br/>
            <p>Q20.{answer.question}</p>
            <input type="radio"/> {answer.answer191}
            <input type="radio"/> {answer.answer192}
            <br/>
            <Link to='/test3'><button type="submit">이전</button></Link>
            <Link to='/test5'><button type="submit">다음</button></Link>
        </div>

    )
}