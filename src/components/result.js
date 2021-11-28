import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {Bar} from 'react-chartjs-2';
import Chart from 'chart.js/auto';

export default function PrevResult(){

    const location = useLocation();
    const[gender,setGender]=useState();
    const[important,setImportant]= useState("");
    const[unimportant,setUnimportant]= useState("");
    //학력별 직업 리스트 저장
    const[mid,setMid] = useState([]);
    const[high,setHigh] = useState([]);
    const[col,setCol] = useState([]);
    const[univ,setUniv]= useState([]);
    const[grad,setGrad] = useState([]);
    //전공별 직업 리스트 저장
    const[none,setNone] = useState([]);
    const[hum,setHum] = useState([]);
    const[soc,setSoc] = useState([]);
    const[edu,setEdu] = useState([]);
    const[eng,setEng]= useState([]);
    const[nat,setNat] = useState([]); 
    const[med,setMed]= useState([]);
    const[artphy,setArtphy] = useState([]);

    const today = new Date();
    const category= {
        1:"능력발휘",
        2:"자율성",
        3:"보수",
        4:"안정성",
        5:"사회적 인정",
        6:'사회봉사',
        7:"자기계발",
        8:"창의성"
    }
    //tempArray는 그래프의 수치
    const[tempArray, setTempArray] = useState();
    const data = {
        labels: Object.values(category),
        datasets: [
                {
                    label: `${location.state.userName}님의 직업가치관 검사 결과 그래프`,
                    backgroundColor: 'rgba(0,0,255,0.4)',
                    borderColor: 'rgba(0,10,132,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(0,0,132,0.4)',
                    hoverBorderColor: 'rgba(0,99,132,1)',
                    data: tempArray
                }
            ]
        }
    useEffect(()=>{
        setGender(location.state.userGender == 100323 ? '남자' : '여자');
        let ansString=""
        for (let i=1; i<Object.keys(location.state).length -1 ; i++) {
            ansString += `B${i}=${Object.values(location.state)[i+1]} `
        };
        const data = {
            "apikey": "73587f95ef371322626bf3a537e9eb3b",
            "qestrnSeq": "6",
            "trgetSe": "100208",
            "name": location.state.userName,
            "gender": location.state.userGender,
            "school": "",
            "email": "",
            "startDtm": 1550466291034,
            "answers": ansString
        }
        //강면구님 코드 참조하여 axios.post
        async function Post(){
            const url = "https://www.career.go.kr/inspct/openapi/test/report?apikey=73587f95ef371322626bf3a537e9eb3b&qestrnSeq=6";
            const response = await axios.post(url, JSON.stringify(data), {
                headers: {
                    "Content-Type": 'application/json'
                }
            })
            const getUrl = response.data.RESULT.url;
            const seq = getUrl.split('=')[1];
            const getResponse = await axios.get(`https://www.career.go.kr/inspct/api/psycho/report?seq=${seq}`)
            const wonList = getResponse.data.result.wonScore.split(' ')
            let obj= {};

            wonList.forEach((num)=>{
                let data = num.split('=');
                if(data[0] !== ""){
                    obj = {
                        ...obj,
                        [data[0]] : data[1],
                    };
                }
            });
            const tempArray = Object.values(obj);
            setTempArray(Object.values(obj));

            const maxPt = Math.max(...Object.values(obj));
            const minPt = Math.min(...Object.values(obj));
            const maxtempArray=[];
            const mintempArray=[];
            for(let i=1; i< wonList.length +1; i++){
                if(tempArray[i-1] == maxPt){
                    maxtempArray.push(i);
                    
                }else if(tempArray[i-1] == minPt){
                    mintempArray.push(i);
                }
            }
            const no_1 = maxtempArray[0];
            const no_2 = mintempArray[0];

            const newMid=[];
            const newHigh=[];
            const newCol=[];
            const newUniv=[];
            const newGrad=[];

            const eduUrl = await axios.get(`https://inspct.career.go.kr/inspct/api/psycho/value/jobs?no1=${no_1}&no2=${no_2}`);
            eduUrl.data.map((item,i)=>{
                if(item[2] == 1){
                    setMid(()=>{
                        newMid.push(eduUrl.data[i][1]);
                        const set = new Set(newMid);
                        return [...set];
                    })
                }else if(item[2] == 2){
                    setHigh(()=>{
                        newHigh.push(eduUrl?.data[i][1]);
                        const set = new Set(newHigh);
                        return [...set];
                    })

                }else if(item[2] == 3){
                    setCol(()=>{
                        newCol.push(eduUrl.data[i][1]);
                        const set = new Set(newCol);
                        return [...set];
                    })
                }else if(item[2]== 4){
                    setUniv(()=>{
                        newUniv.push(eduUrl.data[i][1]);
                        const set = new Set(newUniv);
                        return [...set];
                    })
                }else if(item[2]== 5){
                    setGrad(()=>{
                        newGrad.push(eduUrl.data[i][1]);
                        const set = new Set(newGrad);
                        return [...set];
                    })
                }
            })
            const newNone = [];
            const newHum = [];
            const newSoc = [];
            const newEdu = [];
            const newEng = [];
            const newNat = [];
            const newMed = [];
            const newArtphy = [];
            const majorUrl = await axios.get(`https://inspct.career.go.kr/inspct/api/psycho/value/majors?no1=${no_1}&no2=${no_2}`);

            majorUrl.data.map((item,i)=>{
                if(item[2]== 0){
                    setNone(()=>{
                        newNone.push(majorUrl?.data[i][1]);
                        const set = new Set(newNone);
                        return [...set];
                    })
                }else if(item[2]== 1){
                    setHum(()=>{
                        newHum.push(majorUrl?.data[i][1]);
                        const set = new Set(newHigh);
                        return [...set];
                    })
                }else if(item[2]== 2){
                    setSoc(()=>{
                        newSoc.push(majorUrl.data[i][1]);
                        const set = new Set(newSoc);
                        return [...set];
                    })
                }else if(item[2]== 3){
                    setEdu(()=>{
                        newEdu.push(majorUrl.data[i][1]);
                        const set = new Set(newEdu);
                        return [...set];
                    })
                }else if(item[2]== 4){
                    setEng(()=>{
                        newEng.push(majorUrl.data[i][1]);
                        const set = new Set(newEng);
                        return [...set];
                    })
                }else if(item[2]== 5){
                    setNat(()=>{
                        newNat.push(majorUrl.data[i][1]);
                        const set = new Set(newNat);
                        return [...set];
                    })
                }
                else if(item[2]== 6){
                    setMed(()=>{
                        newMed.push(majorUrl.data[i][1]);
                        const set = new Set(newMed);
                        return [...set];
                    })
                }
                else if(item[2]== 7){
                    setArtphy(()=>{
                        newArtphy.push(majorUrl.data[i][1]);
                        const set = new Set(newArtphy);
                        return [...set];
                    })
                }
            })

            const importantList = maxtempArray.map((num)=> category[num]);
            const unimportantList = mintempArray.map((num)=> category[num]);
            setImportant(importantList.join(', '));
            setUnimportant(unimportantList.join(', '));
        }
        Post()
    },[])

    return(
        <div className="container">
            <h1 style={{color: 'rgba(0,0,255,0.4)'}}>직업가치관검사 결과표</h1>
                <br/>
                <p style={{textAlign:'left'}}>직업가치관이란 직업을 선택할 때 영향을 끼치는 자신만의 믿음과 신념입니다.
                따라서 여러분의 직업생활과 관련하여 포기하지 않는 무게중심의 역할을 한다고 볼 수 있습니다.
                직업가치관검사는 여러분이 직업을 선택할 때 상대적으로 어떠한 가치를 중요하게 생각하는지를 알려줍니다. 
                또한 본인이 가장 중요하게 생각하는 가치를 충족시켜줄 수 있는 직업에 대해 생각해 볼 기회를 제공합니다.</p>
            <br/>
            <table className="table table-bordered" border="3">
                <thead>
                    <tr>
                        <th>이름</th>
                        <th>성별</th>
                        <th>검사일자</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="success">
                        <td>{location.state.userName}</td>
                        <td>{gender}</td>
                        <td>{today.getFullYear()} / {today.getMonth()+1} / {today.getDate()}</td>
                    </tr>
                </tbody>
            </table>
            <br/>
            <strong><p style={{textAlign:'left'}}>1. 직업가치관 결과</p></strong>
            <div>
                <Bar 
                data={data} 
                width="100" 
                height="50" 
                options={{maintainAspectRatio : true}}
                />
                <br/>
            </div>
            <p style={{textAlign:'center'}}> {location.state.userName}님은 <strong style={{color: 'rgba(0,0,255,0.4)'}}>{important}</strong>은(는) 중요하게 생각합니다.<br/>
            반면에 <strong style={{color: 'rgba(0,0,255,0.4)'}}>{unimportant}</strong>(은)는 비교적 덜 중요하게 생각합니다.</p>
            <br/>
            <strong><p style={{textAlign:'left'}}>2. 가치관과 관련이 높은 직업</p></strong>
            <div style={{width:'100%', height:'80px', backgroundColor:'rgba(0,0,255,0.1)'}} >
                <strong><p style={{fontSize: '20px', lineHeight: '80px'}}>종사자 평균 학력별</p></strong>
            </div>
            <br/>
            <table className="table table-bordered" border="3">
                <thead>
                    <tr>
                        <th>분야</th>
                        <th>직업</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="success">
                        <td>중학교 졸업 이하</td>
                        <td>{mid.join(', ')}</td>
                    </tr>
                    <tr>
                        <td>고등학교 졸업</td>
                        <td>{high.join(', ')}</td>
                    </tr>
                    <tr>
                        <td>전문대학교 졸업</td>
                        <td>{col.join(', ')}</td>
                    </tr>
                    <tr>
                        <td>대학교 졸업</td>
                        <td>{univ.join(', ')}</td>
                    </tr>
                    <tr>
                        <td>대학원 졸업</td>
                        <td>{grad.join(', ')}</td>
                    </tr>
                </tbody>
            </table>
            <div style={{width:'100%', height:'80px', backgroundColor:'rgba(0,0,255,0.1)'}} >
                <strong><p style={{fontSize: '20px', lineHeight: '80px'}}>종사자 평균 전공별</p></strong>
            </div>
            <table className="table table-bordered" border="3">
                <thead>
                    <tr>
                        <th>분야</th>
                        <th>직업</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="success">
                        <td>계열무관</td>
                        <td>{none.join(', ')}</td>
                    </tr>
                    <tr>
                        <td>인문</td>
                        <td>{hum.join(', ')}</td>
                    </tr>
                    <tr>
                        <td>사회</td>
                        <td>{soc.join(', ')}</td>
                    </tr>
                    <tr>
                        <td>교육</td>
                        <td>{edu.join(', ')}</td>
                    </tr>
                    <tr>
                        <td>공학</td>
                        <td>{eng.join(', ')}</td>
                    </tr>
                    <tr>
                        <td>자연</td>
                        <td>{nat.join(', ')}</td>
                    </tr>
                    <tr>
                        <td>의학</td>
                        <td>{med.join(', ')}</td>
                    </tr>
                    <tr>
                        <td>예체능</td>
                        <td>{artphy.join(', ')}</td>
                    </tr>
                </tbody>
            </table>
            <br/>
            <br/>
            <Link to='/' onClick={localStorage.clear()}><button type="submit" className="btn btn-outline-primary">다시 검사하기</button></Link> &ensp;

        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        </div>
    )
}