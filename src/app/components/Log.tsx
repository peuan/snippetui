import { useEffect } from "react";

interface LogProp {
    log: any
}
const Log = ({ log }: LogProp) => {
    useEffect(() => {
        console.log(log)
    }, [log])
    return (
        <div>{log}</div>
    );
}

export default Log;