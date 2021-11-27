import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';

export default function Question_5(){

    const history = useHistory();
    const location = useLocation();
    const [percent,setPercent]= useState(71);

    const [check,setCheck] = useState(()=> JSON.parse(window.localStorage.getItem("check")) || {
        B21: "",
        B22: "",
        B23: "",
        B24: "",
        B25: ""
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
                setResult(res.data.RESULT.splice(20,25))
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
        if(check.B21 ==='' || check.B22 ==='' || check.B23 ==='' || check.B24 ==='' || check.B25 ===''){
            alert('모든 항목을 체크해주세요.')
        }
        else{
            history.push({
                pathname : '/test6',
                state: {...location.state, ...check},
            })
            window.location.href ='/test6'
        }
    }

    return(
        <div class="container">
            <div class="question">
                <div class="progress" style={{height: '25px'}}>
                    <div class="progress-bar bg-info progress-bar-striped progress-bar-animated" style={{width: `${percent}%`}}>{percent}%</div>
                </div>
                <br/>
                <p>Q21.{result[0]?.question}</p>
                <label class="btn btn-outline-info"><input type="radio" name="B21" value='41' className='21' checked={check.B21 === result[0]?.answerScore01} onChange={handleChange}/> {result[0]?.answer01}</label> &ensp;
                <label class="btn btn-outline-info"><input type="radio" name="B21" value='42' className='21' checked={check.B21 === result[0]?.answerScore02} onChange={handleChange}/> {result[0]?.answer02}</label> &ensp;
                <br/><br/>
                <p>Q22.{result[0]?.question}</p>
                <label class="btn btn-outline-info"><input type="radio" name="B22" value='43' className='22' checked={check.B22 === result[1]?.answerScore01} onChange={handleChange}/> {result[1]?.answer01}</label> &ensp;
                <label class="btn btn-outline-info"><input type="radio" name="B22" value='44' className='22' checked={check.B22 === result[1]?.answerScore02} onChange={handleChange}/> {result[1]?.answer02}</label> &ensp;
                <br/><br/>
                <p>Q23.{result[0]?.question}</p>
                <label class="btn btn-outline-info"><input type="radio" name="B23" value='45' className='23' checked={check.B23 === result[2]?.answerScore01} onChange={handleChange}/> {result[2]?.answer01}</label> &ensp;
                <label class="btn btn-outline-info"><input type="radio" name="B23" value='46' className='23' checked={check.B23 === result[2]?.answerScore02} onChange={handleChange}/> {result[2]?.answer02}</label> &ensp;
                <br/><br/>
                <p>Q24.{result[0]?.question}</p>
                <label class="btn btn-outline-info"><input type="radio" name="B24" value='47' className='24' checked={check.B24 === result[3]?.answerScore01} onChange={handleChange}/> {result[3]?.answer01}</label> &ensp;
                <label class="btn btn-outline-info"><input type="radio" name="B24" value='48' className='24' checked={check.B24 === result[3]?.answerScore02} onChange={handleChange}/> {result[3]?.answer02}</label> &ensp;
                <br/><br/>
                <p>Q25.{result[0]?.question}</p>
                <label class="btn btn-outline-info"><input type="radio" name="B25" value='49' className='25' checked={check.B25 === result[4]?.answerScore01} onChange={handleChange}/> {result[4]?.answer01}</label> &ensp;
                <label class="btn btn-outline-info"><input type="radio" name="B25" value='50' className='25' checked={check.B25 === result[4]?.answerScore02} onChange={handleChange}/> {result[4]?.answer02}</label> &ensp;
            </div>
            <br/><br/>
            <Link to='/test4'><button type="submit" class="btn btn-outline-primary">이전</button></Link> &ensp;
            <button type="submit" class="btn btn-outline-primary" onClick={handleSubmit}>다음</button>
        </div>

    )
}