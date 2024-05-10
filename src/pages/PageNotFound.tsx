import { useEffect, useState } from 'react';

export const PageNotFound = () => {
    console.log("Page Not Found");
    const [data, setData] = useState<string>('');

    useEffect(() => {
        setData("Page Not Found");
    }, []);

    return (
        <div>{data}</div>
    );
}
