import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Question(){
    const [answer, setAnswer] = useState([]);
    const tempAns = [];
    const questionList = async() =>{
        //state를 빈 배열로 설정 후에 for문을 돌면서 
            const res = await axios.get('https://www.career.go.kr/inspct/openapi/test/questions?apikey=73587f95ef371322626bf3a537e9eb3b&q=6')
            // for(let i=0; i<res.data.RESULT.length; i++){
            //     tempAns.push({question: res.data.RESULT[i].question,
            //     answer01: res.data.RESULT[i].answer01,
            //     answer02: res.data.RESULT[i].answer02})
            // };
            res.data.RESULT.forEach(value => {
                tempAns.push({
                    question: value.question,
                    answer01: value.answer01,
                    answer02: value.answer02
                })
            })

        setAnswer(tempAns);
        console.log(tempAns);
    };
    useEffect(()=>{
        questionList()
    },[])

    //렌더링 시에 한 번만 questionList를 실행한다.
    return(
        <div> 
            <p>{answer[0].question}</p>
            <p>{answer[0].answer01}</p>
            <p>{answer[0].answer02}</p>
            <Link to='/test6'><button type="submit">이전</button></Link>
            <Link to='/start'><button type="submit">다음</button></Link>
        </div>

    )
}