 import {useState} from 'react';
 import Header from "./header";
 import mainitem from "../assets/grammarbook.png"
export default function Grammar(){
    const [isShow,setIsShown] = useState(false);
    return(
        <div className="grammarpage">
            <Header/>
            <div className="grammaeritems">
                <img
                className="grammarbook"
                src={mainitem} />
                <div className="details">
                    <h4>Excercising in Grammar B1/B2/C1</h4>
                    <p>Grammar Explaination is taken from Keynote</p>
                </div>
            </div>
            <div className="explainatio"> {/*აქ უნდა ჩავწერო დინამიურად backend-იდან სახელები და ახსნები */}

            </div>
        </div>
    );
}