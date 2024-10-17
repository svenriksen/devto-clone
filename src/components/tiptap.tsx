'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import React from 'react';
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeSanitize from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'

const Tiptap = ({ onchange,
    content,
    setContent,
    mkdwn,
    setMkdwn
}:
    {
        onchange: () => void,
        content: string,
        setContent: React.Dispatch<React.SetStateAction<string>>,
        mkdwn: string,
        setMkdwn: React.Dispatch<React.SetStateAction<string>>
    }) => {
    const editor: unknown = useEditor({
        enableInputRules: false,
        immediatelyRender: false,
        extensions: [
            StarterKit.configure({
                blockquote: { HTMLAttributes: { class: 'font-sans' } },
                bold: { HTMLAttributes: { class: 'font-sans' } },
                bulletList: { HTMLAttributes: { class: 'font-sans' } },
                code: { HTMLAttributes: { class: 'font-sans' } },
                codeBlock: { HTMLAttributes: { class: 'font-sans' } },
                hardBreak: { HTMLAttributes: { class: 'font-sans' } },
                heading: { HTMLAttributes: { class: 'font-sans' } },
                horizontalRule: { HTMLAttributes: { class: 'font-sans' } },
                italic: { HTMLAttributes: { class: 'font-sans' } },
                listItem: { HTMLAttributes: { class: 'font-sans' } },
                orderedList: { HTMLAttributes: { class: 'font-sans' } },
                paragraph: { HTMLAttributes: { class: 'font-sans' } },

                strike: { HTMLAttributes: { class: 'font-sans' } },
            }),
            Placeholder.configure({
                placeholder: 'Write your post content here...',
            }),
        ],
        content: content,
        editorProps: {
            attributes: {
                class: 'h-full py-5 px-5 md:py-8 md:px-12 lg:px-16 whitespace-pre-wrap text-base font-mono',
            },
        },
        async onUpdate({ editor }) {
            const file = await unified()
                .use(remarkParse)
                .use(remarkRehype)
                .use(rehypeSanitize)
                .use(rehypeStringify)
                .process(editor.getText());
            setMkdwn(`<!DOCTYPE html>
                <html>
                <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                </head>
                <body>
                <div style="font-family: ui-sans-serif, system-ui, sans-serif;" class="font-sans" >
                `
                + String(file) +
                `</div > </body></html>
                `);
            setContent(editor.getText());
        }
    });

    if (!editor) {
        return null;
    }

    const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, type: string) => {

        event.preventDefault();
        if (type === "bold") {
            editor.commands.insertContent('****');
        }
    };

    return (
        <>
            <div className="bg-[--background] w-full py-2 md:px-10 lg:px-14 flex flex-row items-center">
                <button className="mr-1 !p-2 btn" onClick={(event) => { handleClick(event, "bold") }} tabIndex={0} >
                    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M8 11h4.5a2.5 2.5 0 0 0 0-5H8v5Zm10 4.5a4.501 4.501 0 0 1-4.5 4.5H6V4h6.5a4.5 4.5 0 0 1 3.256 7.606A4.5 4.5 0 0 1 18 15.5ZM8 13v5h5.5a2.5 2.5 0 0 0 0-5H8Z"></path></svg>
                </button>
                <button className="mr-1 !p-2 btn" onClick={(event) => { handleClick(event, "bold") }} tabIndex={-1}>
                    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M15 20H7v-2h2.927l2.116-12H9V4h8v2h-2.927l-2.116 12H15v2Z"></path></svg>
                </button>
                <button className="mr-1 !p-2 btn" onClick={(event) => { handleClick(event, "bold") }} tabIndex={-1}>
                    <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg" className="crayons-icon"><path d="M18.364 15.536 16.95 14.12l1.414-1.414a5.001 5.001 0 0 0-3.531-8.551 5 5 0 0 0-3.54 1.48L9.879 7.05 8.464 5.636 9.88 4.222a7 7 0 1 1 9.9 9.9l-1.415 1.414zm-2.828 2.828-1.415 1.414a7 7 0 0 1-9.9-9.9l1.415-1.414L7.05 9.88l-1.414 1.414a5 5 0 1 0 7.071 7.071l1.414-1.414 1.415 1.414zm-.708-10.607 1.415 1.415-7.071 7.07-1.415-1.414 7.071-7.07z"></path></svg>
                </button>
                <button className="mr-1 !p-2 btn" onClick={(event) => { handleClick(event, "bold") }} tabIndex={-1}>
                    <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg" className="crayons-icon"><path d="M8 4h13v2H8zM5 3v3h1v1H3V6h1V4H3V3zM3 14v-2.5h2V11H3v-1h3v2.5H4v.5h2v1zm2 5.5H3v-1h2V18H3v-1h3v4H3v-1h2zM8 11h13v2H8zm0 7h13v2H8z"></path></svg>
                </button>
                <button className="mr-1 !p-2 btn" onClick={(event) => { handleClick(event, "bold") }} tabIndex={-1}>
                    <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg" className="crayons-icon"><path d="M8 4h13v2H8zM4.5 6.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0 7a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0 6.9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM8 11h13v2H8zm0 7h13v2H8z"></path></svg>
                </button>
                <button className="mr-1 !p-2 btn" onClick={(event) => { handleClick(event, "bold") }} tabIndex={-1}>
                    <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg" className="crayons-icon"><path d="M17 11V4h2v17h-2v-8H7v8H5V4h2v7z"></path></svg>
                </button>
                <button className="mr-1 !p-2 btn" onClick={(event) => { handleClick(event, "bold") }} tabIndex={-1}>
                    <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg" className="crayons-icon"><path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5 3.871 3.871 0 0 1-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5 3.871 3.871 0 0 1-2.748-1.179z"></path></svg>
                </button>
                <button className="mr-1 !p-2 btn" onClick={(event) => { handleClick(event, "bold") }} tabIndex={-1}>
                    <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg" className="crayons-icon"><path d="m23 12-7.071 7.071-1.414-1.414L20.172 12l-5.657-5.657 1.414-1.414zM3.828 12l5.657 5.657-1.414 1.414L1 12l7.071-7.071 1.414 1.414z"></path></svg>
                </button>
                <button className="mr-1 !p-2 btn" onClick={(event) => { handleClick(event, "bold") }} tabIndex={-1}>
                    <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg" className="crayons-icon"><path d="M3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm1 2v14h16V5zm15 7-3.536 3.536-1.414-1.415L16.172 12 14.05 9.879l1.414-1.415zM7.828 12l2.122 2.121-1.414 1.415L5 12l3.536-3.536L9.95 9.88z"></path></svg>
                </button>
                <button className="mr-1 !p-2 btn" onClick={(event) => { handleClick(event, "bold") }} tabIndex={-1}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="crayons-icon"><path d="M13 9h8L11 24v-9H4l9-15v9Zm-2 2V7.22L7.532 13H13v4.394L17.263 11H11Z"></path></svg>
                </button>
                <button className="mr-1 !p-2 btn" onClick={(event) => { handleClick(event, "bold") }} tabIndex={-1}>
                    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" className="crayons-icon c-btn__icon"><path d="M20 5H4v14l9.292-9.294a1 1 0 011.414 0L20 15.01V5zM2 3.993A1 1 0 012.992 3h18.016c.548 0 .992.445.992.993v16.014a1 1 0 01-.992.993H2.992A.993.993 0 012 20.007V3.993zM8 11a2 2 0 110-4 2 2 0 010 4z"></path></svg>
                </button>
            </div>
            <EditorContent editor={editor} className='h-full' onFocus={onchange} />
        </ >
    );
}

export default Tiptap;