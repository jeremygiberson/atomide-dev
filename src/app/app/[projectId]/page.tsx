'use client';

import { useEffect, useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { useParams } from 'next/navigation';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { X } from 'lucide-react';

export default function ProjectIDEPage() {
    const params = useParams();
    const projectId = params.projectId as string;
    const { currentProject, fetchProject, isLoading } = useAppStore();

    useEffect(() => {
        if (projectId) {
            fetchProject(projectId);
        }
    }, [projectId, fetchProject]);

    if (isLoading || !currentProject) {
        return <div className="flex items-center justify-center h-screen">Loading project...</div>;
    }

    return (
        <div className="h-screen flex flex-col">
            <header className="h-12 border-b flex items-center px-4 bg-gray-50">
                <h1 className="font-semibold">{currentProject.name}</h1>
            </header>
            <div className="flex-1 overflow-hidden">
                <PanelGroup direction="horizontal">
                    {/* Sidebar / File Explorer */}
                    <Panel defaultSize={20} minSize={15} maxSize={30} className="border-r bg-gray-50">
                        <div className="p-4">
                            <h2 className="font-medium mb-4 text-sm uppercase text-gray-500">Explorer</h2>
                            <ul className="space-y-2">
                                {currentProject.files.map((file) => (
                                    <li key={file.id} className="text-sm cursor-pointer hover:text-blue-600">
                                        {file.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </Panel>

                    <PanelResizeHandle className="w-1 bg-gray-200 hover:bg-blue-400 transition-colors" />

                    {/* Main Editor Area */}
                    <Panel>
                        <PanelGroup direction="vertical">
                            <Panel defaultSize={70}>
                                <div className="h-full flex flex-col">
                                    {/* Tabs */}
                                    <div className="flex border-b bg-gray-100">
                                        {currentProject.files.map((file, index) => (
                                            <div
                                                key={file.id}
                                                className={`px-4 py-2 text-sm border-r flex items-center gap-2 cursor-pointer ${index === 0 ? 'bg-white border-t-2 border-t-blue-500' : 'hover:bg-gray-50'}`}
                                            >
                                                <span>{file.name}</span>
                                                <X className="w-3 h-3 hover:text-red-500" />
                                            </div>
                                        ))}
                                    </div>
                                    {/* Editor Content */}
                                    <div className="flex-1 p-4 bg-white font-mono text-sm">
                                        <pre>{currentProject.files[0]?.content || '// Select a file'}</pre>
                                    </div>
                                </div>
                            </Panel>

                            <PanelResizeHandle className="h-1 bg-gray-200 hover:bg-blue-400 transition-colors" />

                            {/* Bottom Panel (Terminal/Output) */}
                            <Panel defaultSize={30} minSize={10}>
                                <div className="h-full bg-gray-900 text-white p-4 font-mono text-sm">
                                    <div className="flex items-center justify-between mb-2 border-b border-gray-700 pb-2">
                                        <span className="text-xs uppercase tracking-wider text-gray-400">Terminal</span>
                                    </div>
                                    <div>
                                        $ echo "Project loaded: {currentProject.name}"
                                        <br />
                                        Project loaded: {currentProject.name}
                                        <br />
                                        $ _
                                    </div>
                                </div>
                            </Panel>
                        </PanelGroup>
                    </Panel>
                </PanelGroup>
            </div>
        </div>
    );
}
