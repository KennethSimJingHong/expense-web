import React from "react";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

function Week(props){

    /*date format*/
    var options = {
        day: "numeric",
        month: "short",
    }

    return(
        <div className= {"dt_cont " + (!props.show ? "dt_cont_addOn" : "")}>
            <div className="displayYear"> 
                {
                    (props.showStartWeek.getFullYear() === props.showEndWeek.getFullYear()) ? 
                    (props.showStartWeek.getFullYear()) :
                    (props.showStartWeek.getFullYear() + " - " + props.showEndWeek.getFullYear())
                }
            </div>

            <ArrowBackIosIcon className="arrowLeftIcon" onClick={props.checkPreviousWeek}/>
            <div className="date_range"> {props.showStartWeek.toLocaleDateString("en", options) + " - " + props.showEndWeek.toLocaleDateString("en", options)}</div>
            { props.weekCount === 0 ? null : <ArrowForwardIosIcon className="arrowRightIcon" onClick={props.checkNextWeek}/>}
        </div>
    )
}

export default Week;