
import React from "react";

interface App {
  name: string;
  url: string;
  description: string;
}

interface AppShowcaseProps {
  title: string;
  apps: App[];
}

export default function AppShowcase({ title, apps }: AppShowcaseProps) {
  return (
    <aside className="my-10 max-w-2xl mx-auto">
      <div className="bg-purple-50 dark:bg-[#251c37] rounded-lg px-5 py-6 shadow-inner">
        <h3 className="text-lg font-semibold mb-3 text-purple-700 dark:text-purple-200">
          {title}
        </h3>
        <ul className="list-disc pl-5">
          {apps.map((app) => (
            <li key={app.url} className="my-1">
              <a
                href={app.url}
                className="text-blue-700 dark:text-blue-300 underline underline-offset-2 hover:text-purple-700"
                target="_blank" rel="noopener noreferrer"
                aria-label={`Visit ${app.name} (opens in new window)`}
              >
                {app.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
