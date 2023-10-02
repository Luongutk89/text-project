import React, { useState, useEffect } from 'react';
import VocabularyTest from "../../../components/VocabularyTest";
import Collapsible from "../../../components/Collapsible";
import { topicsArr } from "../../../data";
import HashLoader from "react-spinners/HashLoader";

const Todo = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 300);
    }, []);

    return (
        <div className="todo__container">
            {loading ? (
                <div className="sweet-loading">
                    <HashLoader size="50px" color="#3E96FF" />
                </div>
            ) : (
                topicsArr.map((item, index) => (
                    <Collapsible
                        key={index}
                        title={item.title}
                        totalVocabulary={item.wordList.length}
                    >
                        <VocabularyTest wordPairs={item.wordList} />
                    </Collapsible>
                ))
            )}
        </div>
    );
}

export default Todo;
