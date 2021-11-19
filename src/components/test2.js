import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Question_2(){
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

        } catch(error){
            console.error(error);
        }
    }
    useEffect(()=>{questionList()},[])
    return(
        <div> 
            <p>Q6.{answer.question}</p>
            <input type="radio"/> {answer.answer51}
            <input type="radio"/> {answer.answer52}
            <br/>
            <p>Q7.{answer.question}</p>
            <input type="radio"/> {answer.answer61}
            <input type="radio"/> {answer.answer62}
            <br/>
            <p>Q8.{answer.question}</p>
            <input type="radio"/> {answer.answer71}
            <input type="radio"/> {answer.answer72}
            <br/>
            <p>Q9.{answer.question}</p>
            <input type="radio"/> {answer.answer81}
            <input type="radio"/> {answer.answer82}
            <br/>
            <p>Q10.{answer.question}</p>
            <input type="radio"/> {answer.answer91}
            <input type="radio"/> {answer.answer92}
            <br/>
            <Link to='/test1'><button type="submit">이전</button></Link>
            <Link to='/test3'><button type="submit">다음</button></Link>
        </div>

    )
}