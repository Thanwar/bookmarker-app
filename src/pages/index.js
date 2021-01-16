import React from "react"
import { useQuery, useMutation } from "@apollo/client"
import gql from "graphql-tag"
import "../style/index.css"

const BookMarksQuery = gql`
  {
    bookmark {
      id
      url
      desc
    }
  }
`

const AddBookMarkMutation = gql`
  mutation addBookmark($url: String!, $desc: String!) {
    addBookmark(url: $url, desc: $desc) {
      url
    }
  }
`

export default function Home() {
  const { loading, error, data } = useQuery(BookMarksQuery)
  const [addBookmark] = useMutation(AddBookMarkMutation)
  let textfield
  let desc
  const addBookmarkSubmit = () => {
    addBookmark({
      variables: {
        url: textfield.value,
        desc: desc.value,
      },
      refetchQueries: [{ query: BookMarksQuery }],
    })
    console.log("textfield", textfield.value)
    console.log("Desc", desc.value)
    textfield.value = ""
    desc.value = ""
  }

  return (
    <div className="maincontainer">
        <div className="boxcontainer">
        <h1 className="mainheading"> Thanwar Bookmarking App </h1>
          <div className="box">
            <div>
          <input
            className="inputs"
            type="text"
            placeholder="URL"
            ref={node => (textfield = node)}
          />
          <br />
          <input
            className="inputs"
            type="text"
            placeholder="Description"
            ref={node => (desc = node)}
          />
          <br />
          <button className="button" onClick={addBookmarkSubmit}>
            Bookmark
          </button>
          <br />
          </div>
          </div>
        

        <div className="bookmarks">
          <ul>
            {data &&
              data.bookmark.map(mark => (
                <li key={mark.id}>
                  <h3 className="desc">{mark.desc}</h3>{" "}
                  <a className="link" href={mark.url} target="_blank">{mark.url}</a>
                </li>
              ))}
          </ul>
          </div>
        </div>
      </div>
  )
}
