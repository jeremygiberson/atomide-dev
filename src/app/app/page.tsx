'use client';

import { useEffect } from 'react';
import { useAppStore } from '@/store/useAppStore';
import Link from 'next/link';
import { Plus } from 'lucide-react';

export default function ProjectsPage() {
    const { projects, fetchProjects, isLoading } = useAppStore();

    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">Projects</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {/* Create Project Tile */}
                <div className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors">
                    <Plus className="w-12 h-12 text-gray-400 mb-2" />
                    <span className="text-gray-600 font-medium">Create Project</span>
                </div>

                {/* Project Tiles */}
                {isLoading ? (
                    <div className="col-span-full text-center py-10">Loading projects...</div>
                ) : (
                    projects.map((project) => (
                        <Link
                            key={project.id}
                            href={`/app/${project.id}`}
                            className="aspect-square border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow flex flex-col bg-white"
                        >
                            <h2 className="text-xl font-semibold mb-2">{project.name}</h2>
                            <p className="text-gray-500 text-sm flex-1">{project.description}</p>
                            <div className="text-xs text-gray-400 mt-4">ID: {project.id}</div>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
}
