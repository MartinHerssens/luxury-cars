import React from 'react'
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/Seo"
import {Wrapper, Image, Artist, BottomEdgeDown, BottomEdgeUp} from "../pageStyles/pageStyles"
import {COLORS} from "../constants"

const CarsPage = (props)=> {
    const {
        wpcontent:{
        page:{
        carsMeta:{
            carsPageDescription,carsPagePicture}
        },
        cars:{edges:cars},
        },
     } = useStaticQuery(graphql`
    query {
        wpcontent {
          page(id: "cars", idType: URI) {
            carsMeta {
              carsPageDescription
              carsPagePicture {
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
            }
          }
          cars {
            edges {
              node {
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
    `)
    return (
        <Layout>
            <SEO title="cars"/>
        <Wrapper artistsColor= {COLORS.GREY} descriptionColor={COLORS.BLACK}>
            <div className="banner">
           <Image fluid={carsPagePicture.imageFile.childImageSharp.fluid} alt={carsPagePicture.altText}/> 
           <BottomEdgeDown color = {COLORS.BLACK}></BottomEdgeDown>
            </div>

            <div className="description">
                <h2>Pick your car</h2>
                <p>{carsPageDescription}</p>
                <BottomEdgeUp color= {COLORS.BLACK}/>
            </div>
            <div className="artists">
                <h2>Our cars</h2>
                <div className="artist-items">
            {cars.map(({node:{car,slug}})=>(
                <Artist to={`/${slug}`} key={car}>
                    <Image fluid={car.profile.imageFile.childImageSharp.fluid} alt= {car.profile.altText}/>
                <div className="artist-info">
                  <p>{car.brand} {car.model}</p>
                  <p>{car.pk} pk</p>
                </div>
                </Artist>              
            ))}
                </div>
            </div>
        </Wrapper>
        </Layout>
    )
}

export default CarsPage