import React,{useEffect,useState} from 'react';
import Header from "./header";
import Footer from "./footer";
import Quiz from "../assets/Quiz.png";
import QuizPage from './Quizpages';
import { Link,useParams } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { Calendar,ArrowRight } from "lucide-react";
export default function Weekquizes(){
    const [weeks,setWeeks] = useState([]);
    const [loading,setLoading] = useState(true);
    useEffect(() =>{
    const fetchweeks = async () => {
        const {data,error} = await supabase
        .from("weeks")
        .select("id,name")
        .order("id",{ascending: true});
        if(!error && data){
            setWeeks(data);
        }
        setLoading(false);
    };
    fetchweeks();
    },[]);
    return(
        <div className="Weekpage">
           <Header/>
           <div className="grammaeritems">
                           <img
                           className="quizbook"
                           src={Quiz} />
                           <div className="details">
                               <h4>Weeks Quiz</h4>
                               <p>Complete weekly quizzes and text your English skills.</p>
                           </div>
                       </div>
                    <div className="weekcards">
                        {weeks.map((week) => (
                        <div className="cards">
                            <div className="carditems">
                                <Calendar className="calendar"/>
                                <h4>Week {week.id} Quiz</h4>
                            </div>
                            <p>8 Tasks</p>
                            <div className="quizbtn">
                                <Link to= {`/quiz/${week.id}`}><p>Start Quiz</p></Link>
                                <ArrowRight className="arrowright"/>
                            </div>
                        </div>
                        ))}
                    </div>
            <Footer/>
        </div>
    );
}