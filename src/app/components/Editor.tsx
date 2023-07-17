"use client"
import CodeMirror from '@uiw/react-codemirror';
import { html } from '@codemirror/lang-html';
import { useCallback, useState } from 'react';
import { tags as t } from '@lezer/highlight';
// import { atomoneInit } from '@uiw/codemirror-theme-atomone';
import { githubDarkInit } from '@uiw/codemirror-theme-github';
import Preview from './Preview';

interface EditorProps {
    result: string
};

const Editor = ({ result }: EditorProps) => {
    const [code, setCode] = useState(result)
    const onChange = useCallback((value: any, viewUpdate: any): any => {
        setCode(value)
    }, []);

    return (
        <>
            <div className='flex'>
                <div className='w-1/2'>
                    <CodeMirror
                        value={result}
                        minHeight="90vh"
                        maxHeight='90vh'
                        extensions={[html()]}
                        onChange={onChange}
                        theme={[githubDarkInit({
                            settings: {
                                caret: '#c6c6c6',
                            }
                        })]}
                        basicSetup={{
                            foldGutter: false,
                            dropCursor: false,
                            allowMultipleSelections: false,
                            indentOnInput: false,
                            highlightSelectionMatches: true,
                            autocompletion: true,
                            defaultKeymap: true
                        }}
                    />
                </div>
                <div className='w-1/2 bg-slate-800'>
                    <Preview code={code} />
                </div>
            </div>
        </>
    )
}

export default Editor;