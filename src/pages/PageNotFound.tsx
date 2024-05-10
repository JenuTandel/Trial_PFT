import { useEffect, useState } from 'react';

export const PageNotFound = () => {
    const [data, setData] = useState<string>('');

    useEffect(() => {
        setData("Page Not Found");
    }, []);

    return (
        <div>{data}</div>
    );
}
