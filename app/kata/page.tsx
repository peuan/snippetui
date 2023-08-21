"use client"
import CodeMirror, { ReactCodeMirrorRef } from "@uiw/react-codemirror"
import { useCallback, useEffect, useRef, useState } from "react"
import { javascript as JavaScriptLang } from "@codemirror/lang-javascript"
import debounce from "lodash.debounce"
import { githubDarkInit } from "@uiw/codemirror-theme-github"
import { HTMLBeautifyOptions, html_beautify } from "js-beautify"

import hljs from "highlight.js/lib/core"
import javascript from "highlight.js/lib/languages/javascript"
import { Button } from "@/components/ui/button"

import { useCheckKataMutation } from "@/redux/services/kataApi"

hljs.registerLanguage("javascript", javascript)

const Page = () => {
  const [checkCode, checkCodeResult] = useCheckKataMutation()

  useEffect(() => {
    console.log(checkCodeResult)
  }, [checkCodeResult])
  useEffect(() => {
    hljs.highlightAll()
  }, [])

  const consoNantValue = `
    function solve(s) {
        return 0;
    };`

  const testCases = [
    { testFunction: (output: any) => output === "zodiac" },
    { testFunction: (output: any) => output === "chruschtschov" },
    { testFunction: (output: any) => output === "khrushchev" },
    { testFunction: (output: any) => output === "strength" },
    { testFunction: (output: any) => output === "catchphrase" },
    { testFunction: (output: any) => output === "twelfthstreet" },
    { testFunction: (output: any) => output === "mischtschenkoana" },
    { testFunction: (output: any) => output === "az" },
  ]

  const simpleTestCase = `
    const chai = require("chai");
    const assert = chai.assert;
    chai.config.truncateThreshold=0;

    describe("Basic tests", function(){
      it("Should pass sample tests", function() {  
        assert.strictEqual(solve("zodiac"),26);
        assert.strictEqual(solve("chruschtschov"),80);
        assert.strictEqual(solve("khrushchev"),38);
        assert.strictEqual(solve("strength"),57);
        assert.strictEqual(solve("catchphrase"),73);
        assert.strictEqual(solve("twelfthstreet"),103);
        assert.strictEqual(solve("mischtschenkoana"),80);
        assert.strictEqual(solve("az"),26);
      });
    });
    `

  // formatter options
  const options: HTMLBeautifyOptions = {
    wrap_attributes: "force-aligned",
    indent_with_tabs: true,
  }

  const beautifyCode = html_beautify(consoNantValue, options)
  const beautifyTest = html_beautify(consoNantValue, options)
  const codeMirrorRef = useRef<ReactCodeMirrorRef>({})
  const testCaseRef = useRef<ReactCodeMirrorRef>({})
  const [editorCode, setEditorCode] = useState<string | undefined>(beautifyCode)
  const [testCode, setTestCode] = useState<string | undefined>(simpleTestCase)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSetCode = useCallback(
    debounce((value: string) => {
      setEditorCode(value)
    }, 50),
    []
  )

  const debouncedSetTest = useCallback(
    debounce((value: string) => {
      setTestCode(value)
    }, 50),
    []
  )

  const onCodeChange = useCallback(
    (value: any, viewUpdate: any): any => {
      debouncedSetCode(value)
    },
    [debouncedSetCode]
  )
  const onTestChange = useCallback(
    (value: any, viewUpdate: any): any => {
      debouncedSetTest(value)
    },
    [debouncedSetTest]
  )

  const checkTestCase = async () => {
    checkCode({ code: editorCode! })
  }
  return (
    <div className="w-full flex justify-between">
      <div className="w-1/2 ml-6 p-2">
        <div className="font-bold mb-2">Instructions</div>
        <div className="font-thin w-full bg-slate-800 p-4">
          <div
            dangerouslySetInnerHTML={{
              __html: `Given a lowercase string that has alphabetic characters only and no
          spaces, return the highest value of consonant substrings. Consonants
          are any letters of the alphabet except "aeiou". We shall assign the
          following values: a = 1, b = 2, c = 3, .... z = 26. For example, for
          the word "zodiacs", let's cross out the vowels. We get: "z o d ia cs"`,
            }}
          />
        </div>
        <div className="font-thin w-full bg-slate-800 p-4 mt-4">
          <div
            dangerouslySetInnerHTML={{
              __html: `-- The consonant substrings are: "z", "d" and "cs" and the values are z = 26, d = 4 and cs = 3 + 19 = 22. The highest is 26.
            solve("zodiacs") = 26

            For the word "strength", solve("strength") = 57
            -- The consonant substrings are: "str" and "ngth" with values "str" = 19 + 20 + 18 = 57 and "ngth" = 14 + 7 + 20 + 8 = 49. The highest is 57.`,
            }}
          />
        </div>
      </div>
      <div className="w-1/2 border-slate-300 dark:border-none p-2">
        <div className="font-bold mb-2">Solution</div>
        <CodeMirror
          ref={codeMirrorRef}
          value={editorCode}
          minHeight="calc(50vh - 135px)"
          maxHeight="calc(50vh - 135px)"
          extensions={[JavaScriptLang()]}
          onChange={onCodeChange}
          theme={[githubDarkInit()]}
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
        <div className="font-bold mb-2 mt-2">Sample Tests</div>
        <CodeMirror
          ref={testCaseRef}
          value={testCode}
          minHeight="calc(50vh - 135px)"
          maxHeight="calc(50vh - 135px)"
          extensions={[JavaScriptLang()]}
          onChange={onTestChange}
          theme={[githubDarkInit()]}
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
        <Button
          onClick={checkTestCase}
          variant={"outline"}
          className="w-20 mt-4 "
        >
          Test
        </Button>
      </div>
    </div>
  )
}

export default Page
