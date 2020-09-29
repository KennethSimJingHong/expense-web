import React, {useState} from "react";
import BarChart from "./BarChart";
import PieChart from "./PieChart";
import Week from "./Week";
import dead from "./source/dead.png";

function Chart(props){
    /*for small website height, will include a button to show graph*/

    const [changeChart,setChangeChart] = useState("Pie Chart");

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
    const chart_array = [0,0,0,0,0,0,0];
    const category_array = [];

    /*category array*/

    /* 1. make sure does not surpass the non existing week by stopping at 0 as current week*/
    /* 2. count which week to show */
    let [weekCount, setWeekCount] = useState(0);

    const addItem = props.addItem.sort((a, b) => new Date(a.date) - new Date(b.date));

    function createChartData(){
        addItem.forEach(function(item,index){
            if(
                new Date(showStartWeek.getFullYear(), showStartWeek.getMonth(), showStartWeek.getDate()) <= new Date(new Date(item.date).getFullYear(), new Date(item.date).getMonth(), new Date(item.date).getDate()) &&
                new Date(showEndWeek.getFullYear(), showEndWeek.getMonth(), showEndWeek.getDate()) >= new Date(new Date(item.date).getFullYear(), new Date(item.date).getMonth(), new Date(item.date).getDate())
            ){
                let category_i = category_array.map(function(e){return e.category; }).indexOf(item.category);

                if(category_array.length !== 0){
                    if(category_i !== -1){
                        category_array[category_i].amount = parseFloat(category_array[category_i].amount) + parseFloat(item.amount);
                    }else{
                        if(item.category === "other"){
                            category_array.push({amount:parseFloat(item.amount),category:item.category});
                        }else{
                            category_array.push({amount:parseFloat(item.amount),specify:item.please_specify,category:item.category});
                        }
                    }
                }else{
                    
                    category_array.push({amount:parseFloat(item.amount),category:item.category});
                }

                chart_array[new Date(item.date).getDay()] = parseFloat(chart_array[new Date(item.date).getDay()]) + parseFloat(item.amount);
            }
        })
    }

    createChartData();
    
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
    function onclickHandler(){
        if(changeChart === "Pie Chart"){
            setChangeChart("Bar Chart");
        }else if(changeChart === "Bar Chart"){
            setChangeChart("Pie Chart");
        }
    }

    return (
        <div className="chart_cont">
            <Week showStartWeek={showStartWeek} showEndWeek={showEndWeek} checkPreviousWeek = {checkPreviousWeek} checkNextWeek = {checkNextWeek} weekCount = {weekCount} show = {props.show} />
            {chart_array.every(item => item === 0) ? <div className="no_result_cnt"><img src={dead} alt="empty"></img> <div className="no_result" style={{fontSize:"500%"}}>No result</div></div> :
                (
                (window.innerHeight <= 650) ? 
                    
                    <div>
                        { changeChart === "Pie Chart" && <PieChart category_array= {category_array} show = {props.show} />}
                        { changeChart === "Bar Chart" && <BarChart showStartWeek={showStartWeek} chart_array= {chart_array} show = {props.show} />}
                        <button className = "changeChartBtn" onClick={onclickHandler}>{changeChart}</button>
                    </div>

                :

                    <div>
                        <BarChart showStartWeek={showStartWeek} chart_array= {chart_array} show = {props.show} />
                        <PieChart category_array= {category_array} show = {props.show} />
                    </div>
                )
            }

        </div>
    )
}

export default Chart;