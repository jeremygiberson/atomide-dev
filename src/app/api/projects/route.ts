import { NextResponse } from 'next/server';

const projects = [
    { id: '1', name: 'Project Alpha', description: 'A sample project' },
    { id: '2', name: 'Project Beta', description: 'Another sample project' },
    { id: '3', name: 'Project Gamma', description: 'Yet another sample project' },
];

export async function GET() {
    return NextResponse.json(projects);
}
