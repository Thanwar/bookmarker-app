import React from "react";
import { useQuery,useMutation } from "@apollo/client";
import gql from "graphql-tag";

const BookMarksQuery = gql`{
  bookmark{
    url
  }
}`

export default function Home() {
  const {loading,error,data} = useQuery(BookMarksQuery);

  return(
    <div>
    <h1> Hello Bookmarker App </h1>
    <br />
    <p>{JSON.stringify(data)}</p>
    </div>
  )
}
