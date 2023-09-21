import React from 'react';
import './Counter.scss'

const Counter = ({setNum, basket, num, setBasket}) => {

    return (
        <div className="counter">
            <div className="counter__button" onClick={() => {
                setBasket( num === 1 ? basket - 1 : basket)
                setNum(num - 1)
            }}
            >-</div>
            <p>{num}</p>
            <div className="counter__button" onClick={() => {
                setNum(num + 1)
            }}>+</div>
        </div>
    );
};

export default Counter;
