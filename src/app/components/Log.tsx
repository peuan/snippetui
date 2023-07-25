import React, { useEffect, useState, useCallback } from 'react';
import { Hook, Console, Decode } from 'console-feed';

const ConsoleLog = ({ code }: { code: any }) => {
    const [logs, setLogs] = useState<any[]>([]);

    const getNumberStringWithWidth = useCallback((num: number, width: number) => {
        const str = num.toString();
        if (width > str.length) return '0'.repeat(width - str.length) + str;
        return str.substr(0, width);
    }, []);

    const getTimestamp = useCallback(() => {
        const date = new Date();
        const h = getNumberStringWithWidth(date.getHours(), 2);
        const min = getNumberStringWithWidth(date.getMinutes(), 2);
        const sec = getNumberStringWithWidth(date.getSeconds(), 2);
        const ms = getNumberStringWithWidth(date.getMilliseconds(), 3);
        return `${h}:${min}:${sec}.${ms}`;
    }, [getNumberStringWithWidth]);

    useEffect(() => {
        const logToState = (log: any) => {
            const decoded = Decode(log);
            decoded.timestamp = getTimestamp();
            setLogs((prevLogs) => [...prevLogs, decoded]);
        };

        // Hook the console and capture logs in state
        Hook(window.console, logToState);

        // Log a message to demonstrate the functionality
        console.log(code);

    }, [code, getTimestamp]);

    return (
        <div className='w-full h-full bg-transparent overflow-auto'>
            <Console logs={logs} variant='dark' />
        </div>
    );
};

export default ConsoleLog;
