import React, { useState } from "react";
import Chart from "./Chart";
import Input from "./Input";
import Detail from "./Detail";


class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {apiResponse:""};
    }

    callAPI(){
        fetch("http://localhost:9000/testAPI")
        .then(res => res.text())
        .then(res => this.setState({apiResponse: res}));
    }

    componentWillMount(){
        this.callAPI();
    }
}


function App(){
    let category_list = ["Food","Clothes","Grocery"];
    
    const [isOnClicked, onClickedChange] = useState(false);

    const [addItem, setAddItem] = useState([]);

    const totalUp = [];

    let [hasTransaction, setHasTransaction] = useState(0);

    const [isShrink, setIsShrink] = useState(true);
    

    function onClickedhandler(){
        onClickedChange(!isOnClicked);
    }

    function onShrinkHandler(v){
        setIsShrink(v);
    }

    function submitHandler(onAdd){
        setAddItem((prevValue) =>
        {
            return[
                ...prevValue,
                onAdd,
            ];
        });
        onClickedChange(!isOnClicked);
        setHasTransaction(hasTransaction += 1);
        if(onAdd.category === "other"){
            category_list.push(onAdd.category);
        }
    }

    function deleteHandler(id){
        setAddItem(addItem.filter((item,index)=>(
            index !== id)));
        setHasTransaction(hasTransaction -= 1);
    };

    calculation();

    function calculation(){   
        addItem.forEach(function(item){
            var index =  totalUp.map(function(e) {return e.date; }).indexOf(item.date);
            if(totalUp.length !== 0){
                if(index !== -1){
                    totalUp[index].amount = parseFloat(totalUp[index].amount) + parseFloat(item.amount);
                }else{
                    totalUp.push({date:item.date,amount:parseFloat(item.amount),category:item.category});
                }
            }else{
                
                totalUp.push({date:item.date,amount:parseFloat(item.amount),category:item.category});
            }
        })     
    }

    return(
        <div className="app_body">

            <Chart totalUp = {totalUp} show = {isShrink} />


            <Input state = {isOnClicked} onSubmit = {submitHandler} category_list={category_list}/>

            <Detail items = {addItem} deleteItem = {deleteHandler} hasTransaction = {hasTransaction} show = {isShrink}  showHandler = {onShrinkHandler} onClickedhandler = {onClickedhandler} isOnClicked={isOnClicked}/>
        </div>
    );
}

export default App;