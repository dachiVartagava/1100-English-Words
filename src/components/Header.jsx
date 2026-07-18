import React, {useState} from "react";
import logo from "../assets/logo.png"
import { Link } from "react-router-dom";
import { ChevronUp, ChevronDown, Search, X, BookOpen, Layers, Calendar } from "lucide-react";
import {supabase} from "../supabaseClient";
export default function Header(){
    const [isOpen,setIsOpen] = useState(true); 
    const [searchTerm,setSearchTerm] = useState("");
    const [foundWord,setFoundWord] = useState(null);
    const [loading,setLoading] = useState(false);
    const [errorMsg,setErrorMsg] = useState("");
    const handleSearch = async () =>{
        if(!searchTerm.trim()) return;
        setLoading(true);
        setErrorMsg("");
        setFoundWord(null);
        const {data,error} = await supabase
        .from("words")
        .select("*")
        .ilike("word",searchTerm.trim());
        if(!error && data && data.length >0){
            setFoundWord(data[0]);
            setLoading(false);
        }else{
            try{
                const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchTerm.trim()}`);
                if(!response.ok){
                    throw new Error("Can't find ,please try again.")
                }
                const apidata = await response.json();
                const wordInfo = apidata[0];
                setFoundWord({
                    word:wordInfo.word,
                    phonetics:wordInfo.phonetics.audio,
                    definition_en: wordInfo.meanings[0].definitions[0].definition,
                    example: wordInfo.meanings[0].definitions[0].example || "No example available"
                });
            } catch (apiError){
                setErrorMsg("This word was not found neither in 1100 words and in global words!!!!")
            } finally{
                setLoading(false);
            }
        }
    };
    const handleKeyDown = (e) =>{
        if(e.key === "Enter"){
            handleSearch();
        }
    };
    const closeResult = () =>{
        setFoundWord(null);
        setErrorMsg("");
        setSearchTerm("");
    };
    return(
        <>
        <div className={`headercontent ${isOpen ? "" : "hidden-header"}`}>
            <div className="leftitem">
                <img
                className="logo"
                src={logo}
                />
                </div>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/grammar">Grammar</Link></li>
                    <li><Link to="/weekquizes">Week Quizes</Link></li>
                    <li><Link to="/keynote">Keynote and Others Quizes</Link></li>
                </ul>
            </nav>
            <div className="rightitems">
                <input type="search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} onKeyDown={handleKeyDown} placeholder="Write a word..."/>
                <button className="searchbtn" onClick={handleSearch}>Search</button>
            </div>
        </div>
        {errorMsg && (
            <div className="somewindow">
                <p>{errorMsg}</p>
                <X className="close" onClick={closeResult}/>
            </div>
        )}
       {foundWord && (
                <div className="somewindow">
                    <h3 className="word">Word : <span className="wword">{foundWord.word}</span></h3>
                    <h2 className="worda">Definition : <span className="wword">{foundWord.definition_en}</span></h2>
                    <h2 className="word">Georgian Definition : <span className="wword">{foundWord.definition_ka}</span></h2>
                    <h4 className="word">Derivatives : <span className="wword">{foundWord.derivatives}</span></h4>
                    <X className="close" onClick={closeResult}/>
                </div>
            )}
        <button className={`toggle-header-btn ${isOpen ? "is-open" : "is-closed"}`} onClick={() => setIsOpen(!isOpen)}>{isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}</button>
        </>
    );
}