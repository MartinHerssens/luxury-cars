import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/Seo"
import {Wrapper, Image, Artist, BottomEdgeDown, BottomEdgeUp} from "../pageStyles/pageStyles"
import {COLORS} from "../constants"
const IndexPage = () => {
  const {
    wpcontent: {
      page: {
        homePageMeta: {
          homePageDescription,
          homePageTitle,
          homePagePicture,
          homePageFeaturedCars
        }
      }
    }
  } = useStaticQuery(graphql`
  query {
  wpcontent {
    page(id: "home", idType: URI) {
      homePageMeta {
        homePageDescription
        homePageTitle
        homePagePicture {
          altText
          sourceUrl
          imageFile {
            childImageSharp {
              fluid(quality:75){
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
              profile {
                altText
                sourceUrl
                imageFile {
                  childImageSharp {
                    fluid(quality:50){
                      ...GatsbyImageSharpFluid_withWebp
                    }
                  }
                }
              }
            }
            slug
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
      <Wrapper> 
        <div className="banner" >
        <Image fluid={homePagePicture.imageFile.childImageSharp.fluid} alt= {homePagePicture.altText}/>
        <div className="inner-div">
          <p className="header-title" >{homePageTitle}</p>
         <p className="header-description">{homePageDescription}</p>
        </div>
        <BottomEdgeDown color = {COLORS.BLACK}></BottomEdgeDown>
        </div>
        <div className="description">
          <p>{homePageDescription}</p>
          <BottomEdgeUp color={COLORS.BLACK}/>
        </div>
        <div className= "artists">
          <h2>fastest Cars</h2>
          <div className="artist-items">
            {homePageFeaturedCars.map(({car, slug})=>(
              <Artist to={`/${slug}`} key={car}>
                <Image fluid={car.profile.imageFile.childImageSharp.fluid} alt= {car.profile.altText}/>
                <div className="artist-info">
                  <p>{car.brand} {car.model}</p>
                  <p>{car.pk} pk</p>
                </div>

              </Artist>
            )
            )}
          </div>
        </div>
      </Wrapper>
  </Layout>
  )}

export default IndexPage
