import { Suspense, useMemo, useState, use } from 'react';

export function App() {
  const [open, setOpen] = useState(false);

  const promise = useMemo(
    () =>
      new Promise<string>((resolve) => {
        console.log('starting promise');

        setTimeout(() => {
          console.log('resolving promise');

          resolve('hello');
        }, 5000);
      }),
    []
  );

  return (
    <>
      <div>
        <button onClick={() => setOpen(true)}>Reveal</button>
        {open && (
          <Suspense fallback='still loading...'>
            <SuspendableGreeting promise={promise} />
          </Suspense>
        )}
      </div>

      {/* Uncommenting the below code will fixed the issue above */}
      {/* <Suspense>
        <Resolve promise={promise} />
      </Suspense> */}
    </>
  );
}

interface SuspendableProps {
  promise: Promise<string>;
}

function SuspendableGreeting({ promise }: SuspendableProps) {
  const greeting = use(promise);
  return greeting;
}

function Resolve({ promise }: SuspendableProps) {
  use(promise);
  return null;
}
