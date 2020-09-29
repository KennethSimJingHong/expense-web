import React from "react";
import DeleteIcon from '@material-ui/icons/Delete';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

function Detail(props){

    const newList = [];

    const sortedList = props.items.sort((a, b) => new Date(a.date) - new Date(b.date));

    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ]

    sortedList.forEach(function(item){
        newList.push({
            year:new Date(item.date).getFullYear(), 
            month: months[new Date(item.date).getMonth()],
            date: item.date,
            title: item.title,
            amount: item.amount, 
            category: item.category,   
        })
    })


    function onClickHandler(){
        props.showHandler(!props.show)
    }

    let temp_month = "";
    let temp_year = "";

    function detail_list(title,amount,date,index){
        return (
            <ul className="detail_items">
            <li><span className="amt">{amount}</span><span className="title">{title}</span><span className="date">{date}</span><span className="delete"><DeleteIcon onClick={()=>props.deleteItem(index)}/></span></li>
            </ul>
        )
    }


    return( 
        <div className={"detail_cnt " + (props.show ? "detail_cnt_addon" : "")}  >
            {props.show ? 
                <ExpandLessIcon className= {"expand_more " + (props.show ? "expand_more_addon" : "")} onClick={onClickHandler} /> :
                <ExpandMoreIcon className="expand_more" onClick={onClickHandler} />
            }
            {!props.show ? 
            <div className="scroll">
            {
                props.hasTransaction ?
                
                    newList.map(function(item,index){
                        if((temp_year !== item.year) && (temp_month !== item.month)){
                            temp_year = item.year;
                            temp_month = item.month;
                            return (
                                <div key = {index} id = {index}>
                                    <div className="year_forlist">{item.year}</div>
                                    <div className="month_forlist">{item.month}</div>
                                    <div className="detail_items_collection">{detail_list(item.title,item.amount,item.date,index)}</div>
                                </div>
                            )
                        }else if((temp_year === item.year) && (temp_month !== item.month)){
                            temp_month = item.month;
                            return (
                                <div key = {index} id = {index}>
                                    <div className="month_forlist">{item.month }</div>
                                    {detail_list(item.title,item.amount,item.date,index)}
                                </div>
                            )
                        }else{
                            return (
                                <div key = {index} id = {index}>
                                {detail_list(item.title,item.amount,item.date,index)}
                                </div>
                            )
                        }

                    })
                    
                :

                <div className="no_transaction">No Transaction...</div>
            }</div> : <div></div>
            }
            <button className= {"input_btn " + (props.show ? "input_btn_addon" : "")} onClick={props.onClickedhandler}>{props.isOnClicked?<CloseIcon/>:<AddIcon/>} </button>
        </div>
    );
};

export default Detail;


/*

            {props.hasTransaction ?
            <ul className="detail_items">
                {props.items.map(function(item,index){
                    return(
                        <div key = {index} id = {index}>
                            <li><span className="amt">{item.amount}</span><span className="title">{item.title}</span><span className="date">{item.date}</span><span className="delete"><DeleteIcon onClick={()=>props.deleteItem(index)}/></span></li>
                        </div>
                    )
                })}
            </ul> 




                       <div className="no_transaction">No Transaction...</div>

            */


        