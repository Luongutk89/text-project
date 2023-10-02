import React, { useState } from 'react';
import { FiVolume2 } from "react-icons/fi";

const VocabularyTest2 = ({ wordPairs }) => {
    const [userAnswers, setUserAnswers] = useState([]);
    const [results, setResults] = useState([]);
    const [correctCount, setCorrectCount] = useState(0);
    const [incorrectCount, setIncorrectCount] = useState(0);

    const pairClass = (index) => {
        if (results[index] === 'correct') {
            return 'correct';
        } else if (results[index] === 'incorrect') {
            return 'incorrect';
        } else {
            return '';
        }
    };

    const checkAnswers = () => {
        let correct = 0;
        let incorrect = 0;

        const newResults = userAnswers.map((answer, index) => {
            if (answer && wordPairs[index]) {
                if (normalizeAnswer(answer) === normalizeAnswer(wordPairs[index].english)) {
                    correct++;
                    return 'correct';
                } else {
                    incorrect++;
                    return 'incorrect';
                }
            } else {
                return '';
            }
        });

        setResults(newResults);
        setCorrectCount(correct);
        setIncorrectCount(incorrect);
    };

    const normalizeAnswer = (answer) => {
        return answer.trim().toLowerCase();
    };

    const speakWord = (word) => {
        const speechSynthesis = window.speechSynthesis;
        if (speechSynthesis.speaking) {
            speechSynthesis.cancel();
        }

        const utterance = new SpeechSynthesisUtterance(word);
        utterance.lang = 'en-US';

        speechSynthesis.speak(utterance);
    };

    const resetAnswers = () => {
        setUserAnswers([]);
        setResults([]);
        setCorrectCount(0);
        setIncorrectCount(0);
    };

    const copyEnglishWord = (word) => {
        navigator.clipboard.writeText(word);
    };

    return (
        <div>
            <div className="test__container">
                {wordPairs.map((pair, index) => (
                    <div
                        key={index}
                        className={`word-pair ${pairClass(index)}`}
                    >
                        <div className="index">{index + 1}</div>
                        <div className="english-word" onClick={() => copyEnglishWord(pair.vietnamese)}>{pair.vietnamese}</div>
                        <button
                            className="btn__read"
                            onClick={() => speakWord(pair.vietnamese)}
                            tabIndex="-1"
                        >
                            <FiVolume2 className='icon__read' />
                        </button>
                        <input
                            className="input__ansers"
                            value={userAnswers[index] || ''}
                            onChange={(e) => {
                                const newAnswers = [...userAnswers];
                                newAnswers[index] = e.target.value;
                                setUserAnswers(newAnswers);
                            }}
                        />
                    </div>
                ))}
            </div>
            <div className='wp__foot'>
                <button className="btn__answers" onClick={checkAnswers}>
                    Trả lời
                </button>
                <p className='correct'>Tổng số câu đúng: {correctCount}</p>
                <p className='incorrect'>Tổng số câu sai: {incorrectCount}</p>
                <button className="btn__reset" onClick={resetAnswers}>
                    Làm lại
                </button>
            </div>
        </div>
    );
};

export default VocabularyTest2;
