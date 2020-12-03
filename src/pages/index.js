import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/Seo"

const IndexPage = () => {
  const data = useStaticQuery(graphql`
  query {
  wpcontent {
    page(id: "home", idType: URI) {
      homePageMeta {
        homePageDescription
        homePageTitle
        homePagePicture {
          sourceUrl
          imageFile {
            childImageSharp {
              fluid(quality:100){
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
        homePageFeaturedCars {
          ... on WPGraphql_Car {
            id
            car {
              brand
              model
              pk
            }
          }
        }
      }
    }
  }
}
  `);
  return (
  <Layout>
    <SEO title="Home" />

  </Layout>
  )}

export default IndexPage
