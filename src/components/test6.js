import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';

export default function Question_6(){

    const history = useHistory();
    const location = useLocation();
    const [percent,setPercent]= useState(89);

    console.log(location.state);
    const [check,setCheck] = useState(()=> JSON.parse(window.localStorage.getItem("check")) || {
        B26: "",
        B27: "",
        B28: "",
    });

    const handleChange = e => {
        setCheck({
            ...check,
            [e.target.name] : e.target.value
        })
        setPercent(Math.round((e.target.className/28)*100))
    }

    const [result,setResult]= useState([]);  
    const questionList = async() =>{
            const res = await axios.get('https://www.career.go.kr/inspct/openapi/test/questions?apikey=73587f95ef371322626bf3a537e9eb3b&q=6')
            try{
                setResult(res.data.RESULT.splice(25,28))
            } catch(error){
                console.log(error);
            }
    }

    useEffect(()=>{
        window.localStorage.setItem("check", JSON.stringify(check));
        questionList()
    }, [check])

    function handleSubmit(e){
        e.preventDefault();
        if(check.B26 ==='' || check.B27 ==='' || check.B28 ===''){
            alert('모든 항목을 체크해주세요.')
        }
        else{
            history.push({
                pathname : '/prevresult',
                state: {...location.state, ...check},
            })
            window.location.href ='/prevresult'
        }
    }

    return(
        <div>
            <progress max="100" value={percent} ></progress> {percent}%
            <p>Q26.{result[0]?.question}</p>
            <input type="radio" name="B26" value='52' className='26' checked={check.B26 === result[0]?.answerScore02} onChange={handleChange}/> {result[0]?.answer02}
            <input type="radio" name="B26" value='51' className='26' checked={check.B26 === result[0]?.answerScore01} onChange={handleChange}/> {result[0]?.answer01}
            <br/>
            <p>Q27.{result[0]?.question}</p>
            <input type="radio" name="B27" value='53' className='27' checked={check.B27 === result[1]?.answerScore01} onChange={handleChange}/> {result[1]?.answer01}
            <input type="radio" name="B27" value='54' className='27' checked={check.B27 === result[1]?.answerScore02} onChange={handleChange}/> {result[1]?.answer02}
            <br/>
            <p>Q28.{result[0]?.question}</p>
            <input type="radio" name="B28" value='55' className='28' checked={check.B28 === result[2]?.answerScore01} onChange={handleChange}/> {result[2]?.answer01}
            <input type="radio" name="B28" value='56' className='28' checked={check.B28 === result[2]?.answerScore02} onChange={handleChange}/> {result[2]?.answer02}
            <br/>
            <Link to='/test5'><button type="submit">이전</button></Link>
            <button type="submit" onClick={handleSubmit}>다음</button>
        </div>
    )
}