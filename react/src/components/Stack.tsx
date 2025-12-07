import type { FC } from 'react';
import type { StackSection as StackSectionData, StringsDoc } from '../types';
import { SanityPortableText } from '../sanity/SanityPortableText';
import { Button } from './ui/Button';

type StackProps = {
  section: StackSectionData;
  strings?: StringsDoc | null;
};

export const Stack: FC<StackProps> = ({ section, strings }) => {
  const { title, tryStack, stacks = [] } = section;
  if (!stacks.length) return null;

  const currentStack =
    stacks.find((s) => s.label?.toLowerCase().includes('react')) ?? stacks[0];

  const switcherLabel =
    strings?.stackSwitcherLabel ?? 'Stack demos';

  return (
    <section id="stack">
      <div className="mx-auto max-w-regular">
        {title && <h2 className="h2 mb-s">{title}</h2>}

        <div className="card card--fx mt-m">
          <div className="grid gap-l items-start md:grid-cols-[1.2fr_0.8fr]">
            <div>
              {currentStack?.summary && (
                <SanityPortableText value={currentStack.summary} />
              )}

              {currentStack?.list?.length ? (
                <ul className="mt-xs pl-l list-disc list-outside space-y-2xs">
                  {currentStack.list.map((item, index) => (
                    <li key={`${item}-${index}`}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </div>

            <div
              className="flex flex-col"
              role="group"
              aria-label={switcherLabel}
            >
              {tryStack && (
                <p className="text-muted">
                  {tryStack}
                </p>
              )}

              <div className="flex flex-wrap gap-s mt-xs">
                {stacks.map((stack, index) => {
                  const { host, label } = stack || {};
                  if (!host || !label) return null;

                  return (
                    <Button
                      key={`${host}-${index}`}
                      href={`https://${host}`}
                      variant="default"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {label}
                    </Button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stack;
