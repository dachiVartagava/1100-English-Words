 import Header from "./header";
 import Keyynote from "../assets/Keynote.png";
export default function Keynote(){
    return(
        <div className="Keynotepage">
            <Header/>
                <div className="grammaeritems">
                <img
                className="quizbook"
                src={Keyynote} />
                <div className="details">
                    <h4>Keynote and Others Quizzes</h4>
                    <p>Complete quizzes from Keynote and other important topics.</p>
                </div>
            </div>
             
        </div>
    );
}