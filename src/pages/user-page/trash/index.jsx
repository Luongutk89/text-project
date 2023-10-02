
import { useState } from "react";
import HashLoader from "react-spinners/HashLoader";


const Trash = ({ }) => {
    let [loading, setLoading] = useState(true);

    return (
        <div className="sweet-loading">
            <HashLoader color="#36d7b7" size="100px" color="#3E96FF" />
        </div>
    );
}

export default Trash;
