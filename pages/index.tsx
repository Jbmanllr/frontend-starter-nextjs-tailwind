import React from "react";
import Link from 'next/link'
import { fetchData, Post } from '../src/mock-api/fake-posts'
import axios from "axios";

import { HomeView } from "../src/views";

const Home: React.FC = ( data ) => {
    return ( <HomeView data={data}/> );
};

const fetchDataOptions = {
  pageIndex: 2,
  pageSize: 4,
}

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
