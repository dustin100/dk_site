import type { FC } from 'react';
import type { SkillsSection as SkillsSectionData } from '../types';

type SkillsProps = {
  section: SkillsSectionData;
};

export const Skills: FC<SkillsProps> = ({ section }) => {
  const { title, intro, tags = [] } = section;
  const hasTags = tags.length > 0;

  return (
    <section id="skills">
      <div>
        {title && <h2 className="h2 mb-s">{title}</h2>}

        <div className="card card--fx mt-m">
          {intro && <p className="text-muted mb-l">{intro}</p>}

          {hasTags && (
            <ul className="flex flex-wrap gap-s m-0 p-0 list-none">
              {tags.map((label) => (
                <li key={label} className="m-0">
                  <span className="inline-flex items-center border border-line rounded-full px-m py-xs bg-secondary text-sm leading-baseline tracking-1">
                    {label}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
};

export default Skills;
