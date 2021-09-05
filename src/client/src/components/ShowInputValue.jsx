import { useState,useEffect } from "react";

function ShowInputValue({ value, timeOut = 500 }) {
    const [animated, setanimated] = useState(false);

    useEffect(() => {
        setTimeout(() => setanimated(true), timeOut)
    }, []);

    return (
        <div className="">
            {
                animated &&
                <div className="Show-value">
                    <span className="spamSearchingFor">Searching for - </span>
                    <span className="Searchvalue">
                        {value}
                    </span>
                </div>
            }
        </div>
    )
}

export default ShowInputValue;