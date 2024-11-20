import React from 'react';
import { TokenGate } from '../components/TokenGate';
import { getSession } from '../utils/session';
import CaringHandDashboard from './internal/page';


type SearchParams = { [key: string]: string | string[] | undefined };

export const revalidate = 180;

type PageProps = {
  searchParams: SearchParams;
};

async function Content({ searchParams }: PageProps) {
  const data = await getSession(searchParams);
  
  console.log({ data });

  return (
    <main>
      <CaringHandDashboard />
    </main>
  );
}

export default function Page({ searchParams }: { searchParams: SearchParams }) {
  return (
    <TokenGate searchParams={searchParams}>
      <Content searchParams={searchParams} />
    </TokenGate>
  );
}
