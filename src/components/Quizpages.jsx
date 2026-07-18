import React,{useEffect,useState} from 'react';
import { supabase } from "../supabaseClient";
import { useParams } from "react-router-dom";
import Header from "./header";
export default function QuizPage(){
    const {id} = useParams();
    const [words, setWords] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() =>{
        const fetchweeks = async () => {
            const {data,error} = await supabase
            .from("Week_tasks")
            .select("*")
            .eq("week_id",id)
            if(!error && data){
                setWords(data);
            }
            setLoading(false);
        };
        if (id){
        fetchweeks();
        }
        },[id]);
    const onlyWordNames = words.map(w => w.word);
    const halfindex = Math.ceil(onlyWordNames.length / 2);
    const firstpartwords = onlyWordNames.slice(0,halfindex);
    const secondpartwords = onlyWordNames.slice(halfindex);
    return(
        <div className="Quispage">
            <Header/>
            <div className='weekstore'>
            <h1 style={{ color: "#0f172a" }}> Week {id} - Vocabulary Quiz</h1>
            <p style={{ color: "#64748b" }}>This quiz will test your knowledge on {words.length} words from Week {id}.</p>
            </div>
            <p className='firstpart'>Test your knowledge on the remaining {firstpartwords}, {secondpartwords}</p>


        </div>
    );
}