import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

function useCookie(key, initialValue) {
    const [value, setValue] = useState(() => {
        const cookieValue = Cookies.get(key);
        return cookieValue !== undefined ? cookieValue : initialValue;
    });

    useEffect(() => {
        Cookies.set(key, value);
    }, [key, value]);

    return [value, setValue];
}

export default useCookie;
