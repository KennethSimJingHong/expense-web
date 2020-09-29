import React from "react";
import { Doughnut } from "react-chartjs-2";

function PieChart(props){
    let category = [];
    let amount = [];

    props.category_array.forEach(function(e){
        if(e.category === "other"){
            category.push(e.please_specify);
        }else{
            category.push(e.category);
        }
        amount.push(e.amount);
    })

    
    let data = {
                labels: category,
                datasets: [
                  {
                    label: 'My First dataset',
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                    data: amount,
                  }
                ]
            }

    return (

        <div className= {"exp_chart_cont" + (props.show ? "" : "dt_cont_faded")}>

            <Doughnut data = {data}/>
        
        </div>
    )       
}

export default PieChart;