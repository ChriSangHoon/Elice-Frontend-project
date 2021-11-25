import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function PrevResult(){

    const location = useLocation();
    const[gender,setGender]=useState();
    const[important,setImportant]= useState("");
    const[unimportant,setUnimportant]= useState("");
    const[edu,setEdu]= useState("");
    const[major,setMajor] = useState("");

    useEffect(()=>{
        setGender(location.state.userGender == 100323 ? '남자' : '여자');
        let ansString=""
        for (let i=1; i<Object.keys(location.state).length -1 ; i++) {
            ansString += `B${i}=${Object.values(location.state)[i+1]} `
        };
        console.log(ansString);
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
        async function Post(){
            const url = "https://www.career.go.kr/inspct/openapi/test/report?apikey=73587f95ef371322626bf3a537e9eb3b&qestrnSeq=6";
            const response = await axios.post(url, JSON.stringify(data), {
                headers: {
                    "Content-Type": 'application/json'
                }
            })
            const getUrl = response.data.RESULT.url;
            console.log(getUrl);
            const seq = getUrl.split('=')[1];
            console.log(seq);
            const getResponse = await axios.get(`https://www.career.go.kr/inspct/api/psycho/report?seq=${seq}`)
            console.log(getResponse);
            const wonList = getResponse.data.result.wonScore.split(' ')
            let obj= {};

            wonList.forEach((num)=>{
                let data = num.split('=');
                if(data[0] != ""){
                    obj = {
                        ...obj,
                        [data[0]] : data[1],
                    };
                }
            });

            console.log(obj);
            console.log(wonList);
            const tempArray = Object.values(obj);
            const maxPt = Math.max(...Object.values(obj));
            const minPt = Math.min(...Object.values(obj));
            const maxtempArray=[];
            const mintempArray=[];
            console.log(tempArray);
            for(let i=1; i< wonList.length +1; i++){
                if(tempArray[i-1] == maxPt){
                    maxtempArray.push(i);
                    
                }else if(tempArray[i-1] == minPt){
                    mintempArray.push(i);
                }
            }
            const no_1 = maxtempArray[0];
            const no_2 = mintempArray[0];
            
            const edu = await axios.get(`https://inspct.career.go.kr/inspct/api/psycho/value/jobs?no1=${no_1}&no2=${no_2}`);
            console.log(edu);
            setEdu(edu.data);
            const major = await axios.get(`https://inspct.career.go.kr/inspct/api/psycho/value/majors?no1=${no_1}&no2=${no_2}`);
            setMajor(major.data);
            console.log(major);
            const category = {
                1:"능력발휘",
                2:"자율성",
                3:"보수",
                4:"안정성",
                5:"사회적 인정",
                6:'사회봉사',
                7:"자기계발",
                8:"창의성"
            };
            const importantList = maxtempArray.map((num)=> category[num]);
            const unimportantList = mintempArray.map((num)=> category[num])
            setImportant(importantList.join(', '));
            setUnimportant(unimportantList.join(', '));
        }
        Post()
    },[])

    function Gender({location}) {
        return (location.state.userGender == 100323 ? '남자' : '여자');

    }

    return(
        <div>
            <h1>직업가치관검사 결과표</h1>
            이름: {location.state.userName} <br/>
            성별: {gender}
            <p>직업가치관이란 직업을 선택할 때 영향을 끼치는 자신만의 믿음과 신념입니다.
            따라서 여러분의 직업생활과 관련하여 포기하지 않는 무게중심의 역할을 한다고 볼 수 있습니다.
            직업가치관검사는 여러분이 직업을 선택할 때 상대적으로 어떠한 가치를 중요하게 생각하는지를 알려줍니다.
            또한 본인이 가장 중요하게 생각하는 가치를 충족시켜줄 수 있는 직업에 대해 생각해 볼 기회를 제공합니다.
            </p>
            <strong><p>1. 직업가치관 결과</p></strong>
            <p>직업생활과 관련하여 서상훈님은 {important}(들)을 가장 중요하게 생각합니다.
            반면에 {unimportant}(들)은 상대적으로 덜 중요하게 생각합니다.</p>
            <p>{edu}</p>
            <p>{major}</p>

        </div>
    )
}