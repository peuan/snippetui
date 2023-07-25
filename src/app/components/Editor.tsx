"use client"
import { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation'

import CodeMirror, { ReactCodeMirrorRef } from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { html } from '@codemirror/lang-html';
import { githubDarkInit } from '@uiw/codemirror-theme-github';


import clsx from 'clsx';
import { Panel, PanelGroup } from 'react-resizable-panels'
import { BiSolidMagicWand, BiDownload } from 'react-icons/bi'
import { html_beautify, HTMLBeautifyOptions } from 'js-beautify';
import Particles from "react-particles";
import debounce from 'lodash.debounce';
import { loadFull } from "tsparticles";
import type { Container, Engine } from "tsparticles-engine";
import { ReloadIcon } from "@radix-ui/react-icons"
import {
    FacebookShareButton,
    FacebookIcon,
} from 'next-share'

import Preview from './Preview';
import { Button } from './ui/button';

import { IPlayground } from '@/interfaces/IPlayground';
import { WEBSITE_LINK } from '@/config';
import ResizeHandle from './ResizeHandle';
import Log from './Log';


var minLines = 0;
var startingValue = '';
for (var i = 0; i < minLines; i++) {
    startingValue += '\n';
}

const Editor = ({ code, isLoading }: IPlayground) => {



    const [editorCode, setEditorCode] = useState<string | undefined>(code);
    let particlesContainer = useRef<Container>(null)
    const [downloadUrl, setDownloadUrl] = useState("");
    const [isDownload, setIsDownload] = useState(false);
    const [imagePath, setImagePath] = useState("");
    const [isShowLog, setIsShowLog] = useState(false);


    const defaultLayout = [50, 50, 50]
    const codeMirrorRef = useRef<ReactCodeMirrorRef>({});

    const pathName = usePathname()


    const onLayout = (sizes: number[]) => {
        document.cookie = `react-resizable-panels:layout=${JSON.stringify(sizes)}`;
    };

    // formatter options
    const options: HTMLBeautifyOptions = {
        wrap_attributes: 'force-aligned',
        indent_with_tabs: true
    }



    const executeCode = (code: string) => {
        console.log(code)
    };


    const debouncedExcuteCode = useCallback(
        debounce(async (value: string) => {
            executeCode(value)
        }, 100),
        []
    );

    useEffect(() => {
        setEditorCode(code)
    }, [code])

    useEffect(() => {
        // Example usage:

        if (editorCode) {
            debouncedExcuteCode(editorCode)
        }
        // if (codeMirrorRef.current?.view) {
        // };
        // if (codeMirrorRef.current?.state) {
        //     let code = codeMirrorRef.current?.state.doc.toString();
        //     // console.log(code)

        //     // console.log('EditorState:', codeMirrorRef.current?.state);
        // }
        // if (codeMirrorRef.current?.editor) {
        //     // console.log('HTMLDivElement:', codeMirrorRef.current?.editor);
        // }

    }, [code, debouncedExcuteCode, editorCode]);

    // particle effect
    const particlesInit = useCallback(async (engine: Engine) => {
        await loadFull(engine);
    }, []);

    const particlesLoaded = useCallback(async (container: Container | undefined) => {
        container?.stop();
    }, []);


    // debounced 50 millisecond before set to the state

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedSetCode = useCallback(
        debounce((value: string) => {
            setEditorCode(value);
        }, 50),
        []
    );

    const onChange = useCallback((value: any, viewUpdate: any): any => {
        debouncedSetCode(value);
    }, [debouncedSetCode]);


    // handle formatter
    const handleFormatSyntax = () => {
        particlesContainer.current?.start();
        setTimeout(() => {
            particlesContainer.current?.stop();
        }, 2000)
        if (code) {
            const beautify = html_beautify(code, options);
            setEditorCode(beautify);
        }
    }

    // handle download image
    const handleDownloadImage = async () => {
        setIsDownload(true)
        try {
            const response = await fetch("/api/convert-to-image", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ htmlContent: editorCode }),
            });
            if (response.ok) {

                const arrayBuffer = await response.arrayBuffer();
                const base64String = btoa(
                    new Uint8Array(arrayBuffer).reduce(
                        (data, byte) => data + String.fromCharCode(byte),
                        ""
                    )
                );

                const imagePathHeader = response.headers.get("X-Image-Path");
                if (imagePathHeader) {
                    const imgPath = imagePathHeader.split('/').pop();
                    if (imgPath) {
                        console.log(imgPath)
                        setImagePath(imagePath);
                    }
                }

                setDownloadUrl(`data:image/png;base64,${base64String}`);
            }

        } finally {
            setIsDownload(false)
        }
    }



    useEffect(() => {
        if (downloadUrl && !isDownload) {
            const link = document.createElement("a");
            link.href = downloadUrl;
            link.download = `${+new Date()}.png`;
            link.click();
        }
    }, [downloadUrl, isDownload]);


    return (
        <div className='mt-2'>

            <Particles container={particlesContainer} id="tsparticles" loaded={particlesLoaded} init={particlesInit}
                options={{
                    "fullScreen": {
                        "zIndex": 1
                    },
                    "emitters": {
                        "position": {
                            "x": 50,
                            "y": 100
                        },
                        "rate": {
                            "quantity": 5,
                            "delay": 0.15
                        }
                    },
                    "particles": {
                        "color": {
                            "value": [
                                "#1E00FF",
                                "#FF0061",
                                "#E1FF00",
                                "#00FF9E"
                            ]
                        },
                        "move": {
                            "decay": 0.05,
                            "direction": "top",
                            "enable": true,
                            "gravity": {
                                "enable": true
                            },
                            "outModes": {
                                "top": "none",
                                "default": "destroy"
                            },
                            "speed": {
                                "min": 50,
                                "max": 100
                            }
                        },
                        "number": {
                            "value": 0
                        },
                        "opacity": {
                            "value": 1
                        },
                        "rotate": {
                            "value": {
                                "min": 0,
                                "max": 360
                            },
                            "direction": "random",
                            "animation": {
                                "enable": true,
                                "speed": 30
                            }
                        },
                        "tilt": {
                            "direction": "random",
                            "enable": true,
                            "value": {
                                "min": 0,
                                "max": 360
                            },
                            "animation": {
                                "enable": true,
                                "speed": 30
                            }
                        },
                        "size": {
                            "value": 3,
                            "animation": {
                                "enable": true,
                                "startValue": "min",
                                "count": 1,
                                "speed": 16,
                                "sync": true
                            }
                        },
                        "roll": {
                            "darken": {
                                "enable": true,
                                "value": 25
                            },
                            "enlighten": {
                                "enable": true,
                                "value": 25
                            },
                            "enable": true,
                            "speed": {
                                "min": 5,
                                "max": 15
                            }
                        },
                        "wobble": {
                            "distance": 30,
                            "enable": true,
                            "speed": {
                                "min": -7,
                                "max": 7
                            }
                        },
                        "shape": {
                            "type": [
                                "circle",
                                "square"
                            ],
                            "options": {}
                        }
                    },
                    "responsive": [
                        {
                            "maxWidth": 1024,
                            "options": {
                                "particles": {
                                    "move": {
                                        "speed": {
                                            "min": 33,
                                            "max": 66
                                        }
                                    }
                                }
                            }
                        }
                    ]

                }}
            />


            <div className='flex justify-center items-center px-2 my-2  absolute z-[1] lg:top-[55px] top-[155px]  lg:right-0 right-2'>
                <div className='flex justify-center items-center'>
                    <Button size={'sm'} variant={'outline'} onClick={(() => handleFormatSyntax())} className='flex justify-center items-center rounded-full bg-indigo-500 hover:bg-indigo-600 border-none'>
                        <BiSolidMagicWand className='text-white' />
                    </Button>
                </div>
                <div className='text-white text-sm text-right ml-2'>{code?.trim().length || 0} {" "}characters</div>
                <Button disabled={isDownload || !editorCode} size={'sm'} variant={'outline'} onClick={(() => handleDownloadImage())} className='ml-2 flex justify-center items-center rounded-full bg-indigo-500 hover:bg-indigo-600 border-none'>
                    {!isDownload && (
                        <BiDownload className='text-white' />
                    )}

                    {isDownload && (
                        <ReloadIcon className="h-4 w-4 animate-spin" />
                    )}
                </Button>
                <div className='ml-2 mr-2 mt-2'>
                    <FacebookShareButton
                        url={`${WEBSITE_LINK}${pathName}`}
                        quote={'Begin Your Coding Journey Here.'}
                        hashtag={'#snippetui'}
                    >
                        <FacebookIcon size={25} round />
                    </FacebookShareButton>
                </div>
            </div>

            <div className='lg:flex'>
                <PanelGroup direction="horizontal" onLayout={onLayout}>
                    <Panel id="panel-1" order={1} defaultSize={defaultLayout[0]} className=''>
                        <div className='w-full border-stone-600'>
                            <CodeMirror
                                ref={codeMirrorRef}
                                value={editorCode}
                                minHeight="calc(100vh - 110px)"
                                maxHeight='calc(100vh - 110px)'
                                extensions={[html(), javascript()]}
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
                    </Panel>
                    <ResizeHandle />
                    <Panel id="panel-2" order={2} defaultSize={defaultLayout[1]}>
                        <PanelGroup direction="vertical" onLayout={onLayout}>
                            <Panel id="panel-3" order={3} defaultSize={defaultLayout[1]}>
                                <div className="h-full bg-slate-800 flex justify-center items-center">
                                    <Preview isLoading={isLoading} code={editorCode} />
                                </div>
                            </Panel>
                            {isShowLog && (
                                <>
                                    <ResizeHandle className='rotate-90' />
                                    <Panel id="panel-4" order={4} defaultSize={defaultLayout[2]} collapsible={true}
                                    >
                                        <div className="h-full flex justify-center items-center">
                                            <Log />
                                        </div>
                                    </Panel>
                                </>
                            )}
                            <Button onClick={(() => setIsShowLog(!isShowLog))} className='w-20 h-6 my-2 bg-slate-700 text-white border-none rounded-none' size={'default'} variant={'outline'}>LOG</Button>
                        </PanelGroup>
                    </Panel>
                </PanelGroup>
            </div>
        </div>
    )
}

export default Editor;