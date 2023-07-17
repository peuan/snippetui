"use client"
import CodeMirror from '@uiw/react-codemirror';
import { html } from '@codemirror/lang-html';
import { useCallback, useEffect, useState } from 'react';
import { tags as t } from '@lezer/highlight';
// import { atomoneInit } from '@uiw/codemirror-theme-atomone';
import { githubDarkInit } from '@uiw/codemirror-theme-github';
import Preview from './Preview';
import { BiSolidMagicWand } from 'react-icons/bi'
import { Button } from '@nextui-org/react';
interface EditorProps {
    result: string
};


const Editor = ({ result }: EditorProps) => {
    const [code, setCode] = useState(result)
    const onChange = useCallback((value: any, viewUpdate: any): any => {
        setCode(value)
    }, []);

    const handleFormatSyntax = () => {
        console.log('heelo')
    }

    return (
        <div>
            <div className='flex justify-center items-center py-2'>
                <div className='flex justify-center items-center'>
                    <button onClick={(() => handleFormatSyntax())} className='flex justify-center items-center h-6 w-6 rounded-full bg-blue-600 hover:bg-blue-700'>
                        <BiSolidMagicWand className='text-green-500' />
                    </button>

                </div>
                <div className='text-slate-500 text-sm text-right ml-2'>{code?.trim().length} {" "}characters</div>
            </div>
            <div className='lg:flex'>
                <div className='w-full lg:w-1/2 border-stone-600'>
                    <CodeMirror
                        value={result}
                        minHeight="calc(100vh - 80px)"
                        maxHeight='calc(100vh - 80px)'
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
                            defaultKeymap: true,
                            closeBrackets: true,
                        }}
                    />
                </div>
                <div className='w-full lg:w-1/2 bg-slate-800'>
                    <Preview code={code} />
                </div>
            </div>
        </div>
    )
}

export default Editor;