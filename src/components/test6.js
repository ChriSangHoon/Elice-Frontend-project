import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Question_6(){
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
                answer251: res.data.RESULT[25].answer01,
                answer252: res.data.RESULT[25].answer02,
                answer261: res.data.RESULT[26].answer01,
                answer262: res.data.RESULT[26].answer02,
                answer271: res.data.RESULT[27].answer01,
                answer272: res.data.RESULT[27].answer02,
                // answer281: res.data.RESULT[28].answer01,
                // answer292: res.data.RESULT[28].answer02,
                // answer301: res.data.RESULT[29].answer01,
                // answer302: res.data.RESULT[29].answer02,
            })

        } catch(error){
            console.error(error);
        }
    }
    useEffect(()=>{questionList()},[])
    return(
        <div> 
            <p>Q26.{answer.question}</p>
            <input type="radio"/> {answer.answer251}
            <input type="radio"/> {answer.answer252}
            <br/>
            <p>Q27.{answer.question}</p>
            <input type="radio"/> {answer.answer261}
            <input type="radio"/> {answer.answer262}
            <br/>
            <p>Q28.{answer.question}</p>
            <input type="radio"/> {answer.answer271}
            <input type="radio"/> {answer.answer272}
            {/* <br/>
            <p>Q29.{answer.question}</p>
            <input type="radio"/> {answer.answer281}
            <input type="radio"/> {answer.answer282}
            <br/>
            <p>Q30.{answer.question}</p>
            <input type="radio"/> {answer.answer291}
            <input type="radio"/> {answer.answer292}
            <br/> */}
            <Link to='/test5'><button type="submit">이전</button></Link>
            <Link to='/start'><button type="submit">다음</button></Link>
        </div>

    )
}