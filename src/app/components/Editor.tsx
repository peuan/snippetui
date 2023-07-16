"use client"
import CodeMirror from '@uiw/react-codemirror';
import { html } from '@codemirror/lang-html';
import { useCallback } from 'react';
import { tags as t } from '@lezer/highlight';
import { atomoneInit } from '@uiw/codemirror-theme-atomone';


const Editor = () => {

    const onChange = useCallback((value: any, viewUpdate: any): any => {
        console.log('value:', value);
    }, []);

    return (
        <>
            <CodeMirror
                value="<h1>hello</h1>"
                minHeight="90vh"
                extensions={[html()]}
                onChange={onChange}
                theme={atomoneInit({
                    settings: {
                        caret: '#c6c6c6',
                        fontFamily: 'monospace',
                    },
                    styles: [
                        { tag: t.comment, color: '#6272a4' },
                    ]
                })}
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
        </>
    )
}

export default Editor;