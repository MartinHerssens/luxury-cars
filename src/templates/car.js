import React from 'react'
import { Link, useStaticQuery, graphql } from "gatsby"
import Layout from "../components/Layout"
import SEO from "../components/Seo"
import {Wrapper, Image, Artist, BottomEdgeDown, BottomEdgeUp} from "./templateStyles/carStyles"
import {COLORS} from "../constants"

const CarTemplate = ({
  data: {
    wpcontent: {
      car: {
        car,
        cartypes: { edges: cartypes },
      },
    },
  },
}) => {
  const { picture1, picture2, picture3 } = car.pictures
  const pictures = [picture1, picture2, picture3]

  return (
    <Layout>
      <SEO title="Car" />
      <Wrapper>
        <div className="artist-container">
          <div className="artist-image">
            <Image
              fluid={car.profile.imageFile.childImageSharp.fluid}
              alt={car.profile.altText}
            />
            <div className="roles">
              {cartypes.map(({ node: cartype }) => (
                <div key={cartype.name} className="role">
                  {cartype.name}
                </div>
              ))}
            </div>
          </div>
          <div className="artist-info">
            <h2>
              {car.brand} {car.model}
            </h2>
            <p className="description">{car.description}</p>
            <p className="info">
              <strong>Hp:</strong> {car.pk}
            </p>
            <p className="info">
              <strong>Fuel:</strong>{car.fuel}
            </p>
            <p className="info">
              <strong>Transmission:</strong> {car.transmission}
            </p>
            <p className="info">
              <strong>Price:</strong> {car.price}
            </p>
          </div>
        </div>
        <div className="artist-pictures">
          {pictures.map((picture, i) => (
            <div key={i} className="artist-picture">
              <Image
                fluid={picture.imageFile.childImageSharp.fluid}
                alt={picture.altText}
              />
            </div>
          ))}
        </div>
      </Wrapper>
    </Layout>
  )
}
export default CarTemplate

export const pageQuery = 
graphql`
  query($id: ID!) {
    wpcontent {
      car(id: $id, idType: ID) {
        cartypes {
          edges {
            node {
              name
            }
          }
        }
        car {
          brand
          model
          pk
          description
          transmission
          fuel
          price
          profile {
            sourceUrl
            imageFile {
              childImageSharp {
                fluid(quality: 75) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
            altText
          }
          pictures {
            picture3 {
              sourceUrl
              imageFile {
                childImageSharp {
                  fluid(quality: 75) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
              altText
            }
            picture2 {
              sourceUrl
              imageFile {
                childImageSharp {
                  fluid(quality: 75) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
              altText
            }
            picture1 {
              sourceUrl
              imageFile {
                childImageSharp {
                  fluid(quality: 75) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
              altText
            }
          }
        }
        id
      }
    }
  }
`
