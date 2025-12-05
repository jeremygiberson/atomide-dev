import { NextResponse } from 'next/server';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string; fileId: string }> }
) {
    const { id, fileId } = await params;
    const file = {
        id: fileId,
        name: `file-${fileId}.ts`,
        content: `// Content for file ${fileId} in project ${id}`,
        language: 'typescript',
    };

    return NextResponse.json(file);
}
