import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

export default function Question_6(){

    const history = useHistory();
    const location = useLocation();
    const [percent,setPercent]= useState(89);
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
        <div className="container">
            <div className="question">
                <div className="progress" style={{height: '25px'}}>
                    <div className="progress-bar bg-info progress-bar-striped progress-bar-animated" style={{width: `${percent}%`}}>{percent}%</div>
                </div>
                <br/>
                <p>Q26.{result[0]?.question}</p>
                <label className="btn btn-outline-info"><input type="radio" name="B26" value='52' className='26' checked={check.B26 === result[0]?.answerScore02} onChange={handleChange}/> {result[0]?.answer02}</label> &ensp;
                <label className="btn btn-outline-info"><input type="radio" name="B26" value='51' className='26' checked={check.B26 === result[0]?.answerScore01} onChange={handleChange}/> {result[0]?.answer01}</label> &ensp;
                <br/><br/>
                <p>Q27.{result[0]?.question}</p>
                <label className="btn btn-outline-info"><input type="radio" name="B27" value='53' className='27' checked={check.B27 === result[1]?.answerScore01} onChange={handleChange}/> {result[1]?.answer01}</label> &ensp;
                <label className="btn btn-outline-info"><input type="radio" name="B27" value='54' className='27' checked={check.B27 === result[1]?.answerScore02} onChange={handleChange}/> {result[1]?.answer02}</label> &ensp;
                <br/><br/>
                <p>Q28.{result[0]?.question}</p>
                <label className="btn btn-outline-info"><input type="radio" name="B28" value='55' className='28' checked={check.B28 === result[2]?.answerScore01} onChange={handleChange}/> {result[2]?.answer01}</label> &ensp;
                <label className="btn btn-outline-info"><input type="radio" name="B28" value='56' className='28' checked={check.B28 === result[2]?.answerScore02} onChange={handleChange}/> {result[2]?.answer02}</label> &ensp;
            </div>
            <br/><br/>
            <button type="submit" className="btn btn-outline-primary" onClick={()=>{
                history.push({
                    pathname:'/test5',
                    state: {...location.state}
                })
                window.location.href='/test5'
            }}>이전</button> &ensp;
            <button type="submit" className="btn btn-outline-primary" onClick={handleSubmit}>다음</button>
        </div>
    )
}