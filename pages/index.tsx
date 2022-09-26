import { FC, useEffect, useState } from "react";
import Link from 'next/link'
import { fetchData, Post } from '../src/mock-api/fake-posts'
import axios from "axios";
import { NextSeo } from 'next-seo'

import { HomeView } from "../src/views";

function useMounted() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  return mounted
}

const fetchDataOptions = {
  pageIndex: 2,
  pageSize: 4,
}

const Home: FC = ( data ) => {

  const isMounted = useMounted()
    return (
    <>
      <NextSeo
          title="Homepage Meta Title"
          description="This will be the page meta description"
          canonical="https://www.canonicalurl.ie/"
          openGraph={{
            url: 'https://www.canonicalurl.ie/',
            title: 'Open Graph Title',
            description: 'Open Graph Description',
            images: [
              {
                url: 'https://www.example.ie/og-image-01.jpg',
                width: 800,
                height: 600,
                alt: 'Og Image Alt',
              },
              {
                url: 'https://www.example.ie/og-image-02.jpg',
                width: 900,
                height: 800,
                alt: 'Og Image Alt Second',
              },
              { url: 'https://www.example.ie/og-image-03.jpg' },
              { url: 'https://www.example.ie/og-image-04.jpg' },
            ],
          }}
        />
        
        <HomeView data={data} isMounted={isMounted} />

      </>
    );
};


// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetchData(fetchDataOptions)
  const data = await res

  console.log('Server side fetch', data.rows)

  // Pass data to the page via props
  return { props: { data } }
}

export default Home;
