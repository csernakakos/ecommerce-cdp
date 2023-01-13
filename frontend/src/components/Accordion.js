
import { useState } from "react";
import { GoChevronDown } from "react-icons/go";
import { GoChevronLeft } from "react-icons/go";
import "../styles/Accordion.css";

export default function Accordion({ items, sendItemToBasket }) {
    const [ isExpanded, setIsExpanded ] = useState(false);
    const [ expandedIndex, setExpandedIndex] = useState(-1);
    const [ selection, setSelection ] = useState("Select size");

    const handleAccordionClick = () => {
        setIsExpanded(!isExpanded);
    };

    const handleAccordionItemClick = (item) => {
        if (!item.available) return;
        if (item.available) {
            setIsExpanded(false);
            setSelection(item.size);
        };

        sendItemToBasket(item);
    };

    const icon = (
        <span>
            {isExpanded ? <GoChevronDown /> : <GoChevronLeft />}
        </span>
    );

    const renderedItems = items.map((item) => {
        return (
            <div key={item.size} className={item.available ? "available" : "not-available"}>
                <>
                    <p onClick={() => handleAccordionItemClick(item)}>
                        <span className="item">{item.size}</span>
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