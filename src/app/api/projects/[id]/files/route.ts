import { NextResponse } from 'next/server';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const files = [
        { id: '1', name: 'index.ts', content: 'console.log("Hello World");', language: 'typescript' },
        { id: '2', name: 'style.css', content: 'body { background: #fff; }', language: 'css' },
    ];

    return NextResponse.json(files);
}
