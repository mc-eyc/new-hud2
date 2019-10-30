import { useState, useEffect, useRef } from 'react';
import PropTypes from "prop-types";

export const balanceType = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export const balancesType = {
  balances: PropTypes.arrayOf(PropTypes.shape(balanceType)).isRequired,
};

export const balancesDefaultType = {
  balances: [],
}

export const longestBalanceString = (balances = []) => balances.reduce((prev, cur) => Math.max(cur.title.length, cur.value.length, prev), 0);

export function useComponentVisible(initialIsVisible) {
    const [isComponentVisible, setIsComponentVisible] = useState(initialIsVisible);
    const ref = useRef(null);

    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setIsComponentVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    });

    return { ref, isComponentVisible, setIsComponentVisible };
}