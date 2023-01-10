
import { useState } from "react";
import { GoChevronDown } from "react-icons/go";
import { GoChevronLeft } from "react-icons/go";
import "../styles/Accordion.css";

export default function Accordion({ items }) {
    const [ isExpanded, setIsExpanded ] = useState(false);
    const [ expandedIndex, setExpandedIndex] = useState(-1);
    const [ selection, setSelection ] = useState("Select size");

    const handleAccordionClick = () => {
        setIsExpanded(!isExpanded);
        console.log("clicked", isExpanded)
    };

    const handleAccordionItemClick = (x) => {
        setIsExpanded(false);
        setSelection(x);
    };

    const icon = (
        <span>
            {isExpanded ? <GoChevronDown /> : <GoChevronLeft />}
        </span>
    );

    const renderedItems = items.map((item, index) => {
        const isExpanded = index === expandedIndex;
        return (
            <div key={item.size} className={item.available ? "available" : "not-available"}>
                <>
                    <p onClick={() => handleAccordionItemClick(item.size)}>
                        <span>{item.size}</span>
                        {!item.available && <span>Available in {item.availableInDays} days</span>  }
                    </p>
                </>
            </div>
        )
    })

    return (
    <div className="accordion">
        <button className="input-like" onClick={handleAccordionClick}>
            <span>{selection}</span>
            <span>{icon}</span>
        </button>
        <div className="accordion-list">{isExpanded && renderedItems}</div>
    </div>
    )
}