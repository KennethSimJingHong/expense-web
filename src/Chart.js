import React, {useState} from "react";
import BarChart from "./BarChart";
import PieChart from "./PieChart";
import Week from "./Week";
import dead from "./source/dead.png";

function Chart(props){

    /* show today date, first day of this week, & last day of this week*/
    const currentDate = new Date();
    const currentStartDate = new Date();
    const currentEndDate = new Date();
    currentStartDate.setDate(currentDate.getDate() - currentDate.getDay());
    currentEndDate.setDate(currentStartDate.getDate() + 6);

    /* view all other week records*/
    const [showStartWeek, setShowStartWeek] = useState(currentStartDate);
    const [showEndWeek, setShowEndWeek] = useState(currentEndDate);

    /* date layout*/
    let chart_array = [0,0,0,0,0,0,0];

    const category_array = [];

    /*category array*/

    /* 1. make sure does not surpass the non existing week by stopping at 0 as current week*/
    /* 2. count which week to show */
    let [weekCount, setWeekCount] = useState(0);

    /* rearrange the transaction list in sequence based on date*/
    const sortedTotalUp = props.totalUp.sort((a, b) => new Date(a.date) - new Date(b.date));
    sortedTotalUp.forEach(function(item,index){
        if (
            new Date(showStartWeek.getFullYear(), showStartWeek.getMonth(), showStartWeek.getDate()) <= new Date(new Date(item.date).getFullYear(), new Date(item.date).getMonth(), new Date(item.date).getDate()) &&
            new Date(showEndWeek.getFullYear(), showEndWeek.getMonth(), showEndWeek.getDate()) >= new Date(new Date(item.date).getFullYear(), new Date(item.date).getMonth(), new Date(item.date).getDate())
        ){
            chart_array[new Date(item.date).getDay()] = item.amount;
            /* arrange a week amount based on category*/
            var i =  category_array.map(function(e) {return e.category; }).indexOf(item.category);
            if(category_array.length !== 0){
                if(i !== -1){
                    category_array[index].amount = parseFloat(category_array[index].amount) + parseFloat(item.amount);
                }else{
                    category_array.push({amount:parseFloat(item.amount),category:item.category});
                }
            }else{
                
                category_array.push({amount:parseFloat(item.amount),category:item.category});
            } 
        }
    })

    
    /* check past week transaction*/
    function checkPreviousWeek(){
        showStartWeek.setDate(showStartWeek.getDate() - 7);
        showEndWeek.setDate(showEndWeek.getDate() - 7);  
        setShowStartWeek(showStartWeek);
        setShowEndWeek(showEndWeek);
        setWeekCount(weekCount += 1);
    }

    function checkNextWeek(){
        if (weekCount > 0){
            showStartWeek.setDate(showStartWeek.getDate() + 7);
            showEndWeek.setDate(showEndWeek.getDate() + 7); 
            setShowStartWeek(showStartWeek);
            setShowEndWeek(showEndWeek);
            setWeekCount(weekCount -= 1);
        }
    }

    return (
        <div>
            <Week showStartWeek={showStartWeek} showEndWeek={showEndWeek} checkPreviousWeek = {checkPreviousWeek} checkNextWeek = {checkNextWeek} weekCount = {weekCount} show = {props.show} />
            { chart_array.every(item => item === 0) ? <div className="no_result_cnt"><img src={dead} alt="empty"></img> <div className="no_transaction" style={{fontSize:"500%"}}>No result</div></div> :
                <div>
                    <BarChart showStartWeek={showStartWeek} chart_array= {chart_array} show = {props.show} />
                    <PieChart category_array= {category_array} show = {props.show} />
                </div>
            }

        </div>
    )
}

export default Chart;