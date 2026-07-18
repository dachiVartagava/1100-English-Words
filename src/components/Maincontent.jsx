import React from "react";
import { BookA,NotebookPen,ClipboardPenLine,Video,ArrowRight,Coffee} from 'lucide-react';
import Book from '../assets/book.png';
import Header from "./header";
export default function Maincontent(){
    return(
        <div className="maincontent">
            <Header/>
            <h1 className="maintext">+1100 week CU English Words</h1>
            <div className="mainitems">
                <div className="mainitem">
                <BookA className="BookA" />
                <span className="itemtext">
                    <h3>Grammar Book</h3>
                    <p>provide clear, step-by-step guides to mastering syntax, punctuation, and sentence structure.</p>
                </span>
                </div>
                <div className="mainitem">
                    <NotebookPen className="BookA" />
                    <span className="itemtext">
                    <h3>Keynote and other Quizes</h3>
                    <p>Learn Keynote and other Elemntary or Reading Explorer Words using tasks</p>
                    </span>
                </div>
                <div className="mainitem">
                    <ClipboardPenLine className="BookB" />
                    <span className="itemtext">
                    <h3>Week Quizes</h3>
                    <p>Learn Main and Other words using Tasks</p>
                    </span>
                </div>
                <div className="mainitem">
                    <Video className="BookA"/>
                    <span className="itemtext">
                    <h3>Senteced Made Videos</h3>
                    <p>Listen to Video Clips which help words move into actual memory.</p>
                    </span>
                </div>
            </div>
            <section className="nextCard">
                <img
                className="book"
                src={Book}
                />
                <div className="details">
                    <h5 className="detail">Learn more. Achieve more.</h5>
                    <p className="detail">Improve your English every day with our platform</p>
                </div>
                <div className="startbtn">
                    <h4>Start now</h4>
                    <ArrowRight className="arrowright"/>
                </div>
            </section>
            <section className="BuyCard">
                <div className="coffecard">
                <Coffee 
                className="Coffe"
                />
                <div className="Buydetails">
                    <h4>Buy me a coffee</h4>
                    <p>Support this project and help me keep it free for everyone</p>
                </div>
                </div>
                <button className="btncoffee">Buy me a coffe</button>
            </section>
        </div>
    );
}