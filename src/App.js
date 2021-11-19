import React, { useState } from "react";
import Chart from "./Chart";
import Input from "./Input";
import Detail from "./Detail";

function App(){
    const [category_list, setcategory_list] = useState(["Food","Clothes","Grocery"]);
    
    const [isOnClicked, onClickedChange] = useState(false);

    const [addItem, setAddItem] = useState([]);

    let [hasTransaction, setHasTransaction] = useState(0);

    const [isShrink, setIsShrink] = useState(true);
    

    function onClickedhandler(){
        onClickedChange(!isOnClicked);
    }

    function onShrinkHandler(v){
        setIsShrink(v);
    }

    function submitHandler(onAdd){
        console.log(onAdd)
        setAddItem((prevValue) =>
        {
            return[
                ...prevValue,
                onAdd,
            ];
        });
        onClickedChange(!isOnClicked);
        setHasTransaction(hasTransaction += 1);
        if((onAdd.category === "other") && (category_list.includes(onAdd.please_specify) === false)){
            setcategory_list((prevValue)=>{
                return [
                    ...prevValue, onAdd.please_specify,
                ]
            })
        }
    }

    function deleteHandler(id){
        setAddItem(addItem.filter((item,index)=>(
            index !== id)));
        setHasTransaction(hasTransaction -= 1);
    };

    return(
        <div className="app_body">

            <Chart show = {isShrink} addItem={addItem}/>


            <Input state = {isOnClicked} onSubmit = {submitHandler} category_list={category_list}/>

            <Detail items = {addItem} deleteItem = {deleteHandler} hasTransaction = {hasTransaction} show = {isShrink}  showHandler = {onShrinkHandler} onClickedhandler = {onClickedhandler} isOnClicked={isOnClicked}/>
        </div>
    );
}

export default App;