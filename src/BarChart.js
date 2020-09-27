import React, { useState } from "react";

function BarChart(props){
    const [isClicked,setIsClicked] = useState(false); /*whether to show detail box*/
    const [selectIndex,setSelectIndex] = useState(-1); /*which detail box should be shown based on index*/
    const [prevIndex,setPrevIndex] = useState(-1);/*show up specific index of detail box and hide the previous one*/

    /* to able to find out total transaction made of one week*/
    let total = 0;
    props.chart_array.forEach(function(amt){
        total += amt;
    })

    /* manage detail box*/
    function onClickHandler(index){
        if (prevIndex === index){
            setIsClicked(!isClicked);
        }else{
            setIsClicked(true);
        }
        setSelectIndex(index);
        setPrevIndex(index);
    }



    return <div className={"exp_chart_cont " + (props.show ? "" : "exp_chart_cont_addon")}>
            <div className="y_axis"></div>
            <div className="x_axis"></div>
            <div className="sf_day">
                <span>S</span>
                <span>M</span>
                <span>T</span>
                <span>W</span>
                <span>T</span>
                <span>F</span>
                <span className="lastspan">S</span>
            </div>

            <div className="bar_chart_cont">
                <ul className="exp_chart">
                {isClicked && <div className= "detail_box">RM{props.chart_array[selectIndex]} <br/> {new Date(props.showStartWeek.getFullYear(), props.showStartWeek.getMonth(), props.showStartWeek.getDate() - selectIndex).toLocaleDateString('en-US')} </div>}
                {
                    props.chart_array.map(function(bar,index){
                        return(
                            <li key={index} id = {index} onClick={()=>onClickHandler(index)} className="chart_item">
                            {
                                !(bar === 0) &&
                            <span className="chart_line" style = {{height: ((bar / total) * 100) + "%"}}></span>}
                            </li>
                        )
                    })
                }
                </ul>
            </div> 

    </div>
}

export default BarChart;
