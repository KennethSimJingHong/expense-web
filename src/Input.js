import React, { useState } from "react";
import CheckIcon from '@material-ui/icons/Check';

function Input(props){


    const [isChange, setChanged] = useState({
        title:"",
        amount:0,
        category:"Food",
        date:"",
        please_specify:""
    });

    const [hasChooseOther, setHasChooseOther] = useState(false);

    function changeHandler(event){
        const {value,name} = event.target;
        if(name === "category"){
            if(value === "other"){
                setHasChooseOther(true);
            }else{
                setHasChooseOther(false);
            }
        }

        setChanged((prevValue) =>
        {
            return{
                ...prevValue,
                [name]:value,
            };
        });

    }

    return(
        <div className={"input_cnt " + (props.state ? "fadein" : "")}>
            <div className="form">
                <input type="text" name="title" onChange={changeHandler} placeholder="Title" autoComplete="off"></input>
                <input type="number" step=".01" name="amount" onChange={changeHandler} placeholder="Amount" autoComplete="off"></input>
                <input type="date" name="date"  onChange={changeHandler} max = {new Date().toISOString().split("T")[0]}></input>
                <select name="category" id="category_option" onChange={changeHandler}>
                    {
                        props.category_list.map(function(item, index){
                            return <option key={index} value={item}>{item}</option>
                        })
                    }
                    <option value="other">Other</option>
                </select> 
                {hasChooseOther && <input type='text' name='please_specify' placeholder='Please specify' onChange={changeHandler}/>
                }  
                <button className="input_btn ok_btn" onClick={()=> props.onSubmit(isChange)}><CheckIcon/></button>
            </div>
        </div>
    );
}

export default Input;