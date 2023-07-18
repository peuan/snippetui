"use client"
import CodeMirror from '@uiw/react-codemirror';
import { html } from '@codemirror/lang-html';
import { useCallback, useEffect, useState } from 'react';
import { githubDarkInit } from '@uiw/codemirror-theme-github';
import Preview from './Preview';
import { BiSolidMagicWand } from 'react-icons/bi'
import { html_beautify, HTMLBeautifyOptions } from 'js-beautify';
import debounce from 'lodash.debounce';
interface EditorProps {
    result: string
};

const options: HTMLBeautifyOptions = {
    wrap_attributes: 'force-aligned',
    indent_with_tabs: true
}

const Editor = ({ result }: EditorProps) => {
    const [code, setCode] = useState(result);


    const debouncedSetCode = useCallback(
        debounce((value: string) => {
            setCode(value);
        }, 50),
        []
    );

    const onChange = useCallback((value: any, viewUpdate: any): any => {
        debouncedSetCode(value);
    }, [debouncedSetCode]);

    const handleFormatSyntax = () => {
        const beautify = html_beautify(code, options);
        setCode(beautify);
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
                        value={code}
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
                            highlightActiveLine: true,
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